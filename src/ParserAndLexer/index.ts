import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType } from '@ts-jison/parser';
/**
 * parser generated by  @ts-jison/parser-generator 0.4.1-alpha.2
 * @returns Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */


export class RinfoParser extends JisonParser implements JisonParserApi {
    $?: any;
    symbols_: SymbolsType = {"error":2,"programa":3,"PROGRAMA":4,"ID":5,"secciones":6,"seccion":7,"AREAS":8,"area_defs":9,"PROCESOS":10,"proceso_defs":11,"ROBOTS":12,"robot_defs":13,"VARIABLES":14,"var_defs":15,"COMENZAR":16,"acciones":17,"FINPROGRAMA":18,"EOF":19,"area_def":20,"COLON":21,"area_tipo":22,"LPAREN":23,"NUMBER":24,"COMMA":25,"RPAREN":26,"AREAC":27,"robot_def":28,"ROBOT":29,"var_section":30,"FIN":31,"var_def":32,"tipo_var":33,"TIPO_VAR_NUMERO":34,"BOOLEAN":35,"accion":36,"REPETIR":37,"FINREPETIR":38,"estructura_si":39,"MIENTRAS":40,"condicion":41,"FINMIENTRAS":42,"Iniciar":43,"ASSIGN":44,"matematica":45,"algebra_booleana":46,"llamado_funcion":47,"si":48,"finsi":49,"sino":50,"=":51,"<>":52,"<":53,"<=":54,">":55,">=":56,"+":57,"-":58,"*":59,"/":60,"&":61,"|":62,"~":63,"V":64,"F":65,"argumentos":66,"argumento":67,"tipo_parametro":68,"PARAMETRO_ENTRADA":69,"PARAMETRO_ENTRADA_SALIDA":70,"parametro":71,"parametros":72,"proceso_def":73,"PROCESO":74,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",4:"PROGRAMA",5:"ID",8:"AREAS",10:"PROCESOS",12:"ROBOTS",14:"VARIABLES",16:"COMENZAR",18:"FINPROGRAMA",19:"EOF",21:"COLON",23:"LPAREN",24:"NUMBER",25:"COMMA",26:"RPAREN",27:"AREAC",29:"ROBOT",31:"FIN",34:"TIPO_VAR_NUMERO",35:"BOOLEAN",37:"REPETIR",38:"FINREPETIR",40:"MIENTRAS",42:"FINMIENTRAS",43:"Iniciar",44:"ASSIGN",48:"si",49:"finsi",50:"sino",51:"=",52:"<>",53:"<",54:"<=",55:">",56:">=",57:"+",58:"-",59:"*",60:"/",61:"&",62:"|",63:"~",64:"V",65:"F",69:"PARAMETRO_ENTRADA",70:"PARAMETRO_ENTRADA_SALIDA",74:"PROCESO"};
    productions_: ProductionsType = [0,[3,3],[6,1],[6,2],[7,2],[7,2],[7,2],[7,2],[7,4],[9,1],[9,2],[20,12],[22,1],[13,1],[13,2],[28,6],[30,2],[30,0],[15,1],[15,2],[32,3],[33,1],[33,1],[33,1],[17,1],[17,2],[36,4],[36,1],[36,6],[36,8],[36,3],[36,3],[36,1],[39,6],[39,8],[41,3],[41,3],[41,3],[41,3],[41,3],[41,3],[41,1],[41,1],[41,1],[45,3],[45,3],[45,3],[45,3],[45,1],[45,1],[46,3],[46,3],[46,2],[46,1],[46,1],[46,1],[47,3],[47,4],[66,1],[66,3],[67,1],[67,1],[67,1],[67,1],[68,1],[68,1],[71,2],[72,1],[72,3],[73,7],[73,8],[11,1],[11,2]];
    table: Array<StateType>;
    defaultActions: {[key:number]: any} = {50:[2,12],86:[2,64],87:[2,65]};

    constructor (yy = {}, lexer = new RinfoLexer(yy)) {
      super(yy, lexer);

      // shorten static method to just `o` for terse STATE_TABLE
      const $V0=[1,6],$V1=[1,7],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,8,10,12,14,16],$V6=[1,14],$V7=[1,17],$V8=[1,20],$V9=[1,23],$Va=[1,30],$Vb=[1,26],$Vc=[1,28],$Vd=[1,29],$Ve=[1,32],$Vf=[1,5,8,10,12,14,16],$Vg=[1,8,10,12,14,16,74],$Vh=[1,8,10,12,14,16,29],$Vi=[5,18,31,37,38,40,42,43,48,49,50],$Vj=[1,47],$Vk=[1,61],$Vl=[1,62],$Vm=[1,68],$Vn=[1,69],$Vo=[1,71],$Vp=[1,72],$Vq=[1,79],$Vr=[1,76],$Vs=[1,77],$Vt=[1,78],$Vu=[1,86],$Vv=[1,87],$Vw=[1,5,8,10,12,14,16,25,26],$Vx=[1,92],$Vy=[1,93],$Vz=[1,94],$VA=[1,95],$VB=[1,96],$VC=[1,97],$VD=[26,51,52,53,54,55,56],$VE=[1,99],$VF=[1,100],$VG=[1,101],$VH=[1,102],$VI=[1,103],$VJ=[1,104],$VK=[5,18,31,37,38,40,42,43,48,49,50,57,58,59,60],$VL=[2,48],$VM=[1,106],$VN=[5,18,31,37,38,40,42,43,48,49,50,61,62],$VO=[5,18,26,31,37,38,40,42,43,48,49,50,51,52,53,54,55,56,61,62],$VP=[25,26],$VQ=[1,125];
      const o = JisonParser.expandParseTable;
      this.table = [{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:4,7:5,8:$V0,10:$V1,12:$V2,14:$V3,16:$V4},{1:[2,1],7:11,8:$V0,10:$V1,12:$V2,14:$V3,16:$V4},o($V5,[2,2]),{5:$V6,9:12,20:13},{11:15,73:16,74:$V7},{13:18,28:19,29:$V8},{5:$V9,15:21,32:22},{5:$Va,17:24,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},o($V5,[2,3]),o($V5,[2,4],{20:33,5:$V6}),o($Vf,[2,9]),{21:[1,34]},o($V5,[2,5],{73:35,74:$V7}),o($Vg,[2,71]),{5:[1,36]},o($V5,[2,6],{28:37,29:$V8}),o($Vh,[2,13]),{5:[1,38]},o($V5,[2,7],{32:39,5:$V9}),o($Vf,[2,18]),{21:[1,40]},{5:$Va,18:[1,41],36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},o($Vi,[2,24]),{24:[1,43]},o($Vi,[2,27]),{23:[1,44]},{23:[1,45]},{23:$Vj,44:[1,46]},o($Vi,[2,32]),{23:[1,48]},o($Vf,[2,10]),{22:49,27:[1,50]},o($Vg,[2,72]),{23:[1,51]},o($Vh,[2,14]),{14:[1,53],16:[2,17],30:52},o($Vf,[2,19]),{5:[1,57],33:54,34:[1,55],35:[1,56]},{19:[1,58]},o($Vi,[2,25]),{5:$Va,17:59,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{5:$Vk,24:$Vl,41:60,47:63},{5:[1,64]},{5:[1,67],24:$Vm,45:65,46:66,47:70,63:$Vn,64:$Vo,65:$Vp},{5:$Vq,24:$Vr,26:[1,73],64:$Vs,65:$Vt,66:74,67:75},{5:$Vk,24:$Vl,41:80,47:63},{23:[1,81]},{23:[2,12]},{26:[1,82],68:85,69:$Vu,70:$Vv,71:84,72:83},{16:[1,88]},{5:$V9,15:89,32:22},o($Vw,[2,20]),o($Vw,[2,21]),o($Vw,[2,22]),o($Vw,[2,23]),o($V5,[2,8]),{5:$Va,36:42,37:$Vb,38:[1,90],39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{26:[1,91],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},o($VD,[2,41],{23:$Vj}),o($VD,[2,42]),o($VD,[2,43]),{25:[1,98]},o($Vi,[2,30],{57:$VE,58:$VF,59:$VG,60:$VH}),o($Vi,[2,31],{61:$VI,62:$VJ}),o($VK,$VL,{23:$Vj}),o($VK,[2,49]),{5:$VM,46:105,47:70,63:$Vn,64:$Vo,65:$Vp},o($VN,[2,53]),o($VN,[2,54]),o($VN,[2,55]),o($VO,[2,56]),{25:[1,108],26:[1,107]},o($VP,[2,58]),o($VP,[2,60]),o($VP,[2,61]),o($VP,[2,62]),o($VP,[2,63]),{26:[1,109],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{24:[1,110]},{16:[1,111]},{25:[1,113],26:[1,112]},o($VP,[2,67]),{5:$V9,32:114},{5:[2,64]},{5:[2,65]},{5:$Va,17:115,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{5:$V9,16:[2,16],32:39},o($Vi,[2,26]),{5:$Va,17:116,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{5:$Vk,24:$Vl,41:117,47:63},{5:$Vk,24:$Vl,41:118,47:63},{5:$Vk,24:$Vl,41:119,47:63},{5:$Vk,24:$Vl,41:120,47:63},{5:$Vk,24:$Vl,41:121,47:63},{5:$Vk,24:$Vl,41:122,47:63},{24:[1,123]},{5:$VQ,24:$Vm,45:124},{5:$VQ,24:$Vm,45:126},{5:$VQ,24:$Vm,45:127},{5:$VQ,24:$Vm,45:128},{5:$VM,46:129,47:70,63:$Vn,64:$Vo,65:$Vp},{5:$VM,46:130,47:70,63:$Vn,64:$Vo,65:$Vp},o($Vi,[2,52],{61:$VI,62:$VJ}),{23:$Vj},o($VO,[2,57]),{5:$Vq,24:$Vr,64:$Vs,65:$Vt,67:131},{5:$Va,17:132,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{25:[1,133]},{5:$Va,17:134,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{16:[1,135]},{68:85,69:$Vu,70:$Vv,71:136},o($VP,[2,66]),{5:$Va,31:[1,137],36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{5:$Va,36:42,37:$Vb,39:27,40:$Vc,42:[1,138],43:$Vd,47:31,48:$Ve},{26:[2,35],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{26:[2,36],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{26:[2,37],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{26:[2,38],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{26:[2,39],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{26:[2,40],51:$Vx,52:$Vy,53:$Vz,54:$VA,55:$VB,56:$VC},{25:[1,139]},o($Vi,[2,44],{57:$VE,58:$VF,59:$VG,60:$VH}),o($VK,$VL),o($Vi,[2,45],{57:$VE,58:$VF,59:$VG,60:$VH}),o($Vi,[2,46],{57:$VE,58:$VF,59:$VG,60:$VH}),o($Vi,[2,47],{57:$VE,58:$VF,59:$VG,60:$VH}),o($Vi,[2,50],{61:$VI,62:$VJ}),o($Vi,[2,51],{61:$VI,62:$VJ}),o($VP,[2,59]),{5:$Va,36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve,49:[1,140],50:[1,141]},{24:[1,142]},{5:$Va,31:[1,143],36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{5:$Va,17:144,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},o($VP,[2,68]),o($Vh,[2,15]),o($Vi,[2,28]),{24:[1,145]},o($Vi,[2,33]),{5:$Va,17:146,36:25,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{25:[1,147]},o($Vg,[2,69]),{5:$Va,31:[1,148],36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve},{26:[1,149]},{5:$Va,36:42,37:$Vb,39:27,40:$Vc,43:$Vd,47:31,48:$Ve,49:[1,150]},{24:[1,151]},o($Vg,[2,70]),o($Vi,[2,29]),o($Vi,[2,34]),{25:[1,152]},{24:[1,153]},{26:[1,154]},o($Vf,[2,11])];
    }

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:
 return { type: 'Programa', name: $$[$0-1], sections: $$[$0] }; 
break;
case 2: case 9: case 13: case 18: case 24: case 58: case 67: case 71:
 this.$ = [$$[$0]]; 
break;
case 3: case 10: case 14: case 19: case 25: case 72:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 4:
 this.$ = { type: 'Areas', areas: $$[$0] }; 
break;
case 5:
 this.$ = {type: 'Procesos', procesos: $$[$0]}
break;
case 6:
 this.$ = { type: 'Robots', robots: $$[$0] }; 
break;
case 7:
 this.$ = { type: 'Variables', variables: $$[$0] }; 
break;
case 8:
 this.$ = { type: 'Comenzar', actions: $$[$0-2] }; 
break;
case 11:
 this.$ = { type: 'Area', name: $$[$0-11], areaType: $$[$0-9], x1: $$[$0-7], y1: $$[$0-5], x2: $$[$0-3], y2: $$[$0-1] }; 
break;
case 12:
 this.$ = 'AREAC'; 
break;
case 15:
 this.$ = { type: 'Robot', name: $$[$0-4], variables: $$[$0-3], actions: $$[$0-1] }; 
break;
case 16: case 27: case 32: case 43: case 53:
 this.$ = $$[$0]; 
break;
case 17:
 this.$ = []; 
break;
case 20:
 this.$ = { type: 'Variable', name: $$[$0-2], varType: $$[$0] }; 
break;
case 21:
 this.$ = 'numero'; 
break;
case 22:
 this.$ = 'boolean'; 
break;
case 23:
 this.$ = 'id'; 
break;
case 26:
 this.$ = { type: 'Repetir', times: $$[$0-2], actions: $$[$0-1] }; 
break;
case 28:
 this.$ = { type: 'Mientras', condition: $$[$0-3], actions: $$[$0-1] }; 
break;
case 29:
 this.$ = { type: 'Iniciar', robot: $$[$0-5], x: $$[$0-3], y: $$[$0-1] }; 
break;
case 30: case 31:
 this.$ = { type: 'Asignar', variable: $$[$0-2], value: $$[$0] }; 
break;
case 33:
 this.$ = { type: 'Si', condition: $$[$0-3], actions: $$[$0-1], elseActions: [] }; 
break;
case 34:
 this.$ = { type: 'Si', condition: $$[$0-5], actions: $$[$0-3], elseActions: $$[$0-1] }; 
break;
case 35:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '=', right: $$[$0] }; 
break;
case 36:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '<>', right: $$[$0] }; 
break;
case 37:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '<', right: $$[$0] }; 
break;
case 38:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '<=', right: $$[$0] }; 
break;
case 39:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '>', right: $$[$0] }; 
break;
case 40:
 this.$ = { type: 'Comparacion', left: $$[$0-2], operator: '>=', right: $$[$0] }; 
break;
case 41: case 48: case 63:
 this.$ = { type: 'Variable', name: $$[$0] }; 
break;
case 42: case 49: case 60:
 this.$ = { type: 'Numero', value: $$[$0] }; 
break;
case 44:
 this.$ = { type: 'OpMatematica', left: $$[$0-2], operator: '+', right: $$[$0] }; 
break;
case 45:
 this.$ = { type: 'OpMatematica', left: $$[$0-2], operator: '-', right: $$[$0] }; 
break;
case 46:
 this.$ = { type: 'OpMatematica', left: $$[$0-2], operator: '*', right: $$[$0] }; 
break;
case 47:
 this.$ = { type: 'OpMatematica', left: $$[$0-2], operator: '/', right: $$[$0] }; 
break;
case 50:
 this.$ = { type: 'OpBooleana', left: $$[$0-2], operator: '&', right: $$[$0] }; 
break;
case 51:
 this.$ = { type: 'OpBooleana', left: $$[$0-2], operator: '|', right: $$[$0] }; 
break;
case 52:
 this.$ = { type: 'OpBooleana', operator: '~', right: $$[$0] }; 
break;
case 54: case 61:
 this.$ = { type: 'Booleano', value: true }; 
break;
case 55: case 62:
 this.$ = { type: 'Booleano', value: false }; 
break;
case 56:
 this.$ = { type: 'LlamadoFuncion', name: $$[$0-2], args: [] }; 
break;
case 57:
 this.$ = { type: 'LlamadoFuncion', name: $$[$0-3], args: $$[$0-1] }; 
break;
case 59: case 68:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 64:
 this.$ = "E" 
break;
case 65:
 this.$ = "ES" 
break;
case 66:
 this.$ = { type: 'Parametro', parType: $$[$0-1], varDef: $$[$0] } 
break;
case 69:
 this.$ = { type: 'Proceso', name: $$[$0-5], args: [], actions: $$[$0-1] } 
break;
case 70:
 this.$ = { type: 'Proceso', name: $$[$0-6], args: $$[$0-4], actions: $$[$0-1] } 
break;
        }
    }
}


/* generated by @ts-jison/lexer-generator 0.4.1-alpha.2 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';

export class RinfoLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"moduleName":"Rinfo"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [
        /^(?:\s+)/,
        /^(?:programa\b)/,
        /^(?:areas\b)/,
        /^(?:procesos\b)/,
        /^(?:robots\b)/,
        /^(?:robot\b)/,
        /^(?:variables\b)/,
        /^(?:comenzar\b)/,
        /^(?:fin\b)/,
        /^(?:finprograma\b)/,
        /^(?:si\b)/,
        /^(?:sino\b)/,
        /^(?:finsi\b)/,
        /^(?:AreaC\b)/,
        /^(?:numero\b)/,
        /^(?:boolean\b)/,
        /^(?:repetir\b)/,
        /^(?:finrepetir\b)/,
        /^(?:mientras\b)/,
        /^(?:finmientras\b)/,
        /^(?:proceso\b)/,
        /^(?:E\b)/,
        /^(?:ES\b)/,
        /^(?:[0-9]+)/,
        /^(?:V\b)/,
        /^(?:F\b)/,
        /^(?:[a-zA-Z_][a-zA-Z0-9_]*)/,
        /^(?::=)/,
        /^(?::)/,
        /^(?:\()/,
        /^(?:\))/,
        /^(?:,)/,
        /^(?:\+)/,
        /^(?:-)/,
        /^(?:$)/,
        /^(?:.)/
    ];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0:/* skip whitespace */
      break;
    case 1:return 4;
      break;
    case 2:return 8;
      break;
    case 3:return 10;
      break;
    case 4:return 12;
      break;
    case 5:return 29;
      break;
    case 6:return 14;
      break;
    case 7:return 16;
      break;
    case 8:return 31;
      break;
    case 9:return 18;
      break;
    case 10:return 48;
      break;
    case 11:return 50;
      break;
    case 12:return 49;
      break;
    case 13:return 27;
      break;
    case 14:return 34;
      break;
    case 15:return 35;
      break;
    case 16:return 37;
      break;
    case 17:return 38;
      break;
    case 18:return 40;
      break;
    case 19:return 42;
      break;
    case 20:return 74;
      break;
    case 21:return 69;
      break;
    case 22:return 70;
      break;
    case 23:return 24;
      break;
    case 24:return 64;
      break;
    case 25:return 65;
      break;
    case 26:return 5;
      break;
    case 27:return 44;
      break;
    case 28:return 21;
      break;
    case 29:return 23;
      break;
    case 30:return 26;
      break;
    case 31:return 25;
      break;
    case 32:return 57;
      break;
    case 33:return 58;
      break;
    case 34:return 19;
      break;
    case 35:return 'INVALID';
      break;
        }
    }
}


