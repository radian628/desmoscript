import { ASTExpr, ASTType } from "../ast/ast.mjs";
import {
  MacroAPI,
  ScopeContent,
} from "../semantic-analysis/analysis-types.mjs";
import { mapAST } from "../ast/ast-visitor.mjs";
import { remapIDs } from "../semantic-analysis/macro-api-impl.mjs";
import { makeExprId } from "../ast/parse.mjs";

export function parseNoteString(
  expr: ASTExpr | undefined,
  a: MacroAPI,
  errctx: string
): string {
  if (!expr || expr.type != ASTType.NOTE) {
    a.error(`Error in ${errctx}: Expected a string literal.`);
  }
  return expr.text;
}

export function parseIdentSingleString(
  expr: ASTExpr | undefined,
  a: MacroAPI,
  errctx: string,
  errctx2?: string
): string {
  if (!expr || expr.type != ASTType.IDENTIFIER) {
    a.error(`Error in ${errctx}: Expected an identifier. ${errctx2 ?? ""}`);
  }
  if (expr.segments.length != 1) {
    a.error(
      `Error in ${errctx}: Expected the provided identifier to have only one segment (no '.'). ${
        errctx2 ?? ""
      }`
    );
  }
  return expr.segments[0];
}

export function parseIdentList(
  expr: ASTExpr | undefined,
  a: MacroAPI,
  errctx: string
): string[] {
  if (!expr || expr.type != ASTType.LIST) {
    a.error(`Error in ${errctx}: Expected a list of identifiers.`);
  }
  return expr.elements.map((elem, i) =>
    parseIdentSingleString(elem, a, `${errctx}, element ${i}`)
  );
}

export function parseIdentUnpackedList(
  expr: ASTExpr[],
  a: MacroAPI,
  errctx: string
): string[] {
  return expr.map((elem, i) =>
    parseIdentSingleString(elem, a, `${errctx}, element ${i}`)
  );
}


export const sub: ScopeContent.Content = {
  id: makeExprId(),
  type: ScopeContent.Type.MACRO,
  isBuiltin: true,
  fn: (expr, ctx, a) => {
    if (expr.args.length < 2) {
      a.error("Substitution macro must contain at least a name and a body!");
    }
    const name = parseIdentSingleString(expr.args[0], a, "argument 1");
    const args = parseIdentUnpackedList(expr.args.slice(1, -1), a, "");
    const body = expr.args.slice(-1)[0];

    a.scopeof(expr).contents.set(name, {
      id: makeExprId(),
      type: ScopeContent.Type.MACRO,
      fn: (expr2, ctx2, a2) => {
        if (expr2.args.length != args.length) {
          a.error(
            `Substitution macro '${expr2.name}' requires ${args.length} arguments!`
          );
        }

        const exprTreeClone = (mapAST(a.clone(body), (expr3) => {
          function substituteString(original: string) {
            const index = args.indexOf(original);
            if (index == -1) return original;
            return parseIdentSingleString(
              expr2.args[index],
              a2,
              `argument ${index}`,
              `This macro argument is used in a context which requires it to be a one-segment identifier.`
            );
          }
          if (expr3.type == ASTType.IDENTIFIER) {
            if (expr3.segments.length == 1) {
              const index = args.indexOf(expr3.segments[0]);
              if (index != -1) {
                return { ...expr2.args[index], id: makeExprId() };
              }
            } else {
              const newsegments = expr3.segments
                .map((segment) => {
                  const index = args.indexOf(segment);
                  if (index != -1) {
                    const replacement = expr2.args[index];
                    if (replacement.type != ASTType.IDENTIFIER) {
                      a2.error(
                        "Macro argument is used in a context that requires it to be an identifier."
                      );
                    } else {
                      return replacement.segments;
                    }
                  }
                  return segment;
                })
                .flat();
              return {
                ...expr3,
                segments: newsegments,
                id: makeExprId()
              };
            }
          } else if (expr3.type == ASTType.NAMESPACE) {
            expr3.name = substituteString(expr3.name);
          }
          return { ...expr3,
            id: makeExprId() };
        }));

        return exprTreeClone;
      },
    });

    return a.number(0);
  },
};
