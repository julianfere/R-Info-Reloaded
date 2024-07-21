import { Interface } from "readline";
import { AreaNode, AreasNode, AsignarNode, AST, ComenzarNode, ComparacionNode, LlamadoFuncionNode, MientrasNode, OpBooleanaNode, OpMatematicaNode, ParametroNode, ProcesoNode, ProcesosNode, ProgramaNode, RepetirNode, RobotNode, RobotsNode, ValueNode, SiNode, VariableNode, VariablesNode } from "../tree";
import City from "../city";
import Robot from "../robot";

interface ASTVisitor {
    visitProgramaNode(node: ProgramaNode, eContext: EvaluatorContext): any;
    visitAreasNode(node: AreasNode, eContext: EvaluatorContext): any;
    visitProcesosNode(node: ProcesosNode, eContext: EvaluatorContext): any;
    visitRobotsNode(node: RobotsNode, eContext: EvaluatorContext): any;
    visitVariablesNode(node: VariablesNode, eContext: EvaluatorContext): any;
    visitComenzarNode(node: ComenzarNode, eContext: EvaluatorContext): any;
    visitAreaNode(node: AreaNode, eContext: EvaluatorContext): any;
    visitRobotNode(node: RobotNode, eContext: EvaluatorContext): any;
    visitVariableNode(node: VariableNode, eContext: EvaluatorContext): any;
    visitRepetirNode(node: RepetirNode, eContext: EvaluatorContext): any;
    visitMientrasNode(node: MientrasNode, eContext: EvaluatorContext): any;
    visitAsignarNode(node: AsignarNode, eContext: EvaluatorContext): any;
    visitSiNode(node: SiNode, eContext: EvaluatorContext): any;
    visitComparacionNode(node: ComparacionNode, eContext: EvaluatorContext): any;
    visitOpMatematicaNode(node: OpMatematicaNode, eContext: EvaluatorContext): any;
    visitOpBooleanaNode(node: OpBooleanaNode, eContext: EvaluatorContext): any;
    visitLlamadoFuncionNode(node: LlamadoFuncionNode, eContext: EvaluatorContext): any;
    visitParametroNode(node: ParametroNode, eContext: EvaluatorContext): any;
    visitProcesoNode(node: ProcesoNode, eContext: EvaluatorContext): any;
    visit(node: AST, eContext: EvaluatorContext): any;
    visitValueNode(node: ValueNode, eContext: EvaluatorContext): any;
}

class Variable {
    public name: string;
    public type: string;
    public value: number|boolean|null

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
        this.value = null;
    }
}

class EvaluatorContext {
    private variables: Map<string, Variable>;
    private functions: Map<string, ProcesoNode>;
    private city: City|null;
    private robots: Map<string, RobotNode>;

    constructor() {
        this.variables = new Map();
        this.functions = new Map();
        this.city = null;
        this.robots = new Map()
    }

    addVariable(varNode: VariableNode) {
        this.variables.set(varNode.name, new Variable(varNode.name,varNode.type));
    }

    setVariableValue(varName: string, valueNode: ValueNode) {
        let variable = this.variables.get(varName);
        if (variable?.type != valueNode.type) {
            // Crear error para esto
            throw Error("Problema de tipos en asignación")
        }
        variable.value = valueNode.value;
    }

    addFunction(funcNode: ProcesoNode) {
        this.functions.set(funcNode.name, funcNode);
    }

    getFunction(funcName: string) {
        return this.functions.get(funcName);
    }

    addCity(aCity: City) {
        this.city = aCity
    }

    getCity() {
        return this.city;
    }

    addRobot(robotNode: RobotNode) {
        this.robots.set(robotNode.name, robotNode);
    }

    getRobot(robotName: string) {
        return this.functions.get(robotName);
    }
}

class ASTEvaluator implements ASTVisitor {
    visitProgramaNode(node: ProgramaNode, eContext: EvaluatorContext): any {
        // Crea la ciudad
        eContext.addCity(new City(100,100,[],[]));

        // Visita las secciones del programa
        node.sections.forEach(section => this.visit(section as AST, eContext));
    }

    visitAreasNode(node: AreasNode, eContext: EvaluatorContext): any {
        // Itera sobre nodos Area que crearan objetos Area
        // Falta implementar objetos Area
        node.areas.forEach(area => this.visit(area as AST, eContext));
    }

    visitProcesosNode(node: ProcesosNode, eContext: EvaluatorContext): any {
        // Agrega procesos a ejecutar en el contexto 
        node.procesos.forEach(proceso => eContext.addFunction(proceso as ProcesoNode));
    }

    visitRobotsNode(node: RobotsNode, eContext: EvaluatorContext): any {
        // Agrega robots a ejecutar en el contexto
        node.robots.forEach(robot => eContext.addRobot(robot as RobotNode));
    }

    visitVariablesNode(node: VariablesNode, eContext: EvaluatorContext): any {
        // Crea variables en ambiente global
        node.variables.forEach(variable => eContext.addVariable(variable as VariableNode));
    }

    visitComenzarNode(node: ComenzarNode, eContext: EvaluatorContext): any {
        // Ejecutar codigo de programa, probablemente, llamado a funciones
        node.actions.forEach(action => this.visit(action as AST, eContext));
        // Luego deberia ejecutar codigo de robots
        // contexto.robots.forEach(ejecutar)
    }

    visitAreaNode(node: AreaNode, eContext: EvaluatorContext): any {
        // Por ahora sin funcionalidad
        // Implementar objeto Area
        // eContext.agregarArea(nodoArea)
    }

    visitRobotNode(node: RobotNode, eContext: EvaluatorContext): any {
        // Guarda robot en contexto para ejecutarlo luego del programa
        eContext.addRobot(node);
    }

    visitVariableNode(node: VariableNode, eContext: EvaluatorContext): any {
        // Agrega variable al contexto
        eContext.addVariable(node);
    }

    visitRepetirNode(node: RepetirNode, eContext: EvaluatorContext): any {
        for (let i = 0; i < node.times; i++) {
            node.actions.forEach(action => this.visit(action as AST, eContext));
        }
    }

    visitMientrasNode(node: MientrasNode, eContext: EvaluatorContext): any {
        let condicion = this.visit(node.condition as AST, eContext)
        //Plantear error por si condicion no es booleana
        while (condicion) {
            node.actions.forEach(action => this.visit(action as AST, eContext));
        }
    }

    visitAsignarNode(node: AsignarNode, eContext: EvaluatorContext): any {
        // Guarda valor en variable del contexto
        eContext.setVariableValue(node.variable, this.visit(node.value as AST, eContext));
    }

    visitSiNode(node: SiNode, eContext: EvaluatorContext): any {
        let condicion = this.visit(node.condition as AST, eContext)
        //Plantear error por si condicion no es booleana
        if (condicion) {
            node.actions.forEach(action => this.visit(action as AST, eContext));
        } else {
            node.elseActions.forEach(action => this.visit(action as AST, eContext));
        }
    }

    visitComparacionNode(node: ComparacionNode, eContext: EvaluatorContext): any {
        const left = this.visit(node.left as AST, eContext);
        const right = this.visit(node.right as AST, eContext);

        // Plantear error por si left o right no son numeros

        switch (node.operator) {
            case '=': return left === right;
            case '<>': return left !== right;
            case '<': return left < right;
            case '<=': return left <= right;
            case '>': return left > right;
            case '>=': return left >= right;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }

    visitOpMatematicaNode(node: OpMatematicaNode, eContext: EvaluatorContext): any {
        const left = this.visit(node.left as AST, eContext);
        const right = this.visit(node.right as AST, eContext);

        // Plantear error por si left o right no son numeros

        switch (node.operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }

    visitOpBooleanaNode(node: OpBooleanaNode, eContext: EvaluatorContext): any {
        const right = this.visit(node.right as AST, eContext);
        if (node.operator === '~') {
            return !right;
        }
        const left = this.visit(node.left as AST, eContext);

        // Plantear error por si left o right no son bool

        switch (node.operator) {
            case '&': return left && right;
            case '|': return left || right;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }
    
    visitValueNode(node: ValueNode, eContext: EvaluatorContext) {
        // Analizar si retornar por aca o por contexto
        return node.value;
    }

    visitLlamadoFuncionNode(node: LlamadoFuncionNode, eContext: EvaluatorContext): any {
        // Ejecutar (hacer otro recorrido) de funcion de contexto Global
        // Probablemente hacer un visit con nuevo contexto, que contenga
        // al contextoGlobal por si lo necesita y para diferenciar de local
        // retornar el resultado de la visita
    }

    visitParametroNode(node: ParametroNode, eContext: EvaluatorContext): any {
        // Sin funcionalidad
    }

    visitProcesoNode(node: ProcesoNode, eContext: EvaluatorContext): any {
        eContext.addFunction(node);
    }

    visit(node: AST, eContext: EvaluatorContext): any {
        switch (node.type) {
            case 'Programa': return this.visitProgramaNode(node as ProgramaNode, eContext);
            case 'Areas': return this.visitAreasNode(node as AreasNode, eContext);
            case 'Procesos': return this.visitProcesosNode(node as ProcesosNode, eContext);
            case 'Robots': return this.visitRobotsNode(node as RobotsNode, eContext);
            case 'Variables': return this.visitVariablesNode(node as VariablesNode, eContext);
            case 'Comenzar': return this.visitComenzarNode(node as ComenzarNode, eContext);
            case 'Area': return this.visitAreaNode(node as AreaNode, eContext);
            case 'Robot': return this.visitRobotNode(node as RobotNode, eContext);
            case 'Variable': return this.visitVariableNode(node as VariableNode, eContext);
            case 'Repetir': return this.visitRepetirNode(node as RepetirNode, eContext);
            case 'Mientras': return this.visitMientrasNode(node as MientrasNode, eContext);
            case 'Asignar': return this.visitAsignarNode(node as AsignarNode, eContext);
            case 'Si': return this.visitSiNode(node as SiNode, eContext);
            case 'Comparacion': return this.visitComparacionNode(node as ComparacionNode, eContext);
            case 'OpMatematica': return this.visitOpMatematicaNode(node as OpMatematicaNode, eContext);
            case 'OpBooleana': return this.visitOpBooleanaNode(node as OpBooleanaNode, eContext);
            case 'LlamadoFuncion': return this.visitLlamadoFuncionNode(node as LlamadoFuncionNode, eContext);
            case 'Parametro': return this.visitParametroNode(node as ParametroNode, eContext);
            case 'Proceso': return this.visitProcesoNode(node as ProcesoNode, eContext);
            default: throw new Error(`Unknown node type: ${node.type}`);
        }
    }
}
