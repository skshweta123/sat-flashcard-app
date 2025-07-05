import React, { useState, useEffect } from 'react';

function Flashcard({ wordData, onAnswer, onNavigate }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // When the card data changes, flip back to the front
    setFlipped(false);
  }, [wordData]);

  if (!wordData) {
    return <div>Loading...</div>;
  }

  const handleAnswer = (correct, e) => {
    e.stopPropagation();
    onAnswer(correct);
  };

  const handleNavigate = (direction, e) => {
    e.stopPropagation();
    onNavigate(direction);
  };

  const speak = (e) => {
    e.stopPropagation();
    const utter = new SpeechSynthesisUtterance(wordData.word);
    speechSynthesis.speak(utter);
  };

  return (
    <div className={`card-container ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="card">
        <div className="front">
          <button className="card-nav-btn prev" onClick={(e) => handleNavigate(-1, e)}>&#8249;</button>
          <div className="front-content">
            <h2>{wordData.word}</h2>
            <p className="pronunciation">{wordData.pronunciationIPA}</p>
            <p><button className="listen-btn" onClick={speak}>🔊 Listen</button></p>
          </div>
          <button className="card-nav-btn next" onClick={(e) => handleNavigate(1, e)}>&#8250;</button>
        </div>
        <div className="back">
          <h3>{wordData.definition}</h3>
          <p><button className="listen-btn" onClick={speak}>🔊 Listen</button></p>
          <div className="actions">
            <button className="right-btn" onClick={(e) => handleAnswer(true, e)}>✔️ Right</button>
            <button className="wrong-btn" onClick={(e) => handleAnswer(false, e)}>❌ Wrong</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;