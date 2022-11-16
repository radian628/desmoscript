@preprocessor typescript




statement_list ->
    statement:+





expression ->
    number
  | binop
  | "(" expression ")"
  | fncall
  | action_list

statement ->
    assignment
  | namespace
  | fndef








# Statement parsing

assignment ->
    ident "=" expression ";"

namespace ->
    "ns" "{" statement:* "}"

fndef ->
    "fn" "(" ident ("," ident):* ")" expression





# Expression parsing

action -> ident_chain "->" expression

action_list -> action ("," action):*

ident_chain -> ident ("." ident):*

fncall -> 
    ident_chain "(" 
        (null | expression ("," expression):*)
    ")"

block -> "{"
    statement:*
    expression
    "}"

listcomp -> "["
    expression
    "for"
    assignment:+
"]"






# Math parsing


math_binop -> sum
sum -> sum ("+" | "-") product | product
product -> product ("*" | "/" | "%") exp | exp
exp -> expression "^" exp | expression

logic_binop ->
    expression ("==" | "!=" | ">" | "<" | ">=" | "<=" ) expression

binop -> math_binop | logic_binop





# Token-level stuff

number -> 
    [0-9]:+
  | [0-9]:* "." [0-9]:+
  | [0-9]:+ "." [0-9]:*

ident ->
    [a-zA-Z]:+

whitespace -> [\r\n\t ]:+ {%
(d, l, reject) => null
%}