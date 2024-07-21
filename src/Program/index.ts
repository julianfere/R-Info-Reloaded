import { IRobot } from '../entities';

class Program {
  public name: string;
  public procedures: any[];
  public areas: any[];
  public robots: IRobot[];

  constructor(name: string) {
    this.name = name;
    this.procedures = [];
    this.areas = [];
    this.robots = [];
  }
}

export default Program;
