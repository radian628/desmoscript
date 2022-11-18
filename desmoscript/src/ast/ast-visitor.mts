import { ASTActions, ASTBinop, ASTBlock, ASTDecorator, ASTDerivative, ASTFunctionCall, ASTFunctionDef, ASTIdentifier, ASTImport, ASTJSON, ASTJsonData, ASTList, ASTListComp, ASTMatch, ASTMemberAccess, ASTNamedJSON, ASTNamespace, ASTNote, ASTNumber, ASTPoint, ASTRoot, ASTStepRange, ASTSumProdInt, ASTType, RawASTExpr } from "./ast.mjs";

export type VisitorEntry<T, U, CtxBefore, CtxAfter, NodeType extends RawASTExpr<T>> = (
    node: NodeType,
    ctx: CtxBefore, 
    visit: (node: RawASTExpr<T>, ctx: CtxBefore) => [RawASTExpr<U>, CtxAfter]
) => [RawASTExpr<U>, CtxAfter];

export type ASTVisitorLUT<T, U, B, A> = {
    number: VisitorEntry<T, U, B, A, ASTNumber<T>>
    binop: VisitorEntry<T, U, B, A, ASTBinop<T>>,
    root: VisitorEntry<T, U, B, A, ASTRoot<T>>,
    identifier: VisitorEntry<T, U, B, A, ASTIdentifier<T>>,
    point: VisitorEntry<T, U, B, A, ASTPoint<T>>,
    fncall: VisitorEntry<T, U, B, A, ASTFunctionCall<T>>,
    list: VisitorEntry<T, U, B, A, ASTList<T>>,
    step_range: VisitorEntry<T, U, B, A, ASTStepRange<T>>,
    fndef: VisitorEntry<T, U, B, A, ASTFunctionDef<T>>,
    namespace: VisitorEntry<T, U, B, A, ASTNamespace<T>>,
    block: VisitorEntry<T, U, B, A, ASTBlock<T>>,
    match: VisitorEntry<T, U, B, A, ASTMatch<T>>,
    import: VisitorEntry<T, U, B, A, ASTImport<T>>,
    sumprodint: VisitorEntry<T, U, B, A, ASTSumProdInt<T>>,
    derivative: VisitorEntry<T, U, B, A, ASTDerivative<T>>,
    listcomp: VisitorEntry<T, U, B, A, ASTListComp<T>>,
    memberaccess: VisitorEntry<T, U, B, A, ASTMemberAccess<T>>,
    json: VisitorEntry<T, U, B, A, ASTJSON<T>>,
    decorator: VisitorEntry<T, U, B, A, ASTDecorator<T>>,
    named_json: VisitorEntry<T, U, B, A, ASTNamedJSON<T>>,
    note: VisitorEntry<T, U, B, A, ASTNote<T>>,
    actions: VisitorEntry<T, U, B, A, ASTActions<T>>,
}

export function visitAST<T, U, CtxBefore, CtxAfter>(
    root: RawASTExpr<T>, 
    lut: ASTVisitorLUT<T, U, CtxBefore, CtxAfter>, 
    context: CtxBefore
): [RawASTExpr<U>, CtxAfter] {
    const visit = (node: RawASTExpr<T>, ctx: CtxBefore) => {
        const result = lut[node.type](node, ctx, visit);
        return result;
    }

    return visit(root, context);
}