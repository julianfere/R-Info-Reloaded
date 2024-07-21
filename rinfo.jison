%lex

%%
\s+                   /* skip whitespace */
programa\b            return 'PROGRAMA';
areas\b               return 'AREAS';
procesos\b               return 'PROCESOS';
robots\b              return 'ROBOTS';
robot\b               return 'ROBOT';
variables\b           return 'VARIABLES';
comenzar\b            return 'COMENZAR';
fin                   return 'FIN';
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
proceso\b             return 'PROCESO';
E\b                   return 'PARAMETRO_ENTRADA';
ES\b                  return 'PARAMETRO_ENTRADA_SALIDA';
[0-9]+                return 'NUMBER';
"V"                   return 'V';
"F"                   return 'F';
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
    : 'PROGRAMA' ID secciones  { return { type: 'Programa', name: $2, sections: $3 }; }
    ;

secciones
    : seccion { $$ = [$1]; }
    | secciones seccion { $1.push($2); $$ = $1; }
    ;

seccion
    : 'AREAS' area_defs { $$ = { type: 'Areas', areas: $2 }; }
    | 'PROCESOS' proceso_defs { $$ = {type: 'Procesos', procesos: $2}}
    | 'ROBOTS' robot_defs { $$ = { type: 'Robots', robots: $2 }; }
    | 'VARIABLES' var_defs { $$ = { type: 'Variables', variables: $2 }; }
    | 'COMENZAR' acciones 'FINPROGRAMA' EOF { $$ = { type: 'Comenzar', actions: $2 }; }
    ;

area_defs
    : area_def { $$ = [$1]; }
    | area_defs area_def { $1.push($2); $$ = $1; }
    ;

area_def
    : ID 'COLON' area_tipo 'LPAREN' 'NUMBER' 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'RPAREN'
      { $$ = { type: 'Area', name: $1, areaType: $3, x1: $5, y1: $7, x2: $9, y2: $11 }; }
    ;

area_tipo
    : 'AREAC' { $$ = 'AREAC'; }
    | 'AREAP' { $$ = 'AREAP'; }
    | 'AREAPC' { $$ = 'AREAPC'; }
    ;

robot_defs
    : robot_def { $$ = [$1]; }
    | robot_defs robot_def { $1.push($2); $$ = $1; }
    ;

robot_def
    : 'ROBOT' ID var_section 'COMENZAR' acciones 'FIN'
      { $$ = { type: 'Robot', name: $2, variables: $3, actions: $5 }; }
    ;

var_section
    : 'VARIABLES' var_defs { $$ = $2; }
    | { $$ = []; }
    ;

var_defs
    : var_def { $$ = [$1]; }
    | var_defs var_def { $1.push($2); $$ = $1; }
    ;

var_def
    : ID 'COLON' tipo_var { $$ = { type: 'Variable', name: $1, varType: $3 }; }
    ;

tipo_var
    : 'TIPO_VAR_NUMERO' { $$ = 'numero'; }
    | 'BOOLEAN' { $$ = 'boolean'; }
    | 'ID' { $$ = 'id'; }
    ;

acciones
    : accion { $$ = [$1]; }
    | acciones accion { $1.push($2); $$ = $1; }
    ;

accion
    : 'REPETIR' 'NUMBER' acciones 'FINREPETIR' { $$ = { type: 'Repetir', times: $2, actions: $3 }; }
    | 'si' 'LPAREN' condicion 'RPAREN' acciones 'finsi' { $$ = { type: 'Si', condition: $3, actions: $5 }; }
    | 'Iniciar' 'LPAREN' ID 'COMMA' 'NUMBER' 'COMMA' 'NUMBER' 'RPAREN'
      { $$ = { type: 'Iniciar', robot: $3, x: $5, y: $7 }; }
    | ID 'ASSIGN' matematica { $$ = { type: 'Asignar', variable: $1, value: $3 }; }
    | ID 'ASSIGN' algebra_booleana { $$ = { type: 'Asignar', variable: $1, value: $3 }; }
    | llamado_funcion { $$ = $1; }
    ;

condicion
    : condicion '==' condicion { $$ = { type: 'Comparacion', left: $1, operator: '==', right: $3 }; }
    | condicion '!=' condicion { $$ = { type: 'Comparacion', left: $1, operator: '!=', right: $3 }; }
    | condicion '<' condicion { $$ = { type: 'Comparacion', left: $1, operator: '<', right: $3 }; }
    | condicion '>' condicion { $$ = { type: 'Comparacion', left: $1, operator: '>', right: $3 }; }
    | llamado_funcion { $$ = $1; }
    | ID { $$ = { type: 'Variable', name: $1 }; }
    | 'NUMBER' { $$ = { type: 'Numero', value: $1 }; }
    ;

matematica
    : matematica '+' matematica { $$ = { type: 'OpMatematica', left: $1, operator: '+', right: $3 }; }
    | matematica '-' matematica { $$ = { type: 'OpMatematica', left: $1, operator: '-', right: $3 }; }
    | matematica '*' matematica { $$ = { type: 'OpMatematica', left: $1, operator: '*', right: $3 }; }
    | matematica '/' matematica { $$ = { type: 'OpMatematica', left: $1, operator: '/', right: $3 }; }
    | ID { $$ = { type: 'Variable', name: $1 }; }
    | 'NUMBER' { $$ = { type: 'Numero', value: $1 }; }
    ;

algebra_booleana
    : algebra_booleana '&' algebra_booleana { $$ = { type: 'OpBooleana', left: $1, operator: '&', right: $3 }; }
    | algebra_booleana '|' algebra_booleana { $$ = { type: 'OpBooleana', left: $1, operator: '|', right: $3 }; }
    | '~' algebra_booleana { $$ = { type: 'OpBooleana', operator: '~', right: $2 }; }
    | llamado_funcion { $$ = $1; }
    | V { $$ = { type: 'Booleano', value: true }; }
    | F { $$ = { type: 'Booleano', value: false }; }
    ;

llamado_funcion
    : ID 'LPAREN' 'RPAREN' { $$ = { type: 'LlamadoFuncion', name: $1, args: [] }; }
    | ID 'LPAREN' argumentos 'RPAREN' { $$ = { type: 'LlamadoFuncion', name: $1, args: $3 }; }
    ;

argumentos
    : argumento { $$ = [$1]; }
    | argumentos 'COMMA' argumento { $1.push($3); $$ = $1; }
    ;

argumento
    : NUMBER { $$ = { type: 'Numero', value: $1 }; }
    | V { $$ = { type: 'Booleano', value: true }; }
    | F { $$ = { type: 'Booleano', value: false }; }
    | ID { $$ = { type: 'Variable', name: $1 }; }
    ;

tipo_parametro
    : PARAMETRO_ENTRADA { $$ = "E" }
    | PARAMETRO_ENTRADA_SALIDA { $$ = "ES" }
    ;

parametro
    : tipo_parametro var_def { $$ = { type: 'Parametro', parType: $1, varDef: $2 } }
    ;

parametros
    : parametro { $$ = [$1]; }
    | parametros 'COMMA' parametro { $1.push($3); $$ = $1; }
    ;

proceso_def
    : PROCESO ID 'LPAREN' 'RPAREN' 'COMENZAR' acciones 'FIN' { $$ = { type: 'Proceso', name: $2, args: [], actions: $6 } }
    | PROCESO ID 'LPAREN' parametros 'RPAREN' 'COMENZAR' acciones 'FIN' { $$ = { type: 'Proceso', name: $2, args: $4, actions: $7 } }
    ;

proceso_defs
    : proceso_def { $$ = [$1]; }
    | proceso_defs proceso_def { $1.push($2); $$ = $1; }
    ;
%%

/* Optional JavaScript section to include parser actions, etc. */
