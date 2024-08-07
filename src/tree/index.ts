interface ASTNode {
    type: string;
}

interface ProgramaNode extends ASTNode {
    type: 'Programa';
    name: string;
    sections: ASTNode[];
}

interface AreasNode extends ASTNode {
    type: 'Areas';
    areas: ASTNode[];
}

interface ProcesosNode extends ASTNode {
    type: 'Procesos';
    procesos: ASTNode[];
}

interface RobotsNode extends ASTNode {
    type: 'Robots';
    robots: ASTNode[];
}

interface VariablesNode extends ASTNode {
    type: 'Variables';
    variables: ASTNode[];
}

interface ComenzarNode extends ASTNode {
    type: 'Comenzar';
    actions: ASTNode[];
}

interface AreaNode extends ASTNode {
    type: 'Area';
    name: string;
    areaType: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface ValueNode extends ASTNode {
    type: string;
    value: number|boolean|null;
}

interface RobotNode extends ASTNode {
    type: 'Robot';
    name: string;
    variables: ASTNode[];
    actions: ASTNode[];
}

interface VariableNode extends ASTNode {
    type: 'Variable';
    name: string;
    varType?: string;
}

interface RepetirNode extends ASTNode {
    type: 'Repetir';
    times: number;
    actions: ASTNode[];
}

interface MientrasNode extends ASTNode {
    type: 'Mientras';
    condition: ASTNode;
    actions: ASTNode[];
}

interface AsignarNode extends ASTNode {
    type: 'Asignar';
    variable: string;
    value: ASTNode;
}

interface SiNode extends ASTNode {
    type: 'Si';
    condition: ASTNode;
    actions: ASTNode[];
    elseActions: ASTNode[];
}

interface ComparacionNode extends ASTNode {
    type: 'Comparacion';
    left: ASTNode;
    operator: string;
    right: ASTNode;
}

interface OpMatematicaNode extends ASTNode {
    type: 'OpMatematica';
    left: ASTNode;
    operator: string;
    right: ASTNode;
}

interface OpBooleanaNode extends ASTNode {
    type: 'OpBooleana';
    left?: ASTNode;
    operator: string;
    right: ASTNode;
}

interface LlamadoFuncionNode extends ASTNode {
    type: 'LlamadoFuncion';
    name: string;
    args: ASTNode[];
}

interface ParametroNode extends ASTNode {
    type: 'Parametro';
    parType: string;
    varDef: VariableNode;
}

interface ProcesoNode extends ASTNode {
    type: 'Proceso';
    name: string;
    args: ASTNode[];
    actions: ASTNode[];
}

type AST =
    | ProgramaNode
    | AreasNode
    | ProcesosNode
    | RobotsNode
    | VariablesNode
    | ComenzarNode
    | AreaNode
    | ValueNode
    | RobotNode
    | VariableNode
    | RepetirNode
    | MientrasNode
    | AsignarNode
    | SiNode
    | ComparacionNode
    | OpMatematicaNode
    | OpBooleanaNode
    | LlamadoFuncionNode
    | ParametroNode
    | ProcesoNode;

export type {
    AST,
    ProgramaNode,
    AreasNode,
    ProcesosNode,
    RobotsNode,
    VariablesNode,
    ComenzarNode,
    AreaNode,
    ValueNode,
    RobotNode,
    VariableNode,
    RepetirNode,
    MientrasNode,
    AsignarNode,
    SiNode,
    ComparacionNode,
    OpMatematicaNode,
    OpBooleanaNode,
    LlamadoFuncionNode,
    ParametroNode,
    ProcesoNode
  };
