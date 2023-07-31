import {
  ASTNode,
  BlockNode,
  IdentifierNode,
  NamespaceNode,
  NoteNode,
  NumberNode,
  Scope,
  newid,
} from "../ast/ast.js";
import { mapASTChildren } from "../macro/macro-api.js";
import {
  ASTScopingContext,
  addToScope,
} from "../scope-tree/create-scope-tree.js";
import {
  DSPrimitiveType,
  DSType,
  typeAsStr,
} from "../scope-tree/typecheck/typecheck.js";

const desmosVariables = ["x", "y", "t", "index", "theta"];

export type BuiltinTypeSignatureElem =
  | {
      type: "regular";
      params: DSType[][];
      returns: DSType;
      requiredCount?: number; // defaults to all required
    }
  | {
      type: "variadic";
      validTypes: DSType[];
      returns: DSType;
      minArgs?: number; // default 0
    };

export type BuiltinTypeSignature = BuiltinTypeSignatureElem[];

function printOverload(ol: BuiltinTypeSignatureElem) {
  if (ol.type == "regular") {
    return `(${ol.params
      .map((param) => {
        return param
          .map((p, i) =>
            ol.requiredCount !== undefined && i >= ol.requiredCount
              ? `[${typeAsStr(p)}]`
              : typeAsStr(p)
          )
          .join(" | ");
      })
      .join(", ")}) -> ${typeAsStr(ol.returns)}`;
  } else {
    const param = ol.validTypes.map((vt) => typeAsStr(vt)).join(" | ");
    return `(${
      ol.minArgs ? `${new Array(ol.minArgs).fill(param).join(", ")}, ` : ""
    }...${ol.validTypes.length > 1 ? "(" : ""}${param}${
      ol.validTypes.length > 1 ? ")" : ""
    }[]) -> ${typeAsStr(ol.returns)}`;
  }
}

export function printTypeSig(sig: BuiltinTypeSignature) {
  return sig.map((o) => printOverload(o)).join("\n");
}

// represents a function that takes a variable number of numbers
// with the QoL feature of taking either lists or numbers
const variadicOf: (
  t: DSPrimitiveType,
  ret?: DSPrimitiveType
) => BuiltinTypeSignature = (t, ret) => [
  // number[] -> number
  {
    type: "regular",
    params: [[{ type: "list", element: t }]],
    returns: ret ?? t,
  },
  // ...number -> number
  {
    type: "variadic",
    validTypes: [t],
    returns: ret ?? t,
  },
  // ...(number | number[]) -> number[]
  {
    type: "variadic",
    validTypes: [t, { type: "list", element: t }],
    returns: { type: "list", element: ret ?? t },
  },
];

// function that takes a specific number of numbers
const nNumbers: (n: number) => BuiltinTypeSignature = (n: number) => [
  {
    type: "regular" as const,
    params: new Array(n).fill(0).map((e) => [{ type: "number" } as DSType]),
    returns: { type: "number" } as DSType,
  },
  {
    type: "regular" as const,
    params: new Array(n)
      .fill(0)
      .map((e) => [
        { type: "number" } as DSType,
        { type: "list", element: { type: "number" } } as DSType,
      ]),
    returns: listof({ type: "number" }),
  },
];

const listof = (t: DSPrimitiveType): DSType => {
  return { type: "list", element: t };
};
const statisticalFunctionWithDistribution: BuiltinTypeSignatureElem[] = [
  {
    type: "regular",
    params: [[{ type: "distribution" }]],
    returns: { type: "distribution" },
  },
  {
    type: "regular",
    params: [[listof({ type: "distribution" })]],
    returns: listof({ type: "distribution" }),
  },
];

const primitives: DSPrimitiveType[] = [
  { type: "number" },
  { type: "polygon" },
  { type: "color" },
  { type: "point" },
];

const numberOrNumberList: DSType[] = [
  { type: "number" },
  listof({ type: "number" }),
];

const desmosFunctions: [string, BuiltinTypeSignature][] = [
  ...["min", "max", "stdev", "mean", "median"].map(
    (e) =>
      [
        e,
        [
          ...variadicOf({ type: "number" }),
          ...statisticalFunctionWithDistribution,
        ],
      ] as [string, BuiltinTypeSignature]
  ),

  [
    "normaldist",
    [
      {
        type: "regular",
        params: [numberOrNumberList, numberOrNumberList],
        returns: { type: "distribution" },
        requiredCount: 0,
      },
    ],
  ],

  [
    "uniformdist",
    [
      {
        type: "regular",
        params: [numberOrNumberList, numberOrNumberList],
        returns: { type: "distribution" },
        requiredCount: 0,
      },
    ],
  ],

  [
    "binomialdist",
    [
      {
        type: "regular",
        params: [numberOrNumberList, numberOrNumberList],
        returns: { type: "distribution" },
        requiredCount: 1,
      },
    ],
  ],

  ...[
    "sin",
    "cos",
    "tan",
    "csc",
    "sec",
    "cot",
    "arcsin",
    "arccos",
    "arccsc",
    "arcsec",
    "arccot",
    "sinh",
    "cosh",
    "tanh",
    "csch",
    "sech",
    "coth",
    "floor",
    "ceil",
    "round",
  ].map((e) => [e, nNumbers(1)] as [string, BuiltinTypeSignature]),

  ["arctan", [...nNumbers(1), ...nNumbers(2)]],

  ["mod", nNumbers(2)],

  [
    "join",
    //...(T | T[]) -> T
    primitives.map((p) => {
      return {
        type: "variadic",
        minArgs: 2,
        validTypes: [p, listof(p)],
        returns: listof(p),
      };
    }),
  ],

  [
    "sort",
    primitives.map((p) => {
      return {
        type: "regular",
        params: [[listof(p)], [listof({ type: "number" })]],
        returns: listof(p),
        requiredCount: 1,
      };
    }),
  ],

  [
    "unique",
    primitives.map((p) => {
      return {
        type: "regular",
        params: [[listof(p)]],
        returns: listof(p),
      };
    }),
  ],

  [
    "polygon",
    [
      ...variadicOf({ type: "point" }, { type: "polygon" }),
      {
        type: "regular",
        params: [[listof({ type: "number" })], [listof({ type: "number" })]],
        returns: { type: "number" },
      },
    ],
  ],

  [
    "distance",
    [
      {
        type: "regular",
        params: [[{ type: "point" }], [{ type: "point" }]],
        returns: { type: "number" },
      },
      {
        type: "regular",
        params: [
          [{ type: "point" }, listof({ type: "point" })],
          [{ type: "point" }, listof({ type: "point" })],
        ],
        returns: listof({ type: "number" }),
      },
    ],
  ],

  ...["rgb", "hsv"].map(
    (f) =>
      [
        f,
        [
          {
            type: "regular",
            params: new Array(3)
              .fill(0)
              .map((e) => [{ type: "number" } as DSType]),
            returns: { type: "color" } as DSType,
          },
          {
            type: "regular",
            params: new Array(3)
              .fill(0)
              .map((e) => [
                { type: "number" } as DSType,
                listof({ type: "number" }),
              ]),
            returns: listof({ type: "color" }),
          },
        ],
      ] as [string, BuiltinTypeSignature]
  ),

  [
    "random",
    [
      // operands with input list
      ...primitives
        .map(
          (p) =>
            [
              {
                type: "regular",
                params: [[listof(p)]],
                returns: p,
              },
              {
                type: "regular",
                params: [
                  [listof(p)],
                  [{ type: "number" }],
                  [{ type: "number" }],
                ],
                returns: listof(p),
                requiredCount: 2,
              },
            ] as BuiltinTypeSignatureElem[]
        )
        .flat(1),

      // operands without input list
      {
        type: "regular",
        params: [],
        returns: { type: "number" },
      },
      {
        type: "regular",
        params: [[{ type: "number" }], [{ type: "number" }]],
        returns: listof({ type: "number" }),
      },
    ],
  ],

  [
    "shuffle",
    primitives
      .map(
        (p) =>
          [
            {
              type: "regular",
              params: [[listof(p)], [{ type: "number" }]],
              returns: listof(p),
              requiredCount: 1,
            },
          ] as BuiltinTypeSignatureElem[]
      )
      .flat(1),
  ],
];

export function addStdlibToScope(scope: Scope, ctx: ASTScopingContext) {
  for (const [fname, typesig] of desmosFunctions) {
    addToScope(
      scope,
      fname,
      {
        type: "builtin-function",
        typeSignature: typesig,
        id: newid(),
        definedByDesmos: true,
        unitName: "",
      },
      ctx.errors
    );
  }

  for (const vname of desmosVariables) {
    addToScope(
      scope,
      vname,
      {
        type: "builtin-variable",
        id: newid(),
        definedByDesmos: true,
        unitName: "",
        typeSignature: { type: "number" },
      },
      ctx.errors
    );
  }

  addToScope(
    scope,
    "five",
    {
      type: "macro",
      id: newid(),
      unitName: "",
      macroOperation: async (node, a) => {
        // return {
        //   type: "number",
        //   number: 5,
        //   start: node.start,
        //   end: node.end,
        //   id: newid(),
        // };

        return a.parseExpr("1 + 696969   42042042 + 1 + 1");
      },
    },
    ctx.errors
  );

  addToScope(
    scope,
    "loadcsv",
    {
      type: "macro",
      id: newid(),
      unitName: "",
      macroOperation: async (node, a) => {
        const param1 = node.params[0];
        if (node.params.length != 1)
          a.fatalError(
            "expected exactly 1 parameter representing the csv file name"
          );

        if (param1.type != "note") a.fatalError("expected a string");

        const contents = await a.readStringFile((param1 as NoteNode).content);

        return a.parseExpr(`[${contents}]`);
      },
    },
    ctx.errors
  );

  addToScope(
    scope,
    "loop",
    {
      type: "macro",
      id: newid(),
      unitName: "",
      macroOperation: async (node, a) => {
        if (node.params.length != 4)
          a.fatalError("Expected exactly 3 parameters.");

        const nsnameNode = node.params[0];
        const iterationsNode = node.params[1];

        if (nsnameNode.type != "identifier" || nsnameNode.segments.length != 1)
          a.fatalError(
            "Expected parameter 1 to be an identifier with 1 segment."
          );

        if (
          iterationsNode.type != "number" ||
          iterationsNode.number != Math.round(iterationsNode.number)
        )
          a.fatalError("Expected parameter 3 to be an integer.");

        const nsname = (nsnameNode as IdentifierNode).segments[0];
        const iterations = (iterationsNode as NumberNode).number;

        if (node.params[2].type != "block")
          a.fatalError("expected parameter 3 to be a block");

        if (node.params[3].type != "block")
          a.fatalError("expected parameter 4 to be a block");

        function processLoopBody(node: ASTNode, itername: string) {
          const cb = (n: ASTNode): ASTNode => processLoopBody(n, itername);
          if (node.type == "identifier") {
            return mapASTChildren(
              {
                ...node,
                segments: [
                  node.segments[0] == "prev" ? itername : node.segments[0],
                  ...node.segments.slice(1),
                ],
              },
              cb
            );
          }
          return mapASTChildren(node, cb);
        }

        function copyNode(node: ASTNode): ASTNode {
          return mapASTChildren(node, copyNode);
        }

        const getIterName = (i: number) => (i == -1 ? "init" : `iter${i}`);

        return a.node<NamespaceNode>({
          type: "namespace",
          name: nsname,
          body: a.node<BlockNode>({
            type: "block",
            body: [
              a.node<NamespaceNode>({
                type: "namespace",
                name: "init",
                body: copyNode(node.params[2]) as BlockNode,
              }),
              ...new Array(Math.max(iterations - 1, 0)).fill(0).map((e, i) => {
                return a.node<NamespaceNode>({
                  type: "namespace",
                  name: `iter${i}`,
                  body: processLoopBody(
                    node.params[3],
                    getIterName(i - 1)
                  ) as BlockNode,
                });
              }),
              ...(
                processLoopBody(
                  node.params[3],
                  getIterName(iterations - 2)
                ) as BlockNode
              ).body,
            ],
          }),
        });
      },
    },
    ctx.errors
  );

  //loop!(nsname, last, init, body)

  addToScope(
    scope,
    "subst",
    {
      type: "macro",
      id: newid(),
      unitName: "",
      macroOperation: async (node, a) => {
        const params = node.params;
        if (params.length < 2)
          a.fatalError(
            "Expected at least two arguments: a macro name, zero or more macro parameters, and a macro body expression"
          );
        const name = params[0];

        const argmap = new Map<string, number>();

        let i = 0;

        for (const param of params.slice(0, -1)) {
          if (param.type != "identifier" || param.segments.length != 1)
            a.fatalError(
              "Expected a variable name for every argument except the last."
            );

          if (i > 0)
            if (param.type == "identifier")
              argmap.set(param.segments[0], i - 1);
          i++;
        }

        addToScope(
          node.enclosingScope,
          (name as IdentifierNode).segments[0],
          {
            type: "macro",
            id: newid(),
            unitName: "",
            macroOperation: async (node, a) => {
              const args = node.params;

              function process(node: ASTNode): ASTNode {
                if (node.type == "identifier" && node.segments.length == 1) {
                  const argIndex = argmap.get(node.segments[0]);
                  if (argIndex !== undefined) {
                    return mapASTChildren(args[argIndex], process);
                  }
                }

                return mapASTChildren(node, process);
              }

              const out = process(params[params.length - 1]);

              return out;
            },
          },
          ctx.errors
        );

        return a.node<NumberNode>({ type: "number", number: 0 });
      },
    },
    ctx.errors
  );
}
