import React, { useState, useEffect } from 'react';
import { getStats } from '../utils/localStorage';

function StatsPage() {
  const [stats, setStats] = useState({ right: 0, wrong: 0, incorrectWords: [] });

  useEffect(() => {
    const loadedStats = getStats();
    const total = Object.values(loadedStats).reduce(
      (acc, s) => {
        acc.right += s.right;
        acc.wrong += s.wrong;
        return acc;
      },
      { right: 0, wrong: 0 }
    );

    const incorrectWords = Object.entries(loadedStats)
      .filter(([, s]) => s.wrong > s.right)
      .map(([word]) => word);

    setStats({ ...total, incorrectWords });
  }, []);

  return (
    <div>
      <h2>Study Stats</h2>
      <p>✔️ Correct: {stats.right}</p>
      <p>❌ Incorrect: {stats.wrong}</p>
      <hr />
      <h3>Words to Review</h3>
      {stats.incorrectWords.length > 0 ? (
        <ul>
          {stats.incorrectWords.map(word => <li key={word}>{word}</li>)}
        </ul>
      ) : (
        <p>No words marked incorrect yet. Great job!</p>
      )}
    </div>
  );
}

export default StatsPage; 