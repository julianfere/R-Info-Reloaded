import { Backpack, ICity, Directions, RobotPosition } from '../entities';
import { IRobot } from '../entities';
import {
  FellOffTheCityError,
  NoFlowerInBackpackError,
  NoFlowerInCornerError,
  NoPaperInBackpackError,
  NoPaperInCornerError
} from './errors';

class Robot implements IRobot {
  public id: string;
  private backpack: Backpack;
  private city: ICity;
  private position: RobotPosition;
  private direction: Directions;
  private readonly color: string;

  constructor(id: string, city: ICity, color?: string) {
    this.id = id;
    this.direction = 'N';
    this.city = city;
    this.backpack = { flower: 0, paper: 0 };
    this.position = { avenue: 0, street: 0, prevAvenue: 0, prevStreet: 0 };
    this.color = color || 'red';
    this.city.drawRobot(this);
  }

  move() {
    this.position.prevAvenue = this.position.avenue;
    this.position.prevStreet = this.position.street;
    switch (this.direction) {
      case 'N':
        this.position.street++;
        break;
      case 'E':
        this.position.avenue++;
        break;
      case 'S':
        this.position.street--;
        break;
      case 'W':
        this.position.avenue--;
        break;
    }

    if (this.city.outOfBounds(this.position)) throw new FellOffTheCityError();
  }

  turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
    }
  }

  checkFlower() {
    return this.city.checkFlower(this.position);
  }

  checkPaper() {
    return this.city.checkPaper(this.position);
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

  setPosition(aPosition: RobotPosition) {
    this.position = aPosition;
  }

  getColor() {
    return this.color;
  }
}

export default Robot;
