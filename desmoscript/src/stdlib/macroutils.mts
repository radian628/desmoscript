import { Identifier, MacroDefinition } from "../../dist/semantic-analysis-types.mjs";

export const substitute: MacroDefinition = {
    type: Identifier.MACRO,
    fn: (expr, ctx, a) => {
        if (expr.args.length == 0) {
            a.error("Substitution macro must contain a body and zero or more arguments!");
        }
        const args = expr.args.slice(0, -1);
        const body = expr.args.slice(-1);
    }
}