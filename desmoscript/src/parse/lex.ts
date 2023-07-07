import {
  CompilerError,
  Result,
  compilerError,
  err,
  ok,
} from "../compiler-errors.js";

export type Token = {
  start: number;
  end: number;
  str: string;
  type?: "op" | "ident" | "number" | "note" | "whitespace";
};

export function token(
  start: number,
  end: number,
  str: string,
  type?: Token["type"]
) {
  return { start, end, str, type };
}

export interface StringStream {
  match: (
    pattern: string | RegExp | ((input: string) => number) | string[],
    noConsume?: boolean
  ) => string | undefined;
  done: () => boolean;
  pos: () => number;
  rest: () => string;
  next: (amount: number) => string;
}

export function streamify(str: string): StringStream {
  let pos = 0;
  return {
    done: () => pos >= str.length,
    pos: () => pos,
    match: (pattern, noConsume) => {
      if (Array.isArray(pattern)) {
        for (const p of pattern) {
          if (str.slice(pos).startsWith(p)) {
            if (!noConsume) pos += p.length;
            return p;
          }
        }
      } else if (pattern instanceof RegExp) {
        const match = str.slice(pos).match(pattern)?.[0];
        if (match) {
          if (!noConsume) pos += match.length;
          return match;
        }
      } else if (pattern instanceof Function) {
        const count = pattern(str.slice(pos));
        const match = str.slice(pos, pos + count);
        if (!noConsume) pos += count;
        return match;
      } else {
        if (str.slice(pos).startsWith(pattern)) {
          if (!noConsume) pos += pattern.length;
          return pattern;
        }
      }
    },
    next: (x) => {
      pos += x;
      return str.slice(pos - x, pos);
    },
    rest: () => str.slice(pos),
  };
}

export function lex(
  input: string,
  filename: string,
  errors: CompilerError[]
): Token[] {
  const stream = streamify(input);

  const syntaxErrors: CompilerError[] = [];

  const tokens: Token[] = [];

  const appendMatch = (match: string, type?: Token["type"]) =>
    tokens.push(token(stream.pos() - match.length, stream.pos(), match, type));

  while (!stream.done()) {
    // match two consecutive line breaks
    // included for formatting purposes
    const linebreaks = stream.match(/^\s*\n\s*\n\s*/);
    if (linebreaks) {
      appendMatch(linebreaks, "whitespace");
      continue;
    }

    // match whitespace
    const ws = stream.match(/^\s+/);
    if (ws) {
      //appendMatch(ws, "whitespace");
      continue;
    }

    // match strings/notes
    const note = stream.match(/^"[^"]*"/);
    if (note) {
      appendMatch(note, "note");
      continue;
    }

    // match misc symbols
    const symbol = stream.match([";", ":", ",", "..", "@"]);
    if (symbol) {
      appendMatch(symbol);
      continue;
    }

    // match brackets
    const bracket = stream.match(["(", ")", "[", "]", "{", "}"]);
    if (bracket) {
      appendMatch(bracket);
      continue;
    }

    // match numbers
    let num = stream.match(/^[0-9]*\.[0-9]+/);
    // match integers
    // but don't match the period if there's two of them afterwards
    // because that represents a range
    if (!num) num = stream.match(/^[0-9]+(\.(?!\.))?/);
    if (num) {
      appendMatch(num, "number");
      continue;
    }

    // match operators
    const op = stream.match([
      "->",
      "+",
      "-",
      "*",
      "/",
      ">=",
      "<=",
      ">",
      "<",
      "==",
      "!",
      "^",
      ".x",
      ".y",
      ".",
      "=",
    ]);
    if (op) {
      appendMatch(op, "op");
      continue;
    }

    // match identifiers
    const ident = stream.match(/^\w+/);
    if (ident) {
      appendMatch(ident, "ident");
      continue;
    }

    // unrecognized input; syntax error
    const offendingText = stream.next(1);
    errors.push(
      compilerError(
        `did not expect '${offendingText}'`,
        stream.pos() - 1,
        stream.pos(),
        filename
      )
    );
  }

  return tokens;
}
