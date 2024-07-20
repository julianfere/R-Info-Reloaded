import { Backpack, ICity, Directions, Position } from "../entities";
import { IRobot } from "../entities";
import {
  FellOffTheCityError,
  NoFlowerInBackpackError,
  NoFlowerInCornerError,
  NoPaperInBackpackError,
  NoPaperInCornerError,
} from "./errors";

class Robot implements IRobot {
  public id: string;
  private backpack: Backpack;
  private city: ICity;
  private position: Position;
  private direction: Directions;

  constructor(id: string, city: ICity) {
    this.id = id;
    this.direction = "N";
    this.city = city;
    this.backpack = { flower: 0, paper: 0 };
    this.position = { avenue: 0, street: 0 };
  }

  move() {
    switch (this.direction) {
      case "N":
        this.position.street++;
        break;
      case "E":
        this.position.avenue++;
        break;
      case "S":
        this.position.street--;
        break;
      case "W":
        this.position.avenue--;
        break;
    }

    if (this.city.outOfBounds(this.position)) throw new FellOffTheCityError();
  }

  turnRight() {
    switch (this.direction) {
      case "N":
        this.direction = "E";
        break;
      case "E":
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.direction = "N";
        break;
    }
  }

  checkFlower() {
    return this.city
      .getFlowers()
      .some(
        (flower) =>
          flower.position.avenue === this.position.avenue &&
          flower.position.street === this.position.street
      );
  }

  checkPaper() {
    return this.city
      .getPapers()
      .some(
        (paper) =>
          paper.position.avenue === this.position.avenue &&
          paper.position.street === this.position.street
      );
  }

  takeFlower() {
    if (this.checkFlower()) {
      this.city.removeFlower(this.position);
      this.backpack.flower++;
    } else {
      throw new NoFlowerInCornerError();
    }
  }

  takePaper() {
    if (this.checkPaper()) {
      this.city.removePaper(this.position);
      this.backpack.paper++;
    } else {
      throw new NoPaperInCornerError();
    }
  }

  thereIsFlowerInBackpack() {
    return this.backpack.flower > 0;
  }

  thereIsPaperInBackpack() {
    return this.backpack.paper > 0;
  }

  getPosition() {
    return this.position;
  }

  depositFlower() {
    if (this.thereIsFlowerInBackpack()) {
      this.city.addFlower(this.position);
      this.backpack.flower--;
    } else {
      throw new NoFlowerInBackpackError();
    }
  }

  depositPaper() {
    if (this.thereIsPaperInBackpack()) {
      this.city.addPaper(this.position);
      this.backpack.paper--;
    } else {
      throw new NoPaperInBackpackError();
    }
  }

  getDirection() {
    return this.direction;
  }

  getAvenuePosition() {
    return this.position.avenue;
  }

  getStreetPosition() {
    return this.position.street;
  }

  setPosition(aPosition: Position) {
    this.position = aPosition;
  }
}

export default Robot;
