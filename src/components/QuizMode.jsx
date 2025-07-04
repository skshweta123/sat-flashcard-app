import React, { useState, useEffect, useMemo } from 'react';

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function QuizMode({ cards, onAnswer }) {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { index: { word, isCorrect } }
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    if (cards.length > 0) {
      const quizCards = shuffleArray([...cards]).slice(0, 10);
      setShuffledCards(quizCards);
    }
  }, [cards]);

  const currentQuestion = useMemo(() => {
    if (shuffledCards.length === 0) return null;
    const correctCard = shuffledCards[currentQuestionIndex];
    if (!correctCard) return null;

    const distractors = cards
      .filter(card => card.word !== correctCard.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    const options = shuffleArray([correctCard, ...distractors]);
    return { ...correctCard, options };
  }, [shuffledCards, currentQuestionIndex, cards]);

  const handleOptionClick = (selectedCard) => {
    if (userAnswers[currentQuestionIndex]) return; // Already answered

    const isCorrect = selectedCard.word === currentQuestion.word;
    
    // Update global stats
    onAnswer(isCorrect, currentQuestion.word);
    
    // Update session stats and answers
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: { word: selectedCard.word, isCorrect } }));
    setSessionStats(prev => ({ ...prev, [isCorrect ? 'correct' : 'wrong']: prev[isCorrect ? 'correct' : 'wrong'] + 1 }));
  };
  
  const navigate = (direction) => {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < shuffledCards.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  if (shuffledCards.length === 0 || !currentQuestion) {
    return <p>Loading quiz...</p>;
  }
  
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h3>{currentQuestion.definition}</h3>
      <div className="quiz-options">
        {currentQuestion.options.map(option => {
          let className = '';
          if (userAnswer) {
            if (option.word === currentQuestion.word) {
              className = 'correct-answer'; // Always show correct answer after selection
            }
            if (userAnswer.word === option.word && !userAnswer.isCorrect) {
              className = 'wrong-answer'; // Highlight the user's wrong choice
            }
          }
          return (
            <button 
              key={option.word} 
              onClick={() => handleOptionClick(option)}
              className={className}
              disabled={!!userAnswer}
            >
              {option.word}
            </button>
          );
        })}
      </div>
      
      <div className="quiz-stats-and-nav">
        <p>Question: {currentQuestionIndex + 1}/{shuffledCards.length}</p>
        <div className="session-score">
          <span>Correct: {sessionStats.correct}</span>
          <span>Wrong: {sessionStats.wrong}</span>
        </div>
        <div className="card-navigation">
          <button onClick={() => navigate(-1)} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={() => navigate(1)} disabled={currentQuestionIndex === shuffledCards.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default QuizMode;

 