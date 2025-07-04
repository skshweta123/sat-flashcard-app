import React, { useState, useEffect } from 'react';

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function FillInBlankMode({ cards, onAnswer }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { index: { answer, isCorrect } }
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (cards.length > 0) {
      const quizCards = shuffleArray([...cards]).slice(0, 10);
      setShuffledCards(quizCards);
    }
  }, [cards]);
  
  const currentQuestion = shuffledCards[currentQuestionIndex] || null;

  useEffect(() => {
    // When question changes, restore input if it was answered
    if (userAnswers[currentQuestionIndex]) {
      setInputValue(userAnswers[currentQuestionIndex].answer);
    } else {
      setInputValue('');
    }
  }, [currentQuestionIndex, userAnswers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || userAnswers[currentQuestionIndex]) return;

    const isCorrect = inputValue.trim().toLowerCase() === currentQuestion.word.toLowerCase();
    
    onAnswer(isCorrect, currentQuestion.word);
    
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: { answer: inputValue.trim(), isCorrect } }));
    setSessionStats(prev => ({ ...prev, [isCorrect ? 'correct' : 'wrong']: prev[isCorrect ? 'correct' : 'wrong'] + 1 }));
  };

  const navigate = (direction) => {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < shuffledCards.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  if (shuffledCards.length === 0) {
    return <p>Loading quiz...</p>;
  }
  
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h3>{currentQuestion.definition}</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!!userAnswer}
          placeholder="Type the word" 
        />
        <button type="submit" disabled={!!userAnswer}>Submit</button>
      </form>
      
      {userAnswer && (
        <p className={`feedback ${userAnswer.isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
          {userAnswer.isCorrect ? 'Correct!' : `The correct answer was: "${currentQuestion.word}"`}
        </p>
      )}

      <div className="quiz-stats-and-nav">
        <p>Question: {currentQuestionIndex + 1}/{shuffledCards.length}</p>
        <div className="session-score">
          <span>Correct: {sessionStats.correct}</span>
          <span>Wrong: {sessionStats.wrong}</span>
        </div>
        <div className="card-navigation">
          <button type="button" onClick={() => navigate(-1)} disabled={currentQuestionIndex === 0}>Previous</button>
          <button type="button" onClick={() => navigate(1)} disabled={currentQuestionIndex === shuffledCards.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default FillInBlankMode; 