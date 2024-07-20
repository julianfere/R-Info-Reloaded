import { describe, it, expect } from "vitest";
import City from "./index";

describe("City", () => {
  it("should create a city", () => {
    const city = new City(5, 5);
    expect(city).toBeDefined();
  });

  it("should add a flower", () => {
    const city = new City(5, 5);
    city.addFlower({ avenue: 0, street: 0 });
    expect(city.getFlowers().length).toBe(1);
  });

  it("should remove a flower", () => {
    const city = new City(5, 5);
    city.addFlower({ avenue: 0, street: 0 });
    city.removeFlower({ avenue: 0, street: 0 });
    expect(city.getFlowers().length).toBe(0);
  });

  it("should add a paper", () => {
    const city = new City(5, 5);
    city.addPaper({ avenue: 0, street: 0 });
    expect(city.getPapers().length).toBe(1);
  });

  it("should remove a paper", () => {
    const city = new City(5, 5);
    city.addPaper({ avenue: 0, street: 0 });
    city.removePaper({ avenue: 0, street: 0 });
    expect(city.getPapers().length).toBe(0);
  });

  it("should check if a position is out of bounds", () => {
    const city = new City(5, 5);
    expect(city.outOfBounds({ avenue: 5, street: 5 })).toBe(true);
  });
});
