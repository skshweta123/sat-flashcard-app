import React from 'react';

function QuizSelection({ setView }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Choose a Quiz Mode</h2>
      <div className="quiz-options" style={{ alignItems: 'center' }}>
        <button onClick={() => setView('quiz_mc')}>
          Multiple Choice
        </button>
        <button onClick={() => setView('quiz_fill')}>
          Fill-in-the-Blank
        </button>
      </div>
    </div>
  );
}

export default QuizSelection; 