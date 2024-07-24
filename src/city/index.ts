import { Flower, ICity, Paper, Position } from "../entities";

class City implements ICity {
  private avenues: number;
  private streets: number;
  private flowers: Flower[];
  private papers: Paper[];

  constructor(
    avenues: number,
    streets: number,
    flowers?: Flower[],
    papers?: Paper[]
  ) {
    this.avenues = avenues;
    this.streets = streets;
    this.flowers = flowers || [];
    this.papers = papers || [];
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
      position.avenue >= this.avenues ||
      position.street < 0 ||
      position.street >= this.streets
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
}

export default City;
