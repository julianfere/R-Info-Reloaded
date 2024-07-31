import { describe, it, expect, vi, Mocked } from 'vitest';
import City from './index';

describe('City', () => {
  let mockCanvas: Mocked<HTMLCanvasElement>;

  it('should create a city', () => {
    const city = new City(5, mockCanvas);
    expect(city).toBeDefined();
  });

  it('should add a flower', () => {
    const city = new City(5, mockCanvas);
    city.addFlower({ avenue: 0, street: 0 });
    expect(city.getFlowers().length).toBe(1);
  });

  it('should remove a flower', () => {
    const city = new City(5, mockCanvas);
    city.addFlower({ avenue: 0, street: 0 });
    city.removeFlower({ avenue: 0, street: 0 });
    expect(city.getFlowers().length).toBe(0);
  });

  it('should add a paper', () => {
    const city = new City(5, mockCanvas);
    city.addPaper({ avenue: 0, street: 0 });
    expect(city.getPapers().length).toBe(1);
  });

  it('should remove a paper', () => {
    const city = new City(5, mockCanvas);
    city.addPaper({ avenue: 0, street: 0 });
    city.removePaper({ avenue: 0, street: 0 });
    expect(city.getPapers().length).toBe(0);
  });

  it('should check if a position is out of bounds', () => {
    const city = new City(5, mockCanvas);
    expect(city.outOfBounds({ avenue: 5, street: 5 })).toBe(true);
  });
});
