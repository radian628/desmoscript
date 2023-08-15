import { formatAST, lex, parse } from "../desmoscript/dist";
import { expect, test, describe } from "@jest/globals";
import { FmtCtx, format } from "../desmoscript/dist/ast/fmt";

function lexAndParseStr(str: string) {
  const errs = [];
  const lexed = lex(str, "index.desmo", errs);
  const parsed = parse(lexed, "index.desmo", errs, undefined);

  test("parsing succeeded", () => {
    expect(errs).toEqual([]);
  });

  return parsed;
}

function testFormat(
  input: string,
  expected: string | undefined,
  formatSettings?: FmtCtx
) {
  describe(input, () => {
    const ast = lexAndParseStr(input);

    test("format", () => {
      expect(format(ast, formatSettings)).toEqual(expected);
    });
  });
}

testFormat("y=x", "y = x;\n");
testFormat("1+2+3", "1 + 2 + 3\n");
testFormat("(1*2)+3", "1 * 2 + 3\n");
testFormat(
  "1111111111+1111111111+1111111111+1111111111+1111111111+1111111111+1111111111+1111111111",
  `1111111111
  + 1111111111
  + 1111111111
  + 1111111111
  + 1111111111
  + 1111111111
  + 1111111111
  + 1111111111
`
);
testFormat("{x>0:4,5}", "{ x > 0: 4, 5 }\n");
testFormat(
  "{x>0:4,5}",
  `{
  x > 0: 4,
  5
}
`,
  { indent: 0, tabSize: 2, maxlen: 10, bindingPower: 0 }
);
testFormat("mod(3,6)", "mod(3, 6)\n");

// don't attempt to format sequences containing parser errors
testFormat("sin({D}", undefined);
