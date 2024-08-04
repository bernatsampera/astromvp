export function calculatePopularity(numReviews: number): number {
  if (numReviews <= 0) {
    return 0;
  } else if (numReviews >= 2000) {
    return 100;
  } else {
    // Use a logarithmic scale to increase the rate of change at lower review counts
    const maxReviews = 2000;
    const minReviews = 1;
    const rankRange = 100;
    return Math.floor((rankRange * Math.log(numReviews - minReviews + 1)) / Math.log(maxReviews - minReviews + 1));
  }
}

export function calculateRating(rating: number): number {
  if (rating <= 1) {
    return 0;
  } else if (rating >= 5) {
    return 100;
  } else {
    // Use a logarithmic scale to increase the rate of change at lower review counts
    const maxRating = 5;
    const minRating = 1;
    const rankRange = 100;
    return Math.floor((rankRange * Math.log(rating - 1.5 * minRating + 1)) / Math.log(maxRating - minRating + 1));
  }
}

export function calculateCost(punctuation: number): number {
  if (punctuation <= 1) {
    return 100;
  } else if (punctuation >= 4.5) {
    return 10;
  } else {
    // Use a linear scale to decrease the cost as punctuation increases
    const maxPunctuation = 5;
    const minPunctuation = 1;
    const costRange = 100;
    return Math.floor(costRange - ((punctuation - minPunctuation) / (maxPunctuation - minPunctuation)) * costRange);
  }
}

export const getOverallGymRanking = ({
  popularityValue,
  ratingValue,
  dropIn,
  costValue = 50,
}: {
  popularityValue: number;
  ratingValue: number;
  costValue?: number;
  dropIn?: boolean;
}) => {
  const costWeight = 1;
  const popularityWeight = 4;
  const ratingWeight = 3;

  // Calculate the weighted sum of all properties.
  const scoreWithoutDropIn =
    (costValue * costWeight + popularityValue * popularityWeight + ratingValue * ratingWeight) /
    (costWeight + popularityWeight + ratingWeight);

  const dropInBonus = dropIn ? 5 : -5;
  const scoreWithBonus = scoreWithoutDropIn + dropInBonus;

  // Ensure the score is within the range of 1 to 100.
  const overallScore = Math.max(1, Math.min(100, scoreWithBonus));

  return Math.floor(overallScore);
};
