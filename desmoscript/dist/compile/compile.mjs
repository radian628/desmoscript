import { compileExpression, } from "./compile-expression.mjs";
import { expressionStateParser, GrapherStateParser, tickerParser, } from "../graphstate.mjs";
import { getCanonicalIdentifierName } from "../scope-tree-lookup.mjs";
import { parseDJSON } from "./compile-djson.mjs";
import { err } from "../error-handling.mjs";
import { fromZodError } from "zod-validation-error";
let exprid = 0;
function exprID() {
    return (exprid++).toString();
}
export function compileAssignment(assignment, ctx) {
    const varname = getCanonicalIdentifierName(assignment.enclosingScope, ctx.state, ctx.unit, assignment, [assignment.name]);
    let annotation = {};
    if (assignment.annotation) {
        let maybeAnnotation = expressionStateParser
            .partial()
            .safeParse(parseDJSON(assignment.annotation, ctx));
        if (maybeAnnotation.success == false) {
            let zerr = maybeAnnotation.error;
            err(assignment.annotation, `Expression state is formatted incorrectly: ${fromZodError(zerr)}`);
        }
        annotation = maybeAnnotation.data;
    }
    return {
        type: "expression",
        id: exprID(),
        latex: `${varname}=${compileExpression(assignment.value, ctx)}`,
        color: "black",
        hidden: true,
        ...annotation,
    };
}
export function compileFunctionDefinition(fndef, ctx) {
    const varname = getCanonicalIdentifierName(fndef.enclosingScope, ctx.state, ctx.unit, fndef, [fndef.name]);
    return {
        type: "expression",
        id: exprID(),
        color: "black",
        hidden: true,
        latex: `${varname}\\left(\\right)=${compileExpression(fndef.body, ctx)}`,
    };
}
export function unwrap(value) {
    if (value == undefined)
        throw new Error("Unexpected undefined.");
    return value;
}
export function compileScope(scope, ctx, state) {
    for (const [name, content] of scope.contents) {
        switch (content.type) {
            case "variable":
                if (content.data.type == "other") {
                    const compiled = compileAssignment(content.data.expr, ctx);
                    state.expressions.list.push(compiled);
                }
                break;
            case "function":
                if (content.data.type == "other") {
                    const compiled = compileFunctionDefinition(content.data.expr, ctx);
                    state.expressions.list.push(compiled);
                }
                break;
            case "scope":
                compileScope(content, ctx, state);
                break;
            case "namedjson":
                const json = parseDJSON(content.json, ctx);
                switch (content.name) {
                    case "ticker":
                        let tickerInfo = tickerParser.safeParse(json);
                        if (!tickerInfo.success) {
                            let zerr = tickerInfo.error;
                            err(content.json, `Ticker state is formatted incorrectly: ${fromZodError(zerr)}`);
                        }
                        state.expressions.ticker = tickerInfo.data;
                    case "settings":
                        let settingsInfo = GrapherStateParser.partial().safeParse(json);
                        if (!settingsInfo.success) {
                            let zerr = settingsInfo.error;
                            err(content.json, `Settings are formatted incorrectly: ${fromZodError(zerr)}`);
                        }
                        Object.assign(state.graph, settingsInfo.data);
                }
                break;
            case "import":
                if (ctx.compiledUnits.has(content.path))
                    continue;
                ctx.compiledUnits.add(content.path);
                const unit = unwrap(ctx.state.units.get(content.path));
                compileScope(unit.scopeTree, {
                    compiledUnits: ctx.compiledUnits,
                    unit,
                    state: ctx.state,
                }, state);
                ctx.compiledUnits.add(content.path);
                break;
        }
    }
}
export function compileDesmoscriptState(state) {
    const graphState = {
        version: 9,
        graph: {
            viewport: {
                xmin: -10,
                ymin: -10,
                xmax: 10,
                ymax: 10,
            },
        },
        expressions: {
            list: [],
        },
    };
    const unit = unwrap(state.units.get(state.entryPointURL));
    compileScope(unit.scopeTree, {
        state,
        unit,
        compiledUnits: new Set([state.entryPointURL]),
    }, graphState);
    return graphState;
}
