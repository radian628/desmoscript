import { Identifier, MacroAPI, MacroDefinition, ScopedASTExpr } from "../semantic-analysis-types.mjs";
import { mapAST, ASTType, MapASTOrder } from "../ast.mjs";

export function parseNoteString(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string {
  if (!expr || expr.type != ASTType.NOTE) {
      a.error(`Error in ${errctx}: Expected a string literal.`);
  }
  return expr.text;
}

export function parseIdentSingleString(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string {
  if (!expr || expr.type != ASTType.IDENTIFIER) {
      a.error(`Error in ${errctx}: Expected an identifier.`);
  }
  if (expr.segments.length != 1) {
      a.error(`Error in ${errctx}: Expected the provided identifier to have only one segment (no '.')`);
  }
  return expr.segments[0];
}


export function parseIdentList(expr: ScopedASTExpr | undefined, a: MacroAPI, errctx: string): string[] {
  if (!expr || expr.type != ASTType.LIST) {
      a.error(`Error in ${errctx}: Expected a list of identifiers.`);
  }
  return expr.elements.map((elem, i) => parseIdentSingleString(elem, a, `${errctx}, element ${i}`))
}

export function parseIdentUnpackedList(expr: ScopedASTExpr[], a: MacroAPI, errctx: string): string[] {
  return expr.map((elem, i) => parseIdentSingleString(elem, a, `${errctx}, element ${i}`))
}


export const sub: MacroDefinition = {
  type: Identifier.MACRO,
  fn: (expr, ctx, a) => {
    if (expr.args.length < 2) {
        a.error("Substitution macro must contain at least a name and a body!");
    }
    const name = parseIdentSingleString(expr.args[0], a, "argument 0");
    const args = parseIdentUnpackedList(expr.args.slice(1, -1), a, "");
    const body = expr.args.slice(-1)[0];

    expr.equivalentScope?.contents.set(name, {
      type: Identifier.MACRO,
      fn: (expr2, ctx2, a2) => {
        if (expr2.args.length != args.length) {
            a.error(`Substitution macro '${expr2.name}' requires ${args.length} arguments!`);
        }
        return mapAST(body, expr3 => {
          if (expr3.type == ASTType.IDENTIFIER) {
            if (expr3.segments.length == 1) {
              const index = args.indexOf(expr3.segments[0]);
              if (index != -1) {
                return expr2.args[index];
              }
            }
          }
          return expr3;
        }, MapASTOrder.PRE);
      }
    });

    return a.number(0);
  }
}