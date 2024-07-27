import { Flower, ICity, IRobot, Paper, Position } from '../entities';

class City implements ICity {
  private gridSize: number;
  private flowers: Flower[];
  private papers: Paper[];
  private canvas: HTMLCanvasElement;
  private readonly blockSize = 10;
  private readonly streetThickness = 8;
  private readonly totalBlockSize = this.blockSize + this.streetThickness;
  private readonly streetColor = 'white';
  private readonly blockColor = 'gray';
  private readonly ctx: CanvasRenderingContext2D;

  constructor(
    gridSize: number,
    canvas?: HTMLCanvasElement,
    flowers?: Flower[],
    papers?: Paper[]
  ) {
    this.gridSize = gridSize;
    this.flowers = flowers || [];
    this.papers = papers || [];
    this.canvas = canvas || document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  removeFlower(position: Position) {
    this.flowers = this.flowers.filter(
      (flower) =>
        flower.position.avenue !== position.avenue ||
        flower.position.street !== position.street
    );
  }

  removePaper(position: Position) {
    this.papers = this.papers.filter(
      (paper) =>
        paper.position.avenue !== position.avenue ||
        paper.position.street !== position.street
    );
  }

  addFlower(position: Position) {
    this.flowers.push({ position });
  }

  addPaper(position: Position) {
    this.papers.push({ position });
  }

  getFlowers() {
    return this.flowers;
  }

  getPapers() {
    return this.papers;
  }

  outOfBounds(position: Position) {
    return (
      position.avenue < 0 ||
      position.avenue >= this.gridSize ||
      position.street < 0 ||
      position.street >= this.gridSize
    );
  }

  checkFlower(aPosition: Position) {
    return this.flowers.some(
      (flower) =>
        flower.position.avenue === aPosition.avenue &&
        flower.position.street === aPosition.street
    );
  }

  checkPaper(aPosition: Position) {
    return this.flowers.some(
      (paper) =>
        paper.position.avenue === aPosition.avenue &&
        paper.position.street === aPosition.street
    );
  }

  drawCity() {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const x = col * this.totalBlockSize;
        const y = row * this.totalBlockSize;

        this.ctx.fillStyle = this.streetColor;
        this.ctx.fillRect(0, y, this.canvas.width, this.streetThickness);

        this.ctx.fillRect(x, 0, this.streetThickness, this.canvas.height);

        this.ctx.fillStyle = this.blockColor;
        this.ctx.fillRect(
          x + this.streetThickness,
          y + this.streetThickness,
          this.blockSize,
          this.blockSize
        );
      }
    }
  }

  eraseRobot(robot: IRobot) {
    const position = robot.getPosition();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(position.prevAvenue, position.prevStreet, 6, 0, 2 * Math.PI);
    this.ctx.clip();
    this.ctx.clearRect(
      position.prevAvenue - 6,
      position.prevStreet - 6,
      12,
      12
    );
    this.ctx.restore();
  }

  drawTrace(robot: IRobot) {
    const position = robot.getPosition();
    const color = robot.getColor();
    this.ctx.beginPath();
    this.ctx.moveTo(position.prevAvenue, position.prevStreet);
    this.ctx.lineTo(position.avenue, position.street);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawRobot(robot: IRobot) {
    const position = robot.getPosition();
    this.ctx.beginPath();
    this.ctx.arc(position.prevAvenue, position.prevStreet, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = robot.getColor();
    this.ctx.fill();
  }

  updateRobotPosition(robot: IRobot) {
    this.eraseRobot(robot);
    this.drawTrace(robot);
    this.drawRobot(robot);
  }
}

export default City;
