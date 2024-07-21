interface Position {
  avenue: number;
  street: number;
}

interface RobotPosition extends Position {
  prevStreet: number;
  prevAvenue: number;
}

interface IPositionable {
  position: Position;
}

interface Flower extends IPositionable {}

interface Paper extends IPositionable {}

type Directions = 'N' | 'E' | 'S' | 'W';

interface ICity {
  removeFlower: (position: Position) => void;
  removePaper: (position: Position) => void;
  addFlower: (position: Position) => void;
  addPaper: (position: Position) => void;
  getFlowers: () => Flower[];
  getPapers: () => Paper[];
  outOfBounds: (position: Position) => boolean;
  checkFlower: (aPosition: Position) => boolean;
  checkPaper: (aPosition: Position) => boolean;
  updateRobotPosition: (robot: IRobot, position: Position) => void;
  drawRobot: (robot: IRobot) => void;
}

interface Backpack {
  flower: number;
  paper: number;
}

interface IRobot {
  move: () => void;
  turnRight: () => void;
  checkFlower: () => boolean;
  checkPaper: () => boolean;
  takeFlower: () => void;
  takePaper: () => void;
  depositFlower: () => void;
  depositPaper: () => void;
  thereIsFlowerInBackpack: () => boolean;
  thereIsPaperInBackpack: () => boolean;
  getPosition: () => RobotPosition;
  getDirection: () => Directions;
  getAvenuePosition: () => number;
  getStreetPosition: () => number;
  setPosition: (aPosition: RobotPosition) => void;
  getColor: () => string;
}

export type {
  Backpack,
  ICity,
  Flower,
  IPositionable,
  Position,
  Directions,
  IRobot,
  Paper,
  RobotPosition
};
