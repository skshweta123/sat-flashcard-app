// utils/localStorage.js
export const getStats = () =>
  JSON.parse(localStorage.getItem('stats')) || {};

export const updateStats = (word, correct) => {
  const stats = getStats();
  if (!stats[word]) stats[word] = { right: 0, wrong: 0 };
  correct ? stats[word].right++ : stats[word].wrong++;
  localStorage.setItem('stats', JSON.stringify(stats));
}; 