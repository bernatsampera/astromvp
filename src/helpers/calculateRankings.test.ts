import { expect, test } from 'vitest';
import { calculateRating, calculatePopularity, calculateCost, getOverallGymRanking } from './calculateRankings';

describe('calculateRankings helper functions', () => {
  test('calculate Popularity Rankings', () => {
    expect(calculatePopularity(1)).toBe(0);
    expect(calculatePopularity(100)).toBe(60);
    expect(calculatePopularity(400)).toBe(78);
    expect(calculatePopularity(1999)).toBe(99);
    expect(calculatePopularity(2000)).toBe(100);
  });

  test('calculate Rating Rankings', () => {
    expect(calculateRating(5)).toBe(100);
    expect(calculateRating(4.5)).toBe(86);
    expect(calculateRating(4)).toBe(77);
    expect(calculateRating(3)).toBe(56);
    expect(calculateRating(1)).toBe(0);
  });

  test('calculate Cost', () => {
    expect(calculateCost(5)).toBe(10);
    expect(calculateCost(4)).toBe(25);
    expect(calculateCost(3)).toBe(50);
    expect(calculateCost(1)).toBe(100);
  });

  test('calculate Overall', () => {
    expect(calculateCost(5)).toBe(10);
    expect(calculateCost(4)).toBe(25);
    expect(calculateCost(3)).toBe(50);
    expect(calculateCost(1)).toBe(100);
  });

  test('should calculate overall score correctly', () => {
    expect(getOverallGymRanking({ costValue: 50, popularityValue: 50, ratingValue: 80, dropIn: true })).toBe(66);
    expect(getOverallGymRanking({ costValue: 30, popularityValue: 70, ratingValue: 90, dropIn: true })).toBe(77);
    expect(getOverallGymRanking({ costValue: 100, popularityValue: 20, ratingValue: 30, dropIn: true })).toBe(38);
  });
});
