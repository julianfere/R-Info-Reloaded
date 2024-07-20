import { it, describe, expect, Mocked, vi } from "vitest";
import Robot from "./index";
import { ICity } from "../entities";

describe("Robot", () => {
  const mockCity: Mocked<ICity> = {
    addFlower: vi.fn(),
    addPaper: vi.fn(),
    removeFlower: vi.fn(),
    removePaper: vi.fn(),
    getFlowers: vi.fn(),
    getPapers: vi.fn(),
    outOfBounds: vi.fn(),
  };

  it("should move", () => {
    const robot = new Robot(mockCity);
    robot.move();

    const position = robot.getPosition();

    expect(position).toEqual({ avenue: 0, street: 1 });
  });

  it("should turn right", () => {
    const robot = new Robot(mockCity);
    robot.turnRight();

    const direction = robot.getDirection();

    expect(direction).toBe("E");
  });

  it("should check flower", () => {
    const robot = new Robot(mockCity);

    mockCity.getFlowers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    expect(robot.checkFlower()).toBe(true);
  });

  it("should check paper", () => {
    const robot = new Robot(mockCity);

    mockCity.getPapers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    expect(robot.checkPaper()).toBe(true);
  });

  it("should take flower", () => {
    const robot = new Robot(mockCity);

    mockCity.getFlowers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    robot.takeFlower();

    expect(robot.thereIsFlowerInBackpack()).toBe(true);
  });

  it("should take paper", () => {
    const robot = new Robot(mockCity);

    mockCity.getPapers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    robot.takePaper();

    expect(robot.thereIsPaperInBackpack()).toBe(true);
  });

  it("should deposit flower", () => {
    const robot = new Robot(mockCity);

    mockCity.getFlowers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    robot.takeFlower();
    robot.depositFlower();

    expect(robot.thereIsFlowerInBackpack()).toBe(false);
  });

  it("should deposit paper", () => {
    const robot = new Robot(mockCity);

    mockCity.getPapers.mockReturnValueOnce([
      { position: { avenue: 0, street: 0 } },
    ]);

    robot.takePaper();
    robot.depositPaper();

    expect(robot.thereIsPaperInBackpack()).toBe(false);
  });

  it("should throw NoFlowerInCornerError", () => {
    const robot = new Robot(mockCity);

    mockCity.getFlowers.mockReturnValueOnce([]);

    expect(() => robot.takeFlower()).toThrowError(
      "There is no flower in this corner"
    );
  });

  it("should throw NoPaperInCornerError", () => {
    const robot = new Robot(mockCity);

    mockCity.getPapers.mockReturnValueOnce([]);

    expect(() => robot.takePaper()).toThrowError(
      "There is no paper in this corner"
    );
  });

  it("should throw NoFlowerInBackpackError", () => {
    const robot = new Robot(mockCity);

    expect(() => robot.depositFlower()).toThrowError(
      "There is no flower in the backpack"
    );
  });

  it("should throw NoPaperInBackpackError", () => {
    const robot = new Robot(mockCity);

    expect(() => robot.depositPaper()).toThrowError(
      "There is no paper in the backpack"
    );
  });

  it("should throw FellOffTheCityError", () => {
    const robot = new Robot(mockCity);

    mockCity.outOfBounds.mockReturnValueOnce(true);

    expect(() => robot.move()).toThrowError("The robot fell off the city");
  });
});
