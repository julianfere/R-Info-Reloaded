import { AreaNode, AreasNode, AsignarNode, AST, BooleanoNode, ComenzarNode, ComparacionNode, IniciarNode, LlamadoFuncionNode, MientrasNode, NumeroNode, OpBooleanaNode, OpMatematicaNode, ParametroNode, ProcesoNode, ProcesosNode, ProgramaNode, RepetirNode, RobotNode, RobotsNode, SimpleNode, SiNode, VariableNode, VariablesNode } from "../tree";

interface ASTVisitor {
    visitProgramaNode(node: ProgramaNode): void;
    visitAreasNode(node: AreasNode): void;
    visitProcesosNode(node: ProcesosNode): void;
    visitRobotsNode(node: RobotsNode): void;
    visitVariablesNode(node: VariablesNode): void;
    visitComenzarNode(node: ComenzarNode): void;
    visitAreaNode(node: AreaNode): void;
    visitSimpleNode(node: SimpleNode): void;
    visitRobotNode(node: RobotNode): void;
    visitVariableNode(node: VariableNode): void;
    visitRepetirNode(node: RepetirNode): void;
    visitMientrasNode(node: MientrasNode): void;
    visitIniciarNode(node: IniciarNode): void;
    visitAsignarNode(node: AsignarNode): void;
    visitSiNode(node: SiNode): void;
    visitComparacionNode(node: ComparacionNode): void;
    visitOpMatematicaNode(node: OpMatematicaNode): void;
    visitOpBooleanaNode(node: OpBooleanaNode): void;
    visitNumeroNode(node: NumeroNode): void;
    visitBooleanoNode(node: BooleanoNode): void;
    visitLlamadoFuncionNode(node: LlamadoFuncionNode): void;
    visitParametroNode(node: ParametroNode): void;
    visitProcesoNode(node: ProcesoNode): void;
}

class ASTEvaluator implements ASTVisitor {
    visitProgramaNode(node: ProgramaNode): any {
        node.sections.forEach(section => this.visit(section));
        //quizas tenga que ordenar las areas para recorrerla de forma especifica por los scopes
    }

    visitAreasNode(node: AreasNode): any {
        // Crear areas en ambiente global
        node.areas.forEach(area => this.visit(area));
    }

    visitProcesosNode(node: ProcesosNode): any {
        // Crear procesos en ambiente global
        node.procesos.forEach(proceso => this.visit(proceso));
    }

    visitRobotsNode(node: RobotsNode): any {
        // Ejecutar codigo de robots
        node.robots.forEach(robot => this.visit(robot));
    }

    visitVariablesNode(node: VariablesNode): any {
        // Crear variables en ambiente global
        node.variables.forEach(variable => this.visit(variable));
    }

    visitComenzarNode(node: ComenzarNode): any {
        // Ejecutar codigo de programa
        node.actions.forEach(action => this.visit(action));
    }

    visitAreaNode(node: AreaNode): any {
        // Por ahora sin funcionalidad
    }

    visitSimpleNode(node: SimpleNode): any {
        return node.value;
    }

    visitRobotNode(node: RobotNode): any {
        // Crear variables DEL ROBOT ESPECIFICO
        node.variables.forEach(variable => this.visit(variable));
        // Ejecutar codigo DEL ROBOT ESPECIFICO
        node.actions.forEach(action => this.visit(action));
    }

    visitVariableNode(node: VariableNode): any {
        // Por ahora sin funcionalidad
    }

    visitRepetirNode(node: RepetirNode): any {
        for (let i = 0; i < node.times; i++) {
            node.actions.forEach(action => this.visit(action));
        }
    }

    visitMientrasNode(node: MientrasNode): any {
        while (this.visit(node.condition)) {
            node.actions.forEach(action => this.visit(action));
        }
    }

    visitIniciarNode(node: IniciarNode): any {
        // Por ahora sin funcionalidad
    }

    visitAsignarNode(node: AsignarNode): any {
        // Asignar valores del contexto global
        // Quizas tenga que diferenciar las asignaciones de robots y las de programa
        // posibles soluciones?
        // const value = this.visit(node.value);
        // context[node.variable] = value; 
    }

    visitSiNode(node: SiNode): any {
        if (this.visit(node.condition)) {
            node.actions.forEach(action => this.visit(action));
        } else {
            node.elseActions.forEach(action => this.visit(action));
        }
    }

    visitComparacionNode(node: ComparacionNode): any {
        const left = this.visit(node.left);
        const right = this.visit(node.right);

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

    visitOpMatematicaNode(node: OpMatematicaNode): any {
        const left = this.visit(node.left);
        const right = this.visit(node.right);

        switch (node.operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }

    visitOpBooleanaNode(node: OpBooleanaNode): any {
        const right = this.visit(node.right);
        if (node.operator === '~') {
            return !right;
        }
        const left = this.visit(node.left);

        switch (node.operator) {
            case '&': return left && right;
            case '|': return left || right;
            default: throw new Error(`Unknown operator: ${node.operator}`);
        }
    }

    visitNumeroNode(node: NumeroNode): any {
        return node.value;
    }

    visitBooleanoNode(node: BooleanoNode): any {
        return node.value;
    }

    visitLlamadoFuncionNode(node: LlamadoFuncionNode): any {
        // Llamar a funciones del contexto global, definidas anteriormente
        // posibles soluciones?
        // const args = node.args.map(arg => this.visit(arg));
        // return context[node.name](...args); 
    }

    visitParametroNode(node: ParametroNode): any {
        // Llamar a parametros para funcion
    }

    visitProcesoNode(node: ProcesoNode): any {
        node.args.forEach(arg => this.visit(arg));
        node.actions.forEach(action => this.visit(action));
    }

    visit(node: AST): any {
        switch (node.type) {
            case 'Programa': return this.visitProgramaNode(node as ProgramaNode);
            case 'Areas': return this.visitAreasNode(node as AreasNode);
            case 'Procesos': return this.visitProcesosNode(node as ProcesosNode);
            case 'Robots': return this.visitRobotsNode(node as RobotsNode);
            case 'Variables': return this.visitVariablesNode(node as VariablesNode);
            case 'Comenzar': return this.visitComenzarNode(node as ComenzarNode);
            case 'Area': return this.visitAreaNode(node as AreaNode);
            case 'Robot': return this.visitRobotNode(node as RobotNode);
            case 'Variable': return this.visitVariableNode(node as VariableNode);
            case 'Repetir': return this.visitRepetirNode(node as RepetirNode);
            case 'Mientras': return this.visitMientrasNode(node as MientrasNode);
            case 'Iniciar': return this.visitIniciarNode(node as IniciarNode);
            case 'Asignar': return this.visitAsignarNode(node as AsignarNode);
            case 'Si': return this.visitSiNode(node as SiNode);
            case 'Comparacion': return this.visitComparacionNode(node as ComparacionNode);
            case 'OpMatematica': return this.visitOpMatematicaNode(node as OpMatematicaNode);
            case 'OpBooleana': return this.visitOpBooleanaNode(node as OpBooleanaNode);
            case 'Numero': return this.visitNumeroNode(node as NumeroNode);
            case 'Booleano': return this.visitBooleanoNode(node as BooleanoNode);
            case 'LlamadoFuncion': return this.visitLlamadoFuncionNode(node as LlamadoFuncionNode);
            case 'Parametro': return this.visitParametroNode(node as ParametroNode);
            case 'Proceso': return this.visitProcesoNode(node as ProcesoNode);
            default: throw new Error(`Unknown node type: ${node.type}`);
        }
    }
}
