%lex

%%
\s+                   /* skip whitespace */
programa\b            return 'PROGRAMA';
areas\b               return 'AREAS';
robots\b              return 'ROBOTS';
robot\b               return 'ROBOT';
variables\b           return 'VARIABLES';
comenzar\b            return 'COMENZAR';
fin                 return 'FIN';
finprograma\b         return 'FINPROGRAMA';
si\b                  return 'si';
finsi\b               return 'finsi';
AreaC\b               return 'AREAC';
AreaP\b               return 'AREAP';
AreaPC\b              return 'AREAPC';
numero\b              return 'TIPO_VAR_NUMERO';
boolean\b             return 'BOOLEAN';
repetir\b             return 'REPETIR';
finrepetir\b          return 'FINREPETIR';
proceso\b return 'PROCESO';
E\b                   return 'PARAMETRO_ENTRADA';
ES\b                  return 'PARAMETRO_ENTRADA_SALIDA';
[0-9]+                return 'NUMBER';
[a-zA-Z_][a-zA-Z0-9_]* return 'ID';
":="                  return 'ASSIGN';
":"                   return 'COLON';
"("                   return 'LPAREN';
")"                   return 'RPAREN';
","                   return 'COMMA';
"+"                   return '+';
"-"                   return '-';

<<EOF>>               return 'EOF';
.                     return 'INVALID';

/lex

%start programa

%%

programa
    : 'PROGRAMA' ID secciones
    ;

secciones
    : seccion
    | secciones seccion
    ;

seccion
    : 'AREAS' area_defs
    | 'ROBOTS' robot_defs
    | 'VARIABLES' var_defs
    | 'COMENZAR' acciones 'FINPROGRAMA' EOF
    ;

area_defs
    : area_def
    | area_defs area_def
    ;

area_def
    : ID 'COLON' area_tipo 'LPAREN' 'NUMBER' 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'RPAREN'
    ;

area_tipo
    : 'AREAC'
    | 'AREAP'
    | 'AREAPC'
    ;

robot_defs
    : robot_def
    | robot_defs robot_def
    ;

robot_def
    : 'ROBOT' ID var_section 'COMENZAR' acciones 'FIN'
    ;

var_section
    : 'VARIABLES' var_defs
    | /* empty */
    ;

var_defs
    : var_def
    | var_defs var_def
    ;

var_def
    : ID 'COLON' tipo_var
    ;

tipo_var
    : 'TIPO_VAR_NUMERO'
    | 'BOOLEAN'
    | 'ID'
    ;

acciones
    : accion
    | acciones accion
    ;

tipo_parametro
    : PARAMETRO_ENTRADA
    | PARAMETRO_ENTRADA_SALIDA
    ;

parametro
    : tipo_parametro ID 'COLON' tipo_var
    ;

parametros
    : parametro
    | parametros 'COMMA' parametro
    ;

argumento
    : NUMBER
    | BOOLEAN
    | ID
    ;

argumentos
    : argumento
    | argumentos 'COMMA' argumentos
    ;

proceso
    : PROCESO 'LPAREN' 'RPAREN' 'COMENZAR' acciones 'FIN'
    | PROCESO 'LPAREN' parametros 'RPAREN' 'COMENZAR' acciones 'FIN'
    ;

firma
    : ID 'LPAREN' 'RPAREN'
    | ID 'LPAREN' argumentos 'RPAREN'
    ;

accion
    : 'REPETIR' 'NUMBER' acciones 'FINREPETIR'
    | 'si' 'LPAREN' condicion 'RPAREN' acciones 'finsi'
    | 'Iniciar' 'LPAREN' ID 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'RPAREN'
    | ID 'ASSIGN' matematica
    | ID 'ASSIGN' algebra_booleana
    | firma
    ;

condicion
    : ID '==' 'NUMBER'
    | ID '!=' 'NUMBER'
    | ID '<' 'NUMBER'
    | ID '>' 'NUMBER'
    | firma
    ;

matematica
    : matematica '+' matematica
    | matematica '-' matematica
    | matematica '*' matematica
    | matematica '/' matematica
    | ID
    | 'NUMBER'
    ;

algebra_booleana
    : algebra_booleana 'AND' algebra_booleana
    | algebra_booleana 'OR' algebra_booleana
    | 'NOT' algebra_booleana
    | V
    | F
    ;

%%

/* Optional JavaScript section to include parser actions, etc. */
