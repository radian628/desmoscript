import {
  ASTExpr,
  ASTJson,
  ASTNode,
  AssignmentNode,
  CompilationUnit,
  FunctionDefNode,
  Scope,
  Scoped,
  asExpr,
  newid,
} from "../ast/ast.js";
import { formatAST } from "../ast/fmt.js";
import { assertNotUndefined, internalError } from "../compiler-errors.js";
import { debugPrint, debugTrace } from "../debug/debug.js";
import {
  findIdentifierScopeItem,
  getScopeNameList,
} from "../scope-tree/create-scope-tree.js";
import { wrongTypeError } from "../scope-tree/typecheck/type-errors.js";
import { getASTExpr, getASTNode } from "../scope-tree/typecheck/typecheck.js";
import {
  GraphState,
  GrapherStateParser,
  tickerParser,
  ItemState,
  itemStateParser,
  nonFolderStateParser,
  expressionStateParser,
  ExpressionState,
} from "./graphstate.js";
//import { fromZodError } from "zod-validation-error";

export type CodegenError = {
  type: "bad-json";
  node: Scoped<ASTJson>;
  start: number;
  end: number;
  unit: string;
  reason: string;
};

export type CodegenContext = {
  currentUnit: string;
  units: Map<string, CompilationUnit>;
  // every identifier must correspond to something in the scope tree
  // in order for it to be codegenned
  identifierNames: Map<number, string>;
  existingNames: Set<string>;
  astNodes: Map<number, Scoped<ASTNode>>;
  state: GraphState;

  alreadyCompiledUnits: Set<string>;

  folderState?: {
    id: string;
    name: string;
  };

  alreadyGeneratedBlockFinalExpressionIDs: Set<number>;
  errors: CodegenError[];

  options: {
    annotateExpressionsWithEquivalentDesmoscript: boolean;
    allInOneFolderID?: string;
  };
};

export function desmosifyName(str: string) {
  if (str.length <= 1) return str;
  return `${str[0]}_{${str.slice(1)}}`;
}

export function capitalizeFirst(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getNameForIdentifier(
  identifierPath: string[],
  startScope: Scope,
  ctx: CodegenContext
): string {
  const scopeItem = findIdentifierScopeItem(
    ctx.units.get(ctx.currentUnit) as CompilationUnit,
    startScope,
    identifierPath,
    { compilationUnits: ctx.units }
  );

  if (scopeItem.result != "found") {
    if (scopeItem.result == "point-member-access") {
      return `${getNameForIdentifier(
        identifierPath.slice(0, -1),
        startScope,
        ctx
      )}.${identifierPath[identifierPath.length - 1]}`;
    }
    debugTrace();
    debugPrint(startScope);
    throw internalError("TODO" + identifierPath.join("."));
  }

  const scopeNamePath = getScopeNameList(startScope).reverse();

  // add variable/function name
  if (scopeItem.identifier.type == "function") {
    scopeNamePath.splice(
      0,
      0,
      getASTNode<FunctionDefNode, "fndef">(
        ctx,
        scopeItem.identifier.node,
        "fndef"
      ).name
    );
  } else if (scopeItem.identifier.type == "variable") {
    scopeNamePath.splice(
      0,
      0,
      getASTNode<AssignmentNode, "assignment">(
        ctx,
        scopeItem.identifier.node,
        "assignment"
      ).lhs
    );

    // if it's a builtin, early return the custom desmos-specific name if it's defined by desmos
  } else if (scopeItem.identifier.type == "builtin-function") {
    if (scopeItem.identifier.definedByDesmos) {
      return `\\operatorname{${identifierPath[identifierPath.length - 1]}}`;
    } else {
      scopeNamePath.splice(0, 0, identifierPath[identifierPath.length - 1]);
    }
  } else if (scopeItem.identifier.type == "builtin-variable") {
    if (scopeItem.identifier.definedByDesmos) {
      return identifierPath[identifierPath.length - 1];
    } else {
      scopeNamePath.splice(0, 0, identifierPath[identifierPath.length - 1]);
    }
  }

  // add compilation unit name to scope name path
  // to further disambiguate names
  scopeNamePath.push(
    ctx.currentUnit.split("/").reverse()[0].replace(".desmo", "")
  );

  // if name already exists, then use it
  const name = ctx.identifierNames.get(scopeItem.identifier.id);
  if (name) return desmosifyName(name);

  // keep appending segments until name is no longer in use
  let proposedName = "";
  const addProposedName = () => {
    ctx.existingNames.add(proposedName);
    ctx.identifierNames.set(scopeItem.identifier.id, proposedName);
  };
  for (const identPathElem of scopeNamePath) {
    proposedName = capitalizeFirst(identPathElem) + proposedName;
    if (!ctx.existingNames.has(proposedName)) {
      addProposedName();
      return desmosifyName(proposedName);
    }
  }

  // keep appending numbers until a free one is found
  let proposedNameWithoutNumber = proposedName;
  let i = 2;
  while (true) {
    proposedName = proposedNameWithoutNumber + i;
    if (!ctx.existingNames.has(proposedName)) {
      addProposedName();
      return desmosifyName(proposedName);
    }
    i++;
  }
}

export function generateExprCode(
  e: Scoped<ASTExpr>,
  ctx: CodegenContext
): string {
  const c = (e: Scoped<ASTExpr>) => generateExprCode(e, ctx);

  switch (e.type) {
    case "binop":
      const l = c(e.lhs);
      const r = c(e.rhs);
      switch (e.op) {
        case "+":
        case "-":
        case "*":
          return `\\left(${l}${e.op}${r}\\right)`;
        case "/":
          return `\\frac{${l}}{${r}}`;
        case "^":
          return `${l}^{${r}}`;
        case "%":
          return `\\operatorname{mod}\\left(${l},${r}\\right)`;
        case "<":
        case ">":
        case "==":
          return `${l}${e.op}${r}`;
        case ">=":
          return `${l}\\ge ${r}`;
        case "<=":
          return `${l}\\le ${r}`;
        case "[":
          return `\\left(${l}\\right)\\left[${r}\\right]`;
        case ",":
          return `\\left(${l},${r}\\right)`;
        case "->":
          return `${l}\\to ${r}`;
        default:
          throw internalError(`UNIMPLEMENTED BINARY OP: ${e.op}`);
      }
    case "block":
      const lastNode = e.body[e.body.length - 1];
      if (!lastNode) throw internalError(`NO EMPTY BLOCKS IN CODEGEN!`);
      const maybeLastExpr = asExpr(lastNode);
      if (!maybeLastExpr.success)
        throw internalError(`EMPTY BLOCKS MUST END IN EXPRESSIONS IN CODEGEN`);
      ctx.alreadyGeneratedBlockFinalExpressionIDs.add(lastNode.id);
      return c(maybeLastExpr.data as Scoped<ASTExpr>);
    case "error":
      // TODO: find an acutally sensible way to handle this
      return "ERROR";
    //throw internalError(`NO ERROR NODES IN CODEGEN`);
    case "fncall":
      return `${c(e.name)}\\left(${e.params
        .map((p) => c(p))
        .join(",")}\\right)`;
    case "identifier":
      return getNameForIdentifier(e.segments, e.enclosingScope, ctx);
    case "list":
      return `\\left[${e.elements.map((e) => c(e)).join(",")}\\right]`;
    case "listcomp":
      return `\\left[${c(e.body)}\\operatorname{for}${e.params
        .map(([v, p]) => {
          return `${getNameForIdentifier([v], e.innerScope, ctx)}=${c(p)}`;
        })
        .join(",")}\\right]`;
    case "macrocall":
      const result = e.result;
      if (!result || result instanceof Promise)
        throw internalError("UNRESOLVED MACRO");

      const resultExpr = asExpr(result);

      if (resultExpr.success && resultExpr.data.type != "note") {
        return c(resultExpr.data as Scoped<ASTExpr>);
      } else {
        return "ERROR";
      }
    // else {
    //   throw internalError(
    //     "TODO: come up with proper error handling for codegen"
    //   );
    // }
    case "match":
      return `\\left\\{${e.branches
        .map(([cond, value]) => `${c(cond)}:${c(value)}`)
        .join(",")}${e.fallback ? `,${c(e.fallback)}` : ""}\\right\\}`;
    case "note":
      throw internalError(`NO NOTES IN CODEGEN`);
    case "number":
      return e.number.toString();
    case "point":
      return `\\left(${c(e.x)},${c(e.y)}\\right)`;
    case "range":
      if (e.step) {
        return `\\left[${c(e.lhs)},${c(e.step)}...${c(e.rhs)}\\right]`;
      } else {
        return `\\left[${c(e.lhs)}...${c(e.rhs)}\\right]`;
      }
    case "unop":
      if (e.op == "!") throw internalError("UNIMPLEMENTED UNARY OP: !");
      if (e.op == ".x" || e.op == ".y")
        return `\\left(${c(e.operand)}\\right)${e.op}`;
      if (e.op == "-") return `-\\left(${c(e.operand)}\\right)`;
  }

  throw internalError("UNREACHABLE");
}

export function compileJSON(e: Scoped<ASTJson>, ctx: CodegenContext): any {
  switch (e.type) {
    case "number":
      return e.number;
    case "note":
      return e.content;
    case "json-array":
      return e.elements.map((f) => compileJSON(f, ctx));
    case "json-boolean":
      return e.data;
    case "json-object":
      return Object.fromEntries(
        e.data.map(([k, v]) => [k, compileJSON(v, ctx)])
      );
    case "json-null":
      return null;
    case "json-inner-expr":
      return generateExprCode(e.expr, ctx);
    case "error":
      throw internalError("ERROR NODE IN JSON");
  }
}

export function defaultGraphstate(): GraphState {
  return {
    version: 9, // TODO: update this perhaps
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
}

export function getJsonNode(
  ctx: { astNodes: Map<number, Scoped<ASTNode>> },
  id: number
): Scoped<ASTJson> {
  const node = ctx.astNodes.get(id);
  if (!node) throw internalError("expected a node to exist");
  if (node.type == "json-array") return node;
  if (node.type == "json-boolean") return node;
  if (node.type == "json-object") return node;
  if (node.type == "number") return node;
  if (node.type == "note") return node;
  if (node.type == "json-inner-expr") return node;
  if (node.type == "json-null") return node;
  throw internalError("expected a json expression");
}

export function generateCodeForScopeTree(ctx: CodegenContext, scope: Scope) {
  if (ctx.options.allInOneFolderID !== undefined) {
    ctx.folderState = { id: ctx.options.allInOneFolderID, name: "" };
  }

  const addFolder = () => {
    if (ctx.options.allInOneFolderID !== undefined) return;
    if (!ctx.folderState) return;
    ctx.state.expressions.list.push({
      id: ctx.folderState.id,
      title: ctx.folderState.name,
      type: "folder",
    });
  };

  const getDisplay = (node: Scoped<ASTJson>): Partial<ExpressionState> => {
    const parsedItemState = expressionStateParser
      .partial()
      .safeParse(compileJSON(node, ctx));

    if (!parsedItemState.success) {
      ctx.errors.push({
        type: "bad-json",
        node,
        start: node.start,
        end: node.end,
        unit: ctx.currentUnit,
        reason: "", //fromZodError(parsedItemState.error).message,
      });
      return {};
    } else {
      return parsedItemState.data;
    }
  };

  const maybeGetDisplay = (
    nodeId: number | undefined
  ): Partial<ExpressionState> => {
    if (!nodeId) return {};
    return getDisplay(getJsonNode(ctx, nodeId));
  };

  const addDesmoscriptEquivalent = (node: Scoped<ASTNode>) => {
    if (!ctx.options.annotateExpressionsWithEquivalentDesmoscript) return;
    ctx.state.expressions.list.push({
      id: newid().toString(),
      type: "text",
      text: formatAST(node, {
        indent: 2,
        tabSize: 2,
        maxlen: 80,
        bindingPower: 0,
      }),
      folderId: ctx.folderState?.id,
    });
  };

  for (const item of scope.imports) {
    generateCodeForCompilationUnit({
      ...ctx,
      currentUnit: item.compilationUnitPath,
    });
  }

  for (const [itemName, item] of scope.elements.entries()) {
    switch (item.type) {
      // add variable to the expression list
      case "variable":
        const assignment = getASTNode<AssignmentNode, "assignment">(
          ctx,
          item.node,
          "assignment"
        );
        addDesmoscriptEquivalent(assignment);
        ctx.state.expressions.list.push({
          id: newid().toString(),
          type: "expression",
          color: "black",
          latex: `${getNameForIdentifier(
            [itemName],
            scope,
            ctx
          )}=${generateExprCode(assignment.rhs, ctx)}`,
          folderId: ctx.folderState?.id,
          ...maybeGetDisplay(item.display),
        });
        break;

      // add function to the expression list
      case "function":
        const astNode = getASTNode<FunctionDefNode, "fndef">(
          ctx,
          item.node,
          "fndef"
        );
        addDesmoscriptEquivalent(astNode);
        ctx.state.expressions.list.push({
          latex: `${getNameForIdentifier(
            [itemName],
            scope,
            ctx
          )}\\left(${astNode.params.map((p) =>
            getNameForIdentifier([p], astNode.innerScope, ctx)
          )}\\right)=${generateExprCode(astNode.body, ctx)}`,
          id: newid().toString(),
          type: "expression",
          color: "black",
          folderId: ctx.folderState?.id,
          ...maybeGetDisplay(item.display),
        });
        break;

      // add scope to the expression list
      case "scope":
        if (item.scope.elements.size == 0) break;
        const oldFolderState = ctx.folderState;
        const newFolderState = {
          id: newid().toString(),
          name:
            (oldFolderState?.name ?? "") +
            (oldFolderState ? `/📁${item.scope.name}` : `📁${item.scope.name}`),
        };
        ctx.folderState = newFolderState;
        addFolder();
        generateCodeForScopeTree(ctx, item.scope);
        ctx.folderState = oldFolderState;
        break;

      // add note to expression list
      case "note":
        ctx.state.expressions.list.push({
          type: "text",
          text: item.text,
          id: newid().toString(),
          folderId: ctx.folderState?.id,
        });
        break;

      // compile a different file
      case "import": {
        // const oldFolderState = ctx.folderState;
        // ctx.folderState = undefined;
        generateCodeForCompilationUnit({
          ...ctx,
          currentUnit: item.compilationUnitPath,
        });
        // ctx.folderState = oldFolderState;
        // addFolder();
        break;
      }

      // compile settings
      case "settings":
        const json = compileJSON(getJsonNode(ctx, item.settings), ctx);
        switch (item.settingsType) {
          case "settings":
            const parsedSettings = GrapherStateParser.safeParse(json);
            if (parsedSettings.success) {
              ctx.state.graph = parsedSettings.data;
            } else {
              throw wrongTypeError(
                json,
                ctx.currentUnit,
                "failed to set settings for the following reasons: " +
                  parsedSettings.error.format()._errors.join("\n")
              );
            }
          case "ticker":
            const parsedTickerSettings = tickerParser.safeParse(json);
            if (parsedTickerSettings.success) {
              ctx.state.expressions.ticker = parsedTickerSettings.data;
            } else {
              throw wrongTypeError(
                json,
                ctx.currentUnit,
                "failed to set ticker for the following reasons: " +
                  parsedTickerSettings.error.format()._errors.join("\n")
              );
            }
        }
        break;

      case "expression":
        const expr = getASTExpr(ctx, item.expr);
        addDesmoscriptEquivalent(expr);
        if (ctx.alreadyGeneratedBlockFinalExpressionIDs.has(expr.id)) break;
        ctx.state.expressions.list.push({
          type: "expression",
          id: newid().toString(),
          folderId: ctx.folderState?.id,
          latex: generateExprCode(expr, ctx),
          color: "black",
          ...maybeGetDisplay(item.display),
        });
    }
  }
}

export function generateCodeForCompilationUnit(ctx: CodegenContext) {
  if (ctx.alreadyCompiledUnits.has(ctx.currentUnit)) return;
  ctx.alreadyCompiledUnits.add(ctx.currentUnit);
  generateCodeForScopeTree(
    ctx,
    assertNotUndefined(
      ctx.units.get(ctx.currentUnit),
      `${ctx.currentUnit} not found in generateCodeForCompilationUnit`
    ).scopeTree
  );
}

export function generateCode(ctx: CodegenContext) {
  generateCodeForCompilationUnit(ctx);

  // console.log(
  //   Array.from(
  //     Array.from(ctx.units.values())[0].scopeTree.elements.values()
  //   ).filter((e) => e.type === "expression")
  // );

  if (ctx.options.allInOneFolderID) {
    ctx.state.expressions.list.splice(0, 0, {
      type: "folder",
      id: ctx.options.allInOneFolderID,
      title: "Desmoscript Compiler Output",
    });
  }
}
