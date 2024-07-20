%lex

%%
\s+                   / skip whitespace /
programa\b            return 'PROGRAMA';
areas\b               return 'AREAS';
robots\b              return 'ROBOTS';
variables\b           return 'VARIABLES';
comenzar\b            return 'COMENZAR';
fin\b                 return 'FIN';
AreaC\b               return 'AREAC';
AreaP\b               return 'AREAP';
AreaPC\b              return 'AREAPC';
[0-9]+                return 'NUMBER';
[a-zA-Z][a-zA-Z0-9]   return 'ID';
':='                  return 'ASSIGN';
[()]                  return yytext;
<<EOF>>               return 'EOF';
.                     return yytext;

/lex

%left 'AREAC' 'AREAP' 'AREAPC'

%start programa

%%

programa
    : 'PROGRAMA' ID secciones 'FIN'
    ;

secciones
    : seccion
    | secciones seccion
    ;

seccion
    : 'AREAS' area_defs
    | 'ROBOTS' robot_defs
    | 'VARIABLES' var_defs
    | 'COMENZAR' acciones 'FIN'
    ;

area_defs
    : area_def
    | area_defs area_def
    ;

area_def
    : ID ':' ('AREAC' | 'AREAP' | 'AREAPC') '(' 'NUMBER' ',' 'NUMBER' ',' 'NUMBER' ',' 'NUMBER' ')'
    ;

robot_defs
    : robot_def
    | robot_defs robot_def
    ;

robot_def
    : 'ROBOT' ID 'COMENZAR' acciones 'FIN'
    ;

var_defs
    : var_def
    | var_defs var_def
    ;

var_def
    : ID ':' ('numero' | 'boolean')
    ;

acciones
    : accion
    | acciones accion
    ;

accion
    : 'repetir' 'NUMBER' 'veces' acciones 'finrepetir'
    | 'mover'
    | 'derecha'
    | 'si' '(' condicion ')' acciones 'finsi'
    | 'AsignarArea' '(' ID ',' ID ')'
    | 'Iniciar' '(' ID ',' 'NUMBER' ',' 'NUMBER' ')'
    ;

condicion
    : ID '==' 'NUMBER'
    | ID '!=' 'NUMBER'
    | ID '<' 'NUMBER'
    | ID '>' 'NUMBER'
    ;

%%