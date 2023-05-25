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

djsonExpression : '@' jsonval=djson ;

expression 
    : call=functionCall                                          # FunctionCallExpr
    | call=macroCall                                             # MacroCallExpr
    | '-' expr=expression                                                    # UnaryMinusExpr
    | '!' expr=expression                                                    # LogicalNotExpr
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
    | left=expression op=('==' | '>' | '<' | '>=' | '<=') right=expression   # ComparisonExpr
    | left=expression op=('&&' | '||') right=expression   # LogicalExpr
    | left=expression op='..' right=expression                               # RangeExpr
    | left=expression ',' step=expression op='..' right=expression           # StepRangeExpr
    | NUMBER                                                    # NumberExpr
    | l=list                                                     # ListExpr
    | op=('sum' | 'product' | 'integral') 
        '(' var=IDENTIFIER_SEGMENT '=' lo=expression 'to' hi=expression ')' body=expression # SumProdIntegralExpr
    | 'derivative' '(' var=IDENTIFIER_SEGMENT ')' body=expression                   # DerivativeExpr
    | '{' statements+=statement+ expr=expression '}' # BlockExpr
    | 'case' '{' 
        (predicate+=expression ':' result+=expression ',')* 
        (fallback=expression)? 
    '}' # MatchExpr
    // make actions less dumb
    | '&' (((lefts+=expression op='->' rights+=expression) | singles+=expression) ',')* ((lefts+=expression op='->' rights+=expression) | singles+=expression)           # ActionExpr
    ;

statement 
    : 'fn' fnname=IDENTIFIER_SEGMENT '(' fnargs=functionDefArgList ')' expr=expression  # FunctionDefinitionStatement
    | left=expression op='=' right=expression ('@' annotation=djsonExpression)? ';' # AssignmentStatement
    | 'ns' nsname=IDENTIFIER_SEGMENT '{' statements+=statement+ '}'                # NamespaceDefinitionStatement
    | 'import' filename=STRING 'as' alias=IDENTIFIER_SEGMENT                       # ImportStatement
    | str=STRING                                                                   # StringStatement
    | namedjsontype=IDENTIFIER_SEGMENT jsonval=djsonExpression                     # NamedJsonStatement
    ;

statementList : statement+ EOF ;

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

fragment EXP
   : [Ee] [+\-]? INT
   ;

IDENTIFIER_SEGMENT : [a-zA-Z] ( [a-zA-Z] | [0-9] )* ;

WS : [ \n\r\t] + -> skip ;

COMMENT
    : ('//' .*? '\n'
    | '/*' .*? '*/') -> skip
    ;