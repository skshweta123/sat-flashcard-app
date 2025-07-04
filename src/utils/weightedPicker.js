// utils/weightedPicker.js
export const pickWeightedCard = (cards, stats) => {
  if (!cards || cards.length === 0) {
    return null;
  }
  const weighted = cards.flatMap(card => {
    const s = stats[card.word] || { right: 0, wrong: 0 };
    const weight = 1 + s.wrong * 3 - s.right;
    return Array(Math.max(1, weight)).fill(card);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
}; 