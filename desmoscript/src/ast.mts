import { never } from "zod";

export enum ASTType {
  BINOP,
  NUMBER,
  ROOT,
  IDENTIFIER,
  POINT,
  FNCALL,
  LIST,
  STEP_RANGE,
  FNDEF,
  NAMESPACE,
  BLOCK,
  MATCH,
  MACRODEF,
  MACROCALL,
  IMPORT,
  SUMPRODINT,
  INTEGRAL,
  DERIVATIVE,
  LISTCOMP,
  MEMBERACCESS,
  JSON,
  DECORATOR,
  NAMED_JSON,
  NOTE,
  ACTIONS
}

export type LineCol = {
  line: number;
  col: number;
  file: string;
};

export type ASTBinop<T> = {
  op:
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "=="
    | ">"
    | "<"
    | ">="
    | "<="
    | ".."
    | "="
    | "->"
    | "["
    | "^";
  left: T & RawASTExpr<T>;
  right: T & RawASTExpr<T>;
  type: ASTType.BINOP;
} & LineCol &
  T;

export type ASTNumber<T> = {
  number: number;
  type: ASTType.NUMBER;
} & LineCol &
  T;

export type ASTIdentifier<T> = {
  segments: string[];
  type: ASTType.IDENTIFIER;
} & LineCol &
  T;

export type ASTPoint<T> = {
  x: T & RawASTExpr<T>;
  y: T & RawASTExpr<T>;
  type: ASTType.POINT;
} & LineCol &
  T;

export type ASTFunctionCall<T> = {
  name: T & RawASTExpr<T>;
  args: (T & RawASTExpr<T>)[];
  type: ASTType.FNCALL | ASTType.MACROCALL;
  substitution?: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTList<T> = {
  elements: (T & RawASTExpr<T>)[];
  type: ASTType.LIST;
} & LineCol &
  T;

export type ASTRoot<T> = {
  expressions: (T & RawASTExpr<T>)[];
  type: ASTType.ROOT;
} & LineCol &
  T;

export type ASTStepRange<T> = {
  left: T & RawASTExpr<T>;
  step: T & RawASTExpr<T>;
  right: T & RawASTExpr<T>;
  type: ASTType.STEP_RANGE;
} & LineCol &
  T;

export type ASTFunctionDef<T> = {
  name: T & RawASTExpr<T>;
  args: string[];
  bodyExprs: (T & RawASTExpr<T>)[];
  lastExpr?: T & RawASTExpr<T>;
  type: ASTType.FNDEF | ASTType.MACRODEF;
} & LineCol &
  T;

export type ASTNamespace<T> = {
  name: string;
  bodyExprs: (T & RawASTExpr<T>)[];
  type: ASTType.NAMESPACE;
} & LineCol &
  T;

export type ASTBlock<T> = {
  bodyExprs: (T & RawASTExpr<T>)[];
  type: ASTType.BLOCK;
  lastExpr?: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTMatch<T> = {
  branches: [T & RawASTExpr<T>, T & RawASTExpr<T>][];
  fallback?: T & RawASTExpr<T>;
  type: ASTType.MATCH;
} & LineCol &
  T;

export type ASTImport<T> = {
  filename: string;
  alias?: string;
  type: ASTType.IMPORT;
} & LineCol &
  T;

export type ASTSumProdInt<T> = {
  type: ASTType.SUMPRODINT;
  opType: "sum" | "product" | "integral";
  varName: string;
  lo: T & RawASTExpr<T>;
  hi: T & RawASTExpr<T>;
  body: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTDerivative<T> = {
  type: ASTType.DERIVATIVE;
  variable: string;
  body: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTListComp<T> = {
  type: ASTType.LISTCOMP;
  variables: [string, T & RawASTExpr<T>][];
  body: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTMemberAccess<T> = {
  type: ASTType.MEMBERACCESS;
  left: T & RawASTExpr<T>;
  right: string;
} & LineCol &
  T;

export enum JSONType {
  NUMBER,
  STRING,
  OBJECT,
  ARRAY,
  BOOLEAN,
  NULL,
  DESMOSCRIPT,
}

export type ASTJsonData<T> =
  | {
      jsontype: JSONType.NUMBER;
      data: number;
    }
  | {
      jsontype: JSONType.STRING;
      data: string;
    }
  | {
      jsontype: JSONType.OBJECT;
      data: Record<string, T & ASTJSON<T>>;
    }
  | {
      jsontype: JSONType.ARRAY;
      data: (T & ASTJSON<T>)[];
    }
  | {
      jsontype: JSONType.BOOLEAN;
      data: boolean;
    }
  | {
      jsontype: JSONType.NULL;
      data: null;
    }
  | {
      jsontype: JSONType.DESMOSCRIPT;
      data: T & RawASTExpr<T>;
    };

export type ASTJSON<T> = {
  type: ASTType.JSON;
  data: ASTJsonData<T>;
} & LineCol &
  T;

export type ASTDecorator<T> = {
  type: ASTType.DECORATOR;
  name: string;
  expr: T & RawASTExpr<T>;
  json: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTNamedJSON<T> = {
  type: ASTType.NAMED_JSON;
  name: string;
  json: T & RawASTExpr<T>;
} & LineCol &
  T;

export type ASTNote<T> = {
  type: ASTType.NOTE;
  text: string;
} & LineCol &
  T;

export type ASTActions<T> = {
  type: ASTType.ACTIONS;
  actions: [T & RawASTExpr<T>, T & RawASTExpr<T>][],
  actionAliases: (T & RawASTExpr<T>)[]
} & LineCol & T;

export type RawASTExpr<T> =
  | ASTBinop<T>
  | ASTNumber<T>
  | ASTRoot<T>
  | ASTIdentifier<T>
  | ASTPoint<T>
  | ASTFunctionCall<T>
  | ASTList<T>
  | ASTStepRange<T>
  | ASTFunctionDef<T>
  | ASTNamespace<T>
  | ASTBlock<T>
  | ASTMatch<T>
  | ASTImport<T>
  | ASTSumProdInt<T>
  | ASTDerivative<T>
  | ASTListComp<T>
  | ASTMemberAccess<T>
  | ASTJSON<T>
  | ASTDecorator<T>
  | ASTNamedJSON<T>
  | ASTNote<T>
  | ASTActions<T>;

export type ASTExpr = RawASTExpr<{}>;

export function convertASTToSExpression(expressionToPrint: ASTExpr): string {
  const p: (e: ASTExpr) => string = (e: ASTExpr) => {
    switch (e.type) {
      case ASTType.BINOP:
        return `(${e.op} ${p(e.left)} ${p(e.right)})`;
      case ASTType.NUMBER:
        return e.number.toString();
      case ASTType.ROOT:
        return e.expressions.map((expr) => p(expr)).join("\n");
      case ASTType.IDENTIFIER:
        return e.segments.join(".");
      case ASTType.POINT:
        return `(point ${p(e.x)} ${p(e.y)})`;
      case ASTType.FNCALL:
      case ASTType.MACROCALL:
        return `(${p(e.name)} ${e.args.map((arg) => p(arg)).join(" ")})`;
      case ASTType.LIST:
        return `(list ${e.elements.map((expr) => p(expr)).join(" ")})`;
      case ASTType.STEP_RANGE:
        return `(.. ${p(e.left)} ${p(e.step)} ${p(e.right)})`;
      case ASTType.FNDEF:
      case ASTType.MACRODEF:
        return `(${e.name ? p(e.name) : "lambda"} (${e.args.join(
          " "
        )}) ${e.bodyExprs.map((expr) => p(expr)).join("\n")})`;
      case ASTType.NAMESPACE:
        return `(namespace ${e.bodyExprs.map((expr) => p(expr)).join("\n")})`;
      case ASTType.BLOCK:
        return `(block ${e.bodyExprs.map((expr) => p(expr)).join("\n")})`;
      case ASTType.MATCH:
        return `(match ${e.branches
          .map(([predicate, result]) => `(${p(predicate)} ${p(result)})`)
          .join("\n")}${e.fallback ? ` ${p(e.fallback)}` : ""})`;
      case ASTType.IMPORT:
        return `(import ${e.filename}${e.alias ? ` as ${e.alias}` : ""})`;
      default:
        return `(UNHANDLED VARIANT)`;
    }
  };
  return p(expressionToPrint);
}

export function traverseAST<T>(
  e: RawASTExpr<T>,
  callback: (expr: RawASTExpr<T>) => void
) {
  callback(e);
  switch (e.type) {
    case ASTType.BINOP:
      traverseAST(e.left, callback);
      traverseAST(e.right, callback);
      return;
    case ASTType.NUMBER:
      return;
    case ASTType.ROOT:
      for (let expr of e.expressions) traverseAST(expr, callback);
    case ASTType.IDENTIFIER:
      return;
    case ASTType.POINT:
      traverseAST(e.x, callback);
      traverseAST(e.y, callback);
      return;
    case ASTType.FNCALL:
      traverseAST(e.name, callback);
      for (let expr of e.args) traverseAST(expr, callback);
      return;
    case ASTType.LIST:
      for (let expr of e.elements) traverseAST(expr, callback);
      return;
    case ASTType.STEP_RANGE:
      traverseAST(e.left, callback);
      traverseAST(e.step, callback);
      traverseAST(e.right, callback);
      return;
    case ASTType.FNDEF:
      if (e.name) traverseAST(e.name, callback);
      for (let expr of e.bodyExprs) traverseAST(expr, callback);
      return;
    case ASTType.NAMESPACE:
      for (let expr of e.bodyExprs) traverseAST(expr, callback);
      return;
    case ASTType.BLOCK:
      for (let expr of e.bodyExprs) traverseAST(expr, callback);
      return;
    case ASTType.MATCH:
      for (let [predicate, result] of e.branches) {
        traverseAST(predicate, callback);
        traverseAST(result, callback);
      }
      if (e.fallback) traverseAST(e.fallback, callback);
      return;
  }
}

function unreachable(x: never): never {
  throw new Error("Unreachable code reached");
}

export enum MapASTOrder {
  PRE,
  POST,
}

function parseASTJSON<T>(expr: RawASTExpr<T>): ASTJSON<T> {
  if (expr.type == ASTType.JSON) return expr;
  throw {
    expr, reason: "Expected AST JSON."
  }
}

export function mapAST<T, U>(
  e: RawASTExpr<T>,
  callback: (expr: RawASTExpr<T>) => RawASTExpr<T>,
  order: MapASTOrder
): RawASTExpr<T> {
  function m(expr: RawASTExpr<T>) {
    return mapAST(expr, callback, order);
  }

  let e2 = { ...e };
  if (order == MapASTOrder.PRE) e2 = callback(e2);
  switch (e2.type) {
    case ASTType.BINOP:
      e2.left = m(e2.left);
      e2.right = m(e2.right);
      break;
    case ASTType.BLOCK:
      e2.bodyExprs = e2.bodyExprs.map((expr) => m(expr));
      break;
    case ASTType.DECORATOR:
      e2.json = m(e2.json);
      e2.expr = m(e2.expr);
      break;
    case ASTType.DERIVATIVE:
      e2.body = m(e2.body);
      break;
    case ASTType.FNCALL:
      e2.args = e2.args.map((arg) => m(arg));
      e2.name = m(e2.name);
      break;
    case ASTType.FNDEF:
      e2.bodyExprs = e2.bodyExprs.map((expr) => m(expr));
      e2.name = m(e2.name);
      break;
    case ASTType.IDENTIFIER:
      break;
    case ASTType.IMPORT:
      break;
    case ASTType.JSON:
      switch (e2.data.jsontype) {
        case JSONType.ARRAY:
          e2.data.data = e2.data.data.map(expr => parseASTJSON(m(expr)));
          break;
        case JSONType.BOOLEAN:
          break;
        case JSONType.DESMOSCRIPT:
          e2.data.data = m(e2.data.data);
          break;
        case JSONType.NULL:
          break;
        case JSONType.NUMBER:
          break;
        case JSONType.OBJECT:
          e2.data.data = Object.fromEntries(Object.entries(e2.data.data).map(([k, v]) => [k, parseASTJSON(m(v))]));
          break;
        case JSONType.STRING:
          break;
      }
      break;
    case ASTType.LIST:
      e2.elements = e2.elements.map(elem => m(elem));
      break;
    case ASTType.LISTCOMP:
      e2.variables = e2.variables.map(([vname, vdata]) => [vname, m(vdata)]);
      e2.body = m(e2.body);
      break;
    case ASTType.MACROCALL:
      e2.args = e2.args.map(arg => m(arg));
      e2.name = m(e2.name);
      e2.substitution = e2.substitution ? m(e2.substitution) : undefined;
      break;
    case ASTType.MACRODEF:
      e2.bodyExprs = e2.bodyExprs.map((expr) => m(expr));
      e2.name = m(e2.name);
      break;
    case ASTType.MATCH:
      e2.branches.map(([predicate, result]) => [m(predicate), m(result)]);
      e2.fallback = e2.fallback ? m(e2.fallback) : undefined;
      break;
    case ASTType.MEMBERACCESS:
      e2.left = m(e2.left);
      break;
    case ASTType.NAMED_JSON:
      e2.json = m(e2.json);
      break;
    case ASTType.NAMESPACE:
      e2.bodyExprs = e2.bodyExprs.map(expr => m(expr));
      break;
    case ASTType.NOTE:
      break;
    case ASTType.NUMBER:
      break;
    case ASTType.POINT:
      e2.x = m(e2.x);
      e2.y = m(e2.y);
      break;
    case ASTType.ROOT:
      e2.expressions = e2.expressions.map(expr => m(expr));
      break;
    case ASTType.STEP_RANGE:
      e2.left = m(e2.left);
      e2.step = m(e2.step);
      e2.right = m(e2.right);
      break;
    case ASTType.SUMPRODINT:
      e2.hi = m(e2.hi);
      e2.body = m(e2.body);
      e2.lo = m(e2.lo);
      break;
    case ASTType.ACTIONS:
      e2.actions = e2.actions.map(([l, r]) => [m(l), m(r)]);
  }
  return (order == MapASTOrder.POST) ? callback(e2) : e2;
}

// enum DataTypeType {
//     NONE, NUMBER, POINT, LIST, POLYGON, COLOR, BOOLEAN, UNION, ACTION
// }

// function dttToString(dtt: DataTypeType) {
//     const lut: { [key in DataTypeType]: string } = {
//         [DataTypeType.NONE]: "None",
//         [DataTypeType.NUMBER]: "Number",
//         [DataTypeType.POINT]: "Point",
//         [DataTypeType.LIST]: "List",
//         [DataTypeType.POLYGON]: "Polygon",
//         [DataTypeType.COLOR]: "Color",
//         [DataTypeType.BOOLEAN]: "Boolean",
//         [DataTypeType.UNION]: "Union",
//         [DataTypeType.ACTION]: "Action",
//     }
//     return lut[dtt];
// }

// function typeToString(type: DataType): string {
//     switch (type.type) {
//     case DataTypeType.NONE:
//     case DataTypeType.NUMBER:
//     case DataTypeType.POINT:
//     case DataTypeType.POLYGON:
//     case DataTypeType.COLOR:
//     case DataTypeType.BOOLEAN:
//     case DataTypeType.ACTION:
//         return dttToString(type.type);
//     case DataTypeType.LIST:
//         return `List of ${dttToString(type.elemType)}`;
//     case DataTypeType.UNION:
//         return type.variants.map(variant => typeToString(variant)).join(" or ");
//     }
// }

// type Primitive =
//     DataTypeType.NONE
//     | DataTypeType.NUMBER
//     | DataTypeType.POINT
//     | DataTypeType.POLYGON
//     | DataTypeType.COLOR
//     | DataTypeType.BOOLEAN;

// type DataTypePrimitive = {
//     type: Primitive | DataTypeType.ACTION
// };

// type DataTypeList = {
//     type: DataTypeType.LIST,
//     elemType: Primitive
// };

// type DataTypeUnion = {
//     type: DataTypeType.UNION,
//     variants: DataType[]
// };

// type DataType = DataTypePrimitive | DataTypeList | DataTypeUnion;

// export type TypedASTExpr = ASTExpr & {
//     dataType: DataType
// }

// export type TypeError = {
//     expression: ASTExpr,
//     reason: string
// };

// function isList(dt: TypedASTExpr): dt is (typeof dt) & { dataType: { type: DataTypeType.LIST } } {
//     return dt.dataType.type == DataTypeType.LIST;
// }

// function isNumberList(dt: TypedASTExpr & { dataType: { type: DataTypeType.LIST }}):
//     dt is (typeof dt) & { dataType: { elemType: DataTypeType.NUMBER }} {
//     return dt.dataType.elemType == DataTypeType.NUMBER;
// }
// function isPointList(dt: TypedASTExpr & { dataType: { type: DataTypeType.LIST }}):
//     dt is (typeof dt) & { dataType: { elemType: DataTypeType.POINT }} {
//     return dt.dataType.elemType == DataTypeType.POINT;
// }

// function isNumber(e: TypedASTExpr): e is (typeof e) & { dataType: { type: DataTypeType.NUMBER }} {
//     return e.dataType.type == DataTypeType.NUMBER;
// }

// function isPoint(e: TypedASTExpr): e is (typeof e) & { dataType: { type: DataTypeType.POINT }} {
//     return e.dataType.type == DataTypeType.POINT;
// }

// function canAddOrSubtract(expr1: TypedASTExpr, expr2: TypedASTExpr): boolean {

// }

// // function canAssign(lhs: DataType, rhs: DataType) {
// //     if (lhs.type)
// // }

// export function getASTTreeTyped(expression: ASTExpr): TypedASTExpr {
//     const t: (e: ASTExpr) => TypedASTExpr = e => {
//         switch (e.type) {
//         case ASTType.BINOP:
//             const tLeft = t(e.left);
//             const tRight = t(e.right);
//             const te = {
//                 ...e,
//                 left: tLeft,
//                 right: tRight,
//             }
//             switch (e.op) {
//             case "+":
//             case "-":
//             case "*":
//             case "/":
//             case "%":
//                 return {
//                     ...te,
//                     dataType: (
//                         isList(tLeft) || isList(tRight)
//                     ) ? {
//                         type: DataTypeType.LIST,
//                         elemType: isList(tLeft) ? tLeft.dataType.elemType : tLeft.dataType
//                     } : {
//                         type: tLeft.dataType
//                     }
//                 }
//             case ">":
//             case "<":
//             case ">=":
//             case "<=":
//             case "==":
//                 return {
//                     ...te,
//                     dataType: (
//                         isList(tLeft) || isList(tRight)
//                     ) ? {
//                         type: DataTypeType.LIST,
//                         elemType: DataTypeType.BOOLEAN
//                     } : {
//                         type: DataTypeType.BOOLEAN
//                     }
//                 }
//             case "->":
//                 return { ...te, dataType: { type: DataTypeType.ACTION }}
//             case "=":
//                 return { ...te, dataType: { type: DataTypeType.NONE} }
//             case "..":
//                 if (tLeft.dataType.type != DataTypeType.NUMBER || tRight.dataType.type != DataTypeType.NUMBER) {
//                     throw {
//                         expression: e,
//                         reason: `'..' ranges only accept numbers! Given types were '${typeToString(tLeft.dataType)}' and '${typeToString(tRight.dataType)}'`
//                     };
//                 }
//                 return { ...te, dataType: { type: DataTypeType.LIST, elemType: DataTypeType.NUMBER } }
//             }
//         case ASTType.NUMBER:
//         case ASTType.ROOT:
//         case ASTType.IDENTIFIER:
//         case ASTType.POINT:
//         case ASTType.FNCALL:
//         case ASTType.LIST:
//         case ASTType.STEP_RANGE:
//         case ASTType.FNDEF:
//         case ASTType.NAMESPACE:
//         case ASTType.BLOCK:
//         case ASTType.MATCH:
//         default:
//             return { type: DataTypeType.NONE };
//         }
//     }
// }
