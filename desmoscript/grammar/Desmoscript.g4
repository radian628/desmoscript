grammar Desmoscript;
options {}


djson
    : data=NUMBER                    # NumberDJson
    | data=STRING                    # StringDJson
    | ('{' '}' | '{' keys+=IDENTIFIER_SEGMENT ':' values+=djson (',' keys+=IDENTIFIER_SEGMENT ':' values+=djson)* '}')  # ObjectDJson
    | ('[' ']' | '[' elements+=djson (',' elements+=djson)* ']')    # ArrayDJson
    | 'ds' '(' expr=expression ')'      # DesmoscriptDJson
    | data=('true' | 'false')                        # BooleanDJson
    | 'null'            # NullDJson
    ;


expression 
    : call=functionCall                                             # FunctionCallExpr
    | qualifier=IDENTIFIER_SEGMENT expr=expression 'with' jsonval=expression          # DecoratedExpr
    | str=STRING                        # StringExpr
    | '@' jsonval=djson               # JSONExpr
    | call=macroCall                                             # MacroCallExpr
    | 'import' filename=STRING ('as' alias=IDENTIFIER_SEGMENT)? ';'   # ImportExpr
    | namedjsontype='settings' jsonval=expression                         # NamedJsonExpr
    | ident=identifier                                               # IdentifierExpr
    | '[' body=expression 
        'for' (variables+=IDENTIFIER_SEGMENT '=' lists+=expression ';')* 
        (variables+=IDENTIFIER_SEGMENT '=' lists+=expression)
      ']'                                                           # ListCompExpr
    | '(' expr=expression ')'                                       # ParentheticalExpr
    | '(' x=expression ',' y=expression ')'                        # PointExpr
    | left=expression op='\\' right=IDENTIFIER_SEGMENT             # MemberAccessExpr
    | left=expression op='[' right=expression ']'                     # ListMemberAccessExpr
    | left=expression op='^' right=expression                  # MultOrDivExpr
    | left=expression op=('*' | '/' | '%') right=expression                  # MultOrDivExpr
    | left=expression op=('+' | '-') right=expression                        # AddOrSubExpr
    | left=expression op=('==' | '>' | '<' | '>=' | '<=') right=expression   # LogicalExpr
    | left=expression op='..' right=expression                               # RangeExpr
    | left=expression ',' step=expression op='..' right=expression           # StepRangeExpr
    | NUMBER                                                    # NumberExpr
    | l=list                                                     # ListExpr
    | op=('sum' | 'product' | 'integral') 
        '(' var=IDENTIFIER_SEGMENT '=' lo=expression 'to' hi=expression ')' body=expression # SumProdIntegralExpr
    | 'derivative' '(' var=IDENTIFIER_SEGMENT ')' body=expression                   # DerivativeExpr
    | 'macro' macroname=identifier '(' macroargs=functionDefArgList ')' '{' exprs+=expression+ '}' # MacroDefinitionExpr 
    | 'fn' fnname=identifier '(' fnargs=functionDefArgList ')' '{' exprs+=expression+ '}' # FunctionDefinitionExpr
    | 'ns' nsname=IDENTIFIER_SEGMENT '{' exprs+=expression+ '}' # NamespaceDefinitionExpr
    | '{' exprs+=expression+ '}' # BlockExpr
    | 'match' '{' (predicate+=expression '=>' result+=expression ';')* (fallback+=expression ';')? '}' # MatchExpr
    | left=expression op='->' right=expression                               # ActionExpr
    | left=expression op='=' right=expression         ';'                     # AssignmentExpr
    ;

expressionList : expression+ ;

functionDefArgList 
    : (args+=IDENTIFIER_SEGMENT ',')* args+=IDENTIFIER_SEGMENT ;

functionCallArgList 
    : (args+=expression ',')* args+=expression ;

list
    : '[' (elements+=expression ',')+ elements+=expression ']' | '[' ']'
    ;

functionCall 
    : fnname=identifier '()' 
    | fnname=identifier '(' fnargs=functionCallArgList? ')' ;

macroCall 
    : fnname=identifier '!()' 
    | fnname=identifier '!(' fnargs=functionCallArgList? ')' ;

identifier : (segments+=IDENTIFIER_SEGMENT '.')* segments+=IDENTIFIER_SEGMENT ;



STRING
   : '"' (ESC | SAFECODEPOINT)* '"'
   ;


fragment ESC
   : '\\' (["\\/bfnrt] | UNICODE)
   ;
fragment UNICODE
   : 'u' HEX HEX HEX HEX
   ;
fragment HEX
   : [0-9a-fA-F]
   ;
fragment SAFECODEPOINT
   : ~ ["\\\u0000-\u001F]
   ;


NUMBER
   : '-'? INT ('.' [0-9] +)? EXP?
   ;


fragment INT
   : '0' | [1-9] [0-9]*
   ;

// no leading zeros

fragment EXP
   : [Ee] [+\-]? INT
   ;

IDENTIFIER_SEGMENT : [a-zA-Z] ( [a-zA-Z] | [0-9] )* ;

WS : [ \n\r\t] + -> skip ;

COMMENT
    : ('//' .*? '\n'
    | '/*' .*? '*/') -> skip
    ;