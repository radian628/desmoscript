import {
  ASTNode,
  CompilationUnit,
  ErrorNode,
  MacroCallNode,
  ScopeContent,
  Scoped,
} from "../../ast/ast.js";
import { CodegenError } from "../../codegen/codegen.js";
import { CompilerError, internalError } from "../../compiler-errors.js";
import { debugPrint } from "../../debug/debug.js";
import { IOInterface, IOPathInterface } from "../../io/io.js";
import { DSPrimitiveType, ErrorType } from "./typecheck.js";

export type TypeError =
  | {
      type: "wrong-type" | "not-found";
      reason: string;
      start: number;
      end: number;
      unit: string;
    }
  | {
      type: "circular-dependency";
      reason: string;
      start: number;
      end: number;
      unit: string;
      // locations in the code that led to the circular dependency
      path: { start: number; end: number; unit: string }[];
    }
  | {
      type: "bad-fncall";
      reason: string;
      start: number;
      end: number;
      unit: string;
      // type errors that caused the function call to be invalid
      why: TypeError[];
    }
  | {
      type: "bad-macro";
      reason: string;
      start: number;
      end: number;
      unit: string;
      why: CompilerError[];
    };

// prereq: a circular dependency must already exist
export function formatCircularDependencyError(
  expr: Scoped<ASTNode>,
  units: Map<string, CompilationUnit>,
  dependencyChain: Map<
    number,
    { content: ScopeContent; node: Scoped<ASTNode>; nodeUnit: string }
  >,
  offendingScopeItem: ScopeContent,
  knownCircularDependencies: Set<number>
): ErrorType {
  const entries = Array.from(dependencyChain.entries()).reverse();

  const path: { start: number; end: number; unit: string }[] = [];

  for (const [k, v] of Array.from(dependencyChain.entries()).reverse()) {
    path.push({
      start: v.node.start ?? 0,
      end: v.node.end ?? 0,
      unit: v.nodeUnit,
    });
    knownCircularDependencies.add(v.content.id);
    if (offendingScopeItem.id == v.content.id) break;
  }

  path.reverse();

  return errorType([
    {
      type: "circular-dependency",
      start: offendingScopeItem.start ?? 0,
      end: offendingScopeItem.end ?? 0,
      unit: offendingScopeItem.unitName,
      path,
      reason: "circular dependency: ",
    },
  ]);
}

export function notFoundError(
  expr: Scoped<ASTNode>,
  unit: string,
  reason: string
): ErrorType {
  return errorType([
    { type: "not-found", start: expr.start, end: expr.end, unit, reason },
  ]);
}

export function wrongTypeError(
  expr: Scoped<ASTNode>,
  unit: string,
  reason: string
): ErrorType {
  return errorType([
    { type: "wrong-type", start: expr.start, end: expr.end, unit, reason },
  ]);
}

export function badMacroError(
  expr: Scoped<MacroCallNode>,
  errs: ErrorNode[],
  unit: string,
  reason: string
): ErrorType {
  return errorType([
    {
      type: "bad-macro",
      start: expr.start,
      end: expr.end,
      unit,
      reason,
      why: errs.map((err) => ({ ...err, type: "general", unit: err.unitName })),
    },
  ]);
}

export function errorType(why: TypeError[]): ErrorType {
  return { type: "error", why };
}

export function assertNoError(
  type: DSPrimitiveType | ErrorType
): DSPrimitiveType {
  if (type.type == "error")
    throw internalError("expected a non-error type here");
  return type;
}

export function formatScopeItemTypeName(typename: string) {
  return typename.replace("-", " ");
}

export function wrap(input: string, maxWidth: number) {
  return input
    .split("\n")
    .map((line) => {
      let indent = line.match(/^ */)?.[0].length ?? 0;
      let lines = [];
      let l = "";
      let splitInput = line.split(" ");
      let i = 0;
      for (const str of splitInput) {
        l += str;
        if (l.length > maxWidth || i == splitInput.length - 1) {
          lines.push(l);
          l = "";
        } else {
          l += " ";
        }
        i++;
      }
      return lines.join("\n".padEnd(indent + 1, " "));
    })
    .join("\n");
}

export function indent(str: string, n: number) {
  const indentation = "".padEnd(n, " ");
  return indentation + str.replace(/\n/g, "\n" + indentation);
}

export function lastNewlinePos(str: string, pos: number, remaining: number) {
  while (pos >= 0) {
    if (str[pos] == "\n") remaining--;
    if (remaining == 0) return pos;
    pos--;
  }
  return 0;
}
export function nextNewlinePos(str: string, pos: number, remaining: number) {
  while (pos < str.length) {
    if (str[pos] == "\n") remaining--;
    if (remaining == 0) return pos;
    pos++;
  }
  return str.length;
}

export type ErrorFormattingContext = {
  entry: string;
  sourceCode: Map<string, { src: string; linesAndCols: [number, number][] }>;
  maxWidth: number;
  format: (
    str: string,
    options: { type: "error" | "gutter" | "deemphasize" | "message" }
  ) => string;
  hideSourceCode?: boolean;
  sourceCodeErrorContext?: number;
  io: IOPathInterface;
};

export function formatCodeFragment(
  ctx: ErrorFormattingContext,
  err: {
    unit: string;
    start: number;
    end: number;
  },
  context?: number
) {
  if (!context) context = 2;

  const unit = ctx.sourceCode.get(err.unit) as CompilationUnit;

  const [line, col] = unit.linesAndCols[err.start];

  const lastNewline = lastNewlinePos(unit.src, err.start, context - 1);
  const nextNewline = nextNewlinePos(unit.src, err.end, context);

  let gutterLineNo = unit.linesAndCols[lastNewline][0];
  let gutterPad = Math.floor(Math.log10(gutterLineNo + 2)) + 1;

  const code = `\n${unit.src.slice(lastNewline, err.start)}${ctx.format(
    unit.src.slice(err.start, err.end),
    {
      type: "error",
    }
  )}${unit.src.slice(err.end, nextNewline)}`.replace(
    /\n/g,
    (src) =>
      "\n" +
      ctx.format((gutterLineNo++).toString().padEnd(gutterPad, " ") + "| ", {
        type: "gutter",
      })
  );

  return code;
}

export function formatError(
  ctx: ErrorFormattingContext,
  err: TypeError | CodegenError | CompilerError
): string {
  const unit = ctx.sourceCode.get(err.unit) as CompilationUnit;

  debugPrint(err, err.start);

  const [line, col] = unit.linesAndCols[err.start ?? 0];

  const baseErr =
    wrap(
      `Error in ${ctx.io.relativePath(
        ctx.entry,
        err.unit
      )}:${line}:${col} ${ctx.format(`(${err.unit}:${line}:${col})`, {
        type: "deemphasize",
      })}`,
      ctx.maxWidth
    ) +
    (ctx.hideSourceCode
      ? ""
      : formatCodeFragment(ctx, err, ctx.sourceCodeErrorContext ?? 2)) +
    "\n" +
    ctx.format(err.reason, { type: "message" });

  if (err.type == "bad-fncall" || err.type == "bad-macro") {
    return (
      baseErr +
      "\n\n" +
      err.why
        .map((e) =>
          indent(formatError({ ...ctx, hideSourceCode: false }, e), 2)
        )
        .join("\n  ")
    );
  }

  if (err.type == "circular-dependency") {
    return (
      baseErr +
      [...err.path, err.path[0]]
        .map(({ start, end, unit }) => {
          const unitData = ctx.sourceCode.get(unit) as CompilationUnit;
          const [line, col] = unitData.linesAndCols[start];
          const str = unitData.src.slice(start, end);
          return str;
        })
        .join(" -> ") +
      "\n\n" +
      indent(
        err.path
          .map(({ start, end, unit }) => {
            const unitData = ctx.sourceCode.get(unit) as CompilationUnit;
            const [line, col] = unitData.linesAndCols[start];
            return `${ctx.format(`At ${unit}:${line}:${col}`, {
              type: "deemphasize",
            })}${indent(
              formatCodeFragment(
                ctx,
                { start, end, unit },
                ctx.sourceCodeErrorContext ?? 2
              ),
              2
            )}`;
          })
          .join("\n"),
        2
      )
    );
  }

  return baseErr;
}
