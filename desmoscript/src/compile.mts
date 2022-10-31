import { ASTBinop, ASTIdentifier, ASTJSON, ASTNamedJSON, ASTType, JSONType } from "./ast.mjs";
import { ExpressionState, expressionStateParser, expressionStateWithoutColumnParser, GrapherStateParser, GraphState, tickerParser } from "./graphstate.mjs";
import { DesmoscriptContext, ScopedASTExpr, AnalyzedDesmoscript, ScopeContent, Identifier, Scope, ScopeInfo } from "./semantic-analysis-types.mjs";

const optable: { [key: string]: string } = {
    "+": "+",
    "-": "-",
    "*": "\\cdot ",
    ">": "\\gt ",
    "<": "\\lt ",
    ">=": "\\ge ",
    "<=": "\\le ",
    "->": "\\to ",
    "..": "...",
    "=": "=",
    "==": "="
}

function opToLatex<T>(expr: ASTBinop<T>) {
    const lop: string | undefined = optable[expr.op];
    if (!lop) throw {
        expr,
        reason: `Unable to convert operator '${expr.op}'. Contact a developer if this error occurs.`
    }
    return lop;
}

function toDesmosVar(str: string) {
    if (str.length == 1) return str;
    return `${str[0]}_{${str.slice(1)}}`;
}

function lastof<T>(arr: T[]) {
    return arr[arr.length - 1];
}

function createIdentifierScopeChain(
    ident: ASTIdentifier<{ equivalentScope?: Scope, innerScope?: Scope}>, 
    foundScope: Scope
): string[] {
    const foundScopeChain = getScopeChain(foundScope);
    return foundScopeChain.concat(ident.segments);
}

function getScopeChain(scope: Scope) {
    const chain: string[] = [];
    while (scope.parent != undefined) {
        chain.push(scope.scopeName);
        scope = scope.parent;
    }
    return chain.reverse();
}

type IdentSearchResults = {
    path: string[],
    content: ScopeContent
};

function findIdentifier(ident: ASTIdentifier<{ equivalentScope?: Scope, innerScope?: Scope}>): IdentSearchResults {
    if (ident.equivalentScope == undefined) {
        throw {
            expr: ident,
            reason: "Identifiers must have an equivalent scope. Contact a developer if this error occurs."
        };
    } 
    let searchScope: Scope | undefined = ident.equivalentScope;
    while (searchScope) {
        //console.log(ident, searchScope);
        let segmentValidatorScope = searchScope;
        for (let segmentIndex = 0; segmentIndex < ident.segments.length; segmentIndex++) {
            if (segmentValidatorScope.contents.has(ident.segments[segmentIndex])) {
                const scopeContent = segmentValidatorScope.contents.get(ident.segments[segmentIndex]) as ScopeContent;
                //console.log(ident.segments[0], scopeContent);
                if (segmentIndex == ident.segments.length - 1) {
                    if ([
                        Identifier.BUILTIN_FUNCTION, 
                        Identifier.BUILTIN_VARIABLE, 
                        Identifier.FUNCTION, 
                        Identifier.MACRO, 
                        Identifier.VARIABLE, 
                        Identifier.FUNCTION_ARG
                    ].indexOf(scopeContent.type) != -1) {
                        return {
                            path: createIdentifierScopeChain(ident, searchScope),
                            content: scopeContent
                        }
                    }
                } else {
                    if (scopeContent.type == Identifier.SCOPE) {
                        segmentValidatorScope = scopeContent.root;
                    }
                }
            } else {
                break;
            }
        }
        searchScope = searchScope.parent;
    }
    throw {
        expr: ident,
        reason: `Identifier '${ident.segments.join(".")}' does not exist in this scope.`
    };
}

export function compileDesmoscriptScopeTree(code: AnalyzedDesmoscript): GraphState {
    function compileSingleExpression(rootExpr: ScopedASTExpr): string {
        function c(e: ScopedASTExpr): string {
            if (e.equivalentScope == undefined) throw {
                expr: e,
                reason: `All expressions must have an equivalent scope! \n${JSON.stringify(e)}`
            }
            switch (e.type) {
            case ASTType.BINOP:
                if (e.op == "^") return `${c(e.left)}^{${c(e.right)}}`;
                if (e.op == "[") return `${c(e.left)}\\left[${c(e.right)}\\right]`;
                if (e.op == "/") return `\\frac{${c(e.left)}}{${c(e.right)}}`;
                if (e.op == "%") return `\\operatorname{mod}\\left(${c(e.left)},${c(e.right)}\\right)`
                if (e.op == "=") return `${c(e.left)}${opToLatex(e)}${c(e.right)}`;
                if (e.op == "..") return `\\left[${c(e.left)}${opToLatex(e)}${c(e.right)}\\right]`;
                if ([">", "<", ">=", "<=", "=="].indexOf(e.op) != -1) {
                    return `${c(e.left)}${opToLatex(e)}${c(e.right)}`;
                }
                return `\\left(${c(e.left)}${opToLatex(e)}${c(e.right)}\\right)`;
            case ASTType.NUMBER:
                return e.number.toString();
            case ASTType.ROOT:
                throw {
                    expr: e,
                    reason: "A single expression should never be the root! Contact a developer if this error occurs."
                }
            case ASTType.IDENTIFIER:
                const ident = findIdentifier(e);
                if (ident.content.type == Identifier.BUILTIN_FUNCTION) {
                    return `\\operatorname{${ident.path[ident.path.length - 1]}}`;
                } else if (ident.content.type == Identifier.BUILTIN_VARIABLE) {
                    return ident.path[ident.path.length - 1];
                }
                return toDesmosVar(ident.path.join("NSSEP"));
            case ASTType.POINT:
                return `\\left(${c(e.x)}, ${c(e.y)}\\right)`;
            case ASTType.FNCALL:
                return `${c(e.name)}\\left(${e.args.map(arg => c(arg)).join(",")}\\right)`;
            case ASTType.MACROCALL:
                if (!e.substitution) throw {
                    expr: e,
                    reason: "This macro does not have a substitution. Contact a dev if this error occurs."
                }
                return c(e.substitution);
            case ASTType.LIST:
                return `\\left[${e.elements.map(expr => c(expr)).join(",")}\\right]`;
            case ASTType.STEP_RANGE:
                return `\\left[${c(e.left)},${c(e.step)}...${c(e.right)}\\right]`;
            case ASTType.FNDEF:
                if (e.innerScope == undefined) throw {
                    expr: e,
                    reason: "A function must have an inner scope! Contact the dev if this error occurs!"
                }
                // const fnBody = lastof<ScopeContent>(Array.from(e.innerScope?.contents.values()));
                // //console.log(fnBody);
                // if (fnBody.type != Identifier.EXPRESSION) throw {
                //     expr: e,
                //     reason: "A function body must end with an expression that resolves to a value!"
                // }
                // let body = fnBody;

                const body = e.lastExpr;

                if (!body) throw {
                    expr: e,
                    reason: "A function must end with an expression that resolves to a value!"
                }

                /// TODO: FIX "BLOCK INSIDE MATCH" BUG


                // while (body.type != Identifier.EXPRESSION) {
                //     let body2 = lastof<ScopeContent>(Array.from(body.root.contents.values()));
                //     if (body2.type != Identifier.EXPRESSION && body2.type != Identifier.SCOPE) throw {
                //         expr: e,
                //         reason: "A function body must end with an expression that resolves to a value!"
                //     }
                //     console.log(body2);
                //     body = body2;
                //     depth++;
                //     if (depth > 10000) {
                //         throw { expr: e, reason: "Nesting depth exceeded." };
                //     }
                // }
                return `${c(e.name)}\\left(${e.args.map(arg => toDesmosVar(getScopeChain(e.innerScope as Scope).join("NSSEP") + "NSSEP" + arg)).join(",")}\\right)=` +
                    `${c(body)}`;
            case ASTType.NAMESPACE:
                return "";
            case ASTType.BLOCK:
                if (e.innerScope == undefined) throw {
                    expr: e,
                    reason: "A block must have an inner scope! Contact the dev if this error occurs!"
                }
                const blockBody = lastof<ScopeContent>(Array.from(e.innerScope?.contents.values()));
                if (blockBody.type != Identifier.EXPRESSION) throw {
                    expr: e,
                    reason: "A block body must end with an expression that resolves to a value!"
                }
                return c(blockBody.root);
            case ASTType.MATCH:
                return `\\left\\{`+
                `${e.branches.map(([predicate, result]) => `${c(predicate)}: ${c(result)}`).join(",")}`
                + `${e.fallback ? `, ${c(e.fallback)}` : ""}`
                +`\\right\\}`;
            case ASTType.IMPORT:
                return "";
            case ASTType.MACRODEF:
                return "";
            case ASTType.LISTCOMP:
                if (e.innerScope == undefined) throw {
                    expr: e,
                    reason: "A listcomp must have an inner scope! Contact the dev if this error occurs!"
                }
                return `\\left[${c(e.body)}\\operatorname{for}${
                    e.variables.map(([varname, list]) => `${
                        //@ts-ignore
                        toDesmosVar(`${getScopeChain(e.innerScope).join("NSSEP")}NSSEP${varname}`)
                    }=${c(list)}`).join(",")
                }\\right]`;
            case ASTType.SUMPRODINT:
                if (e.innerScope == undefined) throw {
                    expr: e,
                    reason: "A sum/product/integral must have an inner scope! Contact the dev if this error occurs!"
                }
                const counterVarName = toDesmosVar(getScopeChain(e.innerScope) + "NSSEP" + e.varName);
                if (e.opType == "integral") {
                    return `\\left(\\int_{${c(e.lo)}}^{${c(e.hi)}}\\left(${c(e.body)}\\right)d${counterVarName}\\right)`;
                } else {
                    let op = (e.opType == "product") ? "prod" : "sum"
                    return `\\left(\\${op}_{${counterVarName}=${c(e.lo)}}^{${c(e.hi)}}\\left(${c(e.body)}\\right)\\right)`;
                }
            case ASTType.DERIVATIVE:
                if (e.innerScope == undefined) throw {
                    expr: e,
                    reason: "A derivative must have an inner scope! Contact the dev if this error occurs!"
                }
                const varname = toDesmosVar(getScopeChain(e.innerScope).join("NSSEP") + "NSSEP" + e.variable);
                return `\\left(\\frac{d}{d${varname}}\\left(${c(e.body)}\\right)\\right)`;
            case ASTType.MEMBERACCESS:
                return `${c(e.left)}.${e.right}`;
            case ASTType.ACTIONS:
                return e.actions.map(([l, r]) => `${c(l)}\\to ${c(r)}`)
                    .concat(e.actionAliases.map(a => c(a)))
                    .join(",");
            default:
                return "UNHANDLEDVARIANT";
            }
        }
        return c(rootExpr);
    }

    function compileJSONExpression(expr: ASTJSON<ScopeInfo>) {
        function c(e: ASTJSON<ScopeInfo>): any {
            switch (e.data.jsontype) {
            case JSONType.NUMBER:
            case JSONType.STRING:
            case JSONType.NULL:
            case JSONType.BOOLEAN:
                return e.data.data;
            case JSONType.OBJECT:
                return Object.fromEntries(Object.entries(e.data.data)
                    .map(([k,v]): [string, any] => [k, c(v)]));
            case JSONType.ARRAY:
                return e.data.data.map(e => c(e));
            case JSONType.DESMOSCRIPT:
                return compileSingleExpression(e.data.data);
            }
        }

        return c(expr);
    }

    const graphState: GraphState = {
        version: 9,
        graph: {
            viewport: {
                xmin: -10, ymin: -10, xmax: 10, ymax: 10
            }
        },
        expressions: {
            list: []
        }
    }

    let id = 0;
    function makeExprID() {
        return (id++).toString();
    }

    function compileScope(scope: Scope) {
        for (const [name, content] of scope.contents) {
            switch (content.type) {
            case Identifier.SCOPE:
                compileScope(content.root);
                break;
            case Identifier.VARIABLE:
                if (content.noCodeGen) break;
            case Identifier.FUNCTION:
                graphState.expressions.list.push({
                    type: "expression",
                    color: "black",
                    hidden: true,
                    id: makeExprID(),
                    latex: compileSingleExpression(content.root)
                });
                break;
            case Identifier.DECORATOR:
                if (content.root.json.type != ASTType.JSON) throw {
                    expr: content,
                    reason: "Body must be JSON!"
                }
                const displayJson = compileJSONExpression(content.root.json);
                const parsedDisplayJSON = expressionStateParser
                    .omit({
                        type: true, 
                        id: true
                    }).parse(displayJson);
                    graphState.expressions.list.push({
                        type: "expression",
                        id: makeExprID(),
                        latex: compileSingleExpression(content.root.expr),
                        ...parsedDisplayJSON
                    });
                break;
            case Identifier.NAMED_JSON:
                if (content.root.json.type != ASTType.JSON) throw {
                    expr: content,
                    reason: "Body must be JSON!"
                }
                if (content.root.name == "settings") {
                    const json = compileJSONExpression(content.root.json);
                    const parsedJSON = GrapherStateParser.parse(json);
                    graphState.graph = parsedJSON;
                } else if (content.root.name == "ticker") {
                    const json = compileJSONExpression(content.root.json);
                    const parsedJSON = tickerParser.parse(json);
                    graphState.expressions.ticker = parsedJSON;
                }
                break;
            case Identifier.NOTE:
                graphState.expressions.list.push({
                    type: "text",
                    id: makeExprID(),
                    text: content.root
                });
                break;
            case Identifier.EXPRESSION:
                if (typeof content.root != "string" && content.root.type == ASTType.MACROCALL) compileSingleExpression(content.root);
                break;
            // case Identifier.EXPRESSION:
            //     console.log(content.root);
            //     switch (content.root.type) {
            //     case ASTType.JSON:
            //         switch (content.root.data.jsontype) {
            //         case JSONType.STRING:
            //             graphState.expressions.list.push({
            //                 id: makeExprID(),
            //                 type: "text",
            //                 text: content.root.data.data.slice(1, -1)
            //             });
            //         }
            //     case ASTType.ROOT:
            //         break;
            //     default:
            //         graphState.expressions.list.push({
            //             type: "expression",
            //             id: makeExprID(),
            //             latex: compileSingleExpression(content.root),
            //             color: "black"
            //         });
            //     }
            }
        }
    }

    compileScope(code.rootScope);
    return graphState;
}