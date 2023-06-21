import { ASTNode, asExpr } from "./ast.js";
import { getBindingPowerStr } from "../parse/parse.js";

export type FmtCtx = {
  indent: number;
  tabSize: number;
  maxlen: number;
  splitByLine?: boolean;
  bindingPower: number;
  dontIndentFirst?: boolean;
};

export function indent(n: number) {
  return "".padStart(n, " ");
}

export function maxLineLength(str: string) {
  return str.split("\n").reduce((prev, curr) => Math.max(prev, curr.length), 0);
}

export function formatAST(n: ASTNode, c?: FmtCtx): string {
  let ctx: FmtCtx;
  if (!c) {
    ctx = { indent: 0, tabSize: 2, maxlen: 80, bindingPower: 0 };
  } else {
    ctx = c;
  }

  const ctxwith = (patch: Partial<FmtCtx>): FmtCtx => {
    return {
      ...ctx,
      splitByLine: undefined,
      dontIndentFirst: undefined,
      ...patch,
    };
  };

  switch (n.type) {
    // TODO: wrap after line if too long
    case "assignment":
      return `${n.lhs} = ${formatAST(
        n.rhs,
        ctxwith({
          indent: ctx.indent,
        })
      )}`;

    // binary operation rules:
    // if tree is less than maxlen, keep it all in a single line
    // if tree is greater than maxlen, split it up with ops at beginning
    case "binop":
      if (ctx.splitByLine === undefined) {
        let str = formatAST(n, ctxwith({ splitByLine: false }));
        if (str.length > ctx.maxlen) {
          str = formatAST(
            n,
            ctxwith({
              splitByLine: true,
              bindingPower: getBindingPowerStr(n.op),
            })
          );
        }
        return str;
      }

      const bindingPower = getBindingPowerStr(n.op);

      // split by line
      if (ctx.splitByLine) {
        // if there's an increase in binding power,
        // try to merge lines
        if (bindingPower != ctx.bindingPower) {
          return formatAST(
            n,
            ctxwith({
              splitByLine: false,
              bindingPower: ctx.bindingPower,
              indent: ctx.indent + ctx.tabSize,
            })
          );
        }

        let l = formatAST(n.lhs, ctxwith({ bindingPower, splitByLine: true }));
        let r = formatAST(n.rhs, ctxwith({ bindingPower, splitByLine: true }));

        // split by line
        let str =
          n.op == "["
            ? `${l}[\n${r}\n]`
            : `${l}\n${indent(ctx.indent)}${n.op} ${r}`;

        // parenthesize if current binding power would be less than previous
        if (bindingPower < ctx.bindingPower) return `(${str})`;
        return str;
      } else {
        let l = formatAST(n.lhs, ctxwith({ bindingPower }));
        let r = formatAST(n.rhs, ctxwith({ bindingPower }));
        let str = n.op == "[" ? `${l}[${r}]` : `${l} ${n.op} ${r}`;
        if (bindingPower < ctx.bindingPower) return `(${str})`;
        return str;
      }

    case "block":
      let rootOffset = n.isRoot ? 0 : ctx.tabSize;
      return `${ctx.dontIndentFirst ? "" : /*indent(ctx.indent)*/ ""}${
        n.isRoot ? "" : "{"
      }${n.isRoot ? "" : "\n"}${n.body
        .map(
          (e, i) =>
            `${indent(ctx.indent + rootOffset)}${formatAST(
              e,
              ctxwith({ indent: ctx.indent + ctx.tabSize + rootOffset })
            )}` +
            ((e.type != "note" &&
              asExpr(e).success &&
              i != n.body.length - 1) ||
            e.type == "assignment"
              ? ";"
              : "") +
            "\n"
        )
        .join("")}${indent(ctx.indent)}${n.isRoot ? "" : "}"}`;

    case "error":
      // TODO: figure out how to deal with this properly
      return `##ERROR: ${n.reason}##`;

    case "fncall":
      const fnname = formatAST(n.name);
      const fnparams = n.params.map((p) =>
        formatAST(p, ctxwith({ indent: ctx.indent + ctx.tabSize }))
      );
      let str = `${fnname}(${fnparams.join(", ")})`;

      // split function call by lines if too long
      if (maxLineLength(str) > ctx.maxlen) {
        return `${fnname}(\n${fnparams.join(
          `,\n${indent(ctx.indent + ctx.tabSize)}`
        )}\n${indent(ctx.indent)})`;
      }
      return str;

    case "fndef": {
      const fndefparams = n.params.join(", ");

      const nextIndent = ctxwith({
        indent: ctx.indent - ctx.tabSize,
        dontIndentFirst: true,
      });
      const str = `fn ${n.name}(${fndefparams}) ${formatAST(
        n.body,
        nextIndent
      )}`;

      if (fndefparams.length > ctx.maxlen) {
        return `fn ${n.name}(\n${n.params.join(
          `,\n${indent(ctx.indent + ctx.tabSize)}`
        )}\n) ${formatAST(n.body, nextIndent)}`;
      }
      return str;
    }

    case "identifier":
      return n.segments.join(".");

    case "import":
      return `import "${n.src}"` + (n.alias ? ` as ${n.alias}` : "");

    case "import-script":
      return `import script "${n.src}"`;

    case "json-array": {
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });
      const data = n.elements.map((d) => formatAST(d, nextIndent));

      const str = `[${data.join(", ")}]`;
      if (str.length > ctx.maxlen) {
        return `[\n${data.join(`,\n${indent(ctx.indent)}`)}\n${indent(
          ctx.indent - ctx.tabSize
        )}]`;
      }

      return str;
    }

    case "json-boolean":
      return n.data ? "true" : "false";

    case "json-inner-expr":
      return `ds(${formatAST(
        n.expr,
        ctxwith({ indent: ctx.indent + ctx.tabSize })
      )})`;

    case "json-null":
      return `null`;

    case "json-object": {
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });
      const data = n.data.map(([k, v]) => `${k}: ${formatAST(v, nextIndent)}`);
      const str = `@{ ${data.join(", ")} }`;

      if (str.length > ctx.maxlen) {
        return `@{${data
          .map((e) => `\n${indent(ctx.indent)}${e}`)
          .join(",")}\n${indent(ctx.indent - ctx.tabSize)}}`;
      }

      return str;
    }

    case "linebreak":
      return ``;
    case "list": {
      const annotation = n.typeAnnotation ? ` as ${n.typeAnnotation}[]` : "";

      const elements = n.elements.map((e) =>
        formatAST(e, ctxwith({ indent: ctx.indent + ctx.tabSize }))
      );
      const str = `[${elements.join(", ")}]` + annotation;

      if (str.length > ctx.maxlen) {
        return (
          `[${elements
            .map((e) => `\n${indent(ctx.indent)}${e}`)
            .join(",")}\n${indent(ctx.indent - ctx.tabSize)}]` + annotation
        );
      }

      return str;
    }
    case "listcomp": {
      const body = formatAST(
        n.body,
        ctxwith({ indent: ctx.indent + ctx.tabSize })
      );
      const params = n.params.map(([k, v]) => {
        return `${k}=${formatAST(
          v,
          ctxwith({ indent: ctx.indent + ctx.tabSize })
        )}`;
      });

      const str = `[${body} for ${params.join(", ")}]`;

      // TODO: expand if too large
      if (maxLineLength(str) > ctx.maxlen) {
        return `[${body} for${params
          .map((e) => `\n${indent(ctx.indent)}${e}`)
          .join(",")}\n${indent(ctx.indent - ctx.tabSize)}]`;
      }

      return str;
    }

    case "macrocall": {
      const fnname = formatAST(n.name);
      const fnparams = n.params.map((p) =>
        formatAST(p, ctxwith({ indent: ctx.indent + ctx.tabSize }))
      );
      let str = `${fnname}!(${fnparams.join(", ")})`;

      // split function call by lines if too long
      if (maxLineLength(str) > ctx.maxlen) {
        return `${fnname}!(\n${fnparams.join(
          `,\n${indent(ctx.indent + ctx.tabSize)}`
        )}\n${indent(ctx.indent)})`;
      }
      return str;
    }

    case "match": {
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });

      const branches = n.branches.map(([k, v]) => {
        return `${formatAST(k, nextIndent)}: ${formatAST(v, nextIndent)}`;
      });

      const fallback = n.fallback ? formatAST(n.fallback, nextIndent) : "";
      const str = `{ ${[...branches, fallback].filter((e) => e).join(", ")} }`;

      if (str.length > ctx.maxlen) {
        return `{${[...branches, fallback]
          .filter((e) => e)
          .map((e) => `\n${indent(ctx.indent)}${e}`)
          .join(",")}\n${indent(ctx.indent - ctx.tabSize)}}`;
      }

      return str;
    }

    case "namespace":
      return `ns ${n.name} ${
        n.settings
          ? formatAST(
              n.settings,
              ctxwith({
                dontIndentFirst: true,
              })
            ) + " "
          : ""
      }${formatAST(
        n.body,
        ctxwith({ indent: ctx.indent - ctx.tabSize, dontIndentFirst: true })
      )}`;

    case "note":
      return `"${n.content}"`;

    case "number":
      return n.number.toString();

    case "point": {
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });
      const x = formatAST(n.x, nextIndent);
      const y = formatAST(n.y, nextIndent);

      const str = `(${x}, ${y})`;

      if (str.length > ctx.maxlen) {
        return `(\n${indent(ctx.indent + ctx.tabSize)}${x},\n${indent(
          ctx.indent + ctx.tabSize
        )}${y}\n)`;
      }

      return str;
    }

    case "range":
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });
      const lhs = formatAST(n.lhs, nextIndent);
      const rhs = formatAST(n.rhs, nextIndent);
      if (n.step) return `[${lhs},${formatAST(n.step, nextIndent)}..${rhs}]`;
      return `[${lhs}..${rhs}]`;

    case "show":
      return `show ${formatAST(n.body, ctx)} ${formatAST(n.settings, ctx)}`;

    case "unop": {
      const nextIndent = ctxwith({
        indent: ctx.indent + ctx.tabSize,
        bindingPower: getBindingPowerStr(n.op),
      });
      if (n.op.startsWith(".")) {
        return `${formatAST(n.operand, nextIndent)}${n.op}`;
      } else {
        return `${n.op}${formatAST(n.operand, nextIndent)}`;
      }
    }

    case "settings": {
      const nextIndent = ctxwith({ indent: ctx.indent + ctx.tabSize });
      return `${n.settingsType} ${formatAST(n.content, nextIndent)}`;
    }
  }
}
