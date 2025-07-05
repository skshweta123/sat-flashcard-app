import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import StatsPage from './components/StatsPage';
import Header from './components/Header';
import QuizMode from './components/QuizMode';
import FillInBlankMode from './components/FillInBlankMode';
import QuizSelection from './components/QuizSelection';
import { updateStats, getStats } from './utils/localStorage';
import { pickWeightedCard } from './utils/weightedPicker';
import { getIPA } from './utils/cmuPronouncer';

function App() {
  const [allCards, setAllCards] = useState([]);
  const [activeCards, setActiveCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [view, setView] = useState('study'); // 'study', 'stats', 'quiz_mc', 'quiz_fill'
  const [redoMode, setRedoMode] = useState(false);
  const [visitedCards, setVisitedCards] = useState(new Set());

  useEffect(() => {
    const fetchAndProcessData = async () => {
      let vocabData = [];
      let cmuDict = {};

      try {
        const [vocabRes, cmuRes] = await Promise.allSettled([
          fetch('/vocab.json'),
          fetch('/cmudict.json')
        ]);

        if (vocabRes.status === 'fulfilled' && vocabRes.value.ok) {
          vocabData = await vocabRes.value.json();
        } else {
          console.error('Failed to load vocabulary:', vocabRes.reason || vocabRes.value.statusText);
          // Try to load from a backup or show an error
          setAllCards([]); // Or handle error appropriately
          return;
        }

        if (cmuRes.status === 'fulfilled' && cmuRes.value.ok) {
          cmuDict = await cmuRes.value.json();
        } else {
          console.error('Failed to load pronunciation dictionary:', cmuRes.reason || cmuRes.value.statusText);
          // Proceed without pronunciation data
        }

        const processedCards = vocabData.map(card => ({
          ...card,
          definition: card.def || card.definition, // Support both formats
          pronunciationIPA: getIPA(card.word, cmuDict)
        }));
        
        setAllCards(processedCards);

      } catch (error) {
        console.error("Error processing data:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  useEffect(() => {
    const stats = getStats();
    let filteredCards = allCards;
    if (redoMode) {
      filteredCards = allCards.filter(card => {
        const s = stats[card.word];
        return s && s.wrong > s.right;
      });
    }
    setActiveCards(filteredCards);
    setVisitedCards(new Set()); // Reset visited count on mode change

    if (filteredCards.length > 0) {
      const newCard = pickWeightedCard(filteredCards, stats);
      setCurrentCard(newCard);
    } else {
      setCurrentCard(null);
    }
  }, [allCards, redoMode]);

  useEffect(() => {
    if (currentCard) {
      setVisitedCards(prevVisited => new Set(prevVisited).add(currentCard.word));
    }
  }, [currentCard]);

  const handleAnswer = (correct, word) => {
    const wordToUpdate = word || currentCard.word;
    updateStats(wordToUpdate, correct);

    if (view === 'study') {
      const stats = getStats();
      const nextCard = pickWeightedCard(activeCards, stats);
      setCurrentCard(nextCard);
    }
    // Quiz modes handle their own progression
  };

  const navigateCard = (direction) => {
    if (!currentCard || activeCards.length === 0) return;

    const currentCardIndex = activeCards.findIndex(card => card.word === currentCard.word);
    let nextIndex = currentCardIndex + direction;

    if (nextIndex >= activeCards.length) {
      nextIndex = 0; // Wrap to the beginning
    } else if (nextIndex < 0) {
      nextIndex = activeCards.length - 1; // Wrap to the end
    }

    setCurrentCard(activeCards[nextIndex]);
  };

  const renderView = () => {
    if (activeCards.length === 0 && (view === 'study' || view.startsWith('quiz'))) {
      return <p>{redoMode ? "You have no incorrect cards to review. Uncheck 'Redo Incorrect' to see all cards." : "No cards available."}</p>
    }
    switch (view) {
      case 'stats':
        return <StatsPage />;
      case 'quiz':
        return <QuizSelection setView={setView} />;
      case 'quiz_mc':
        return <QuizMode cards={activeCards} onAnswer={handleAnswer} />;
      case 'quiz_fill':
        return <FillInBlankMode cards={activeCards} onAnswer={handleAnswer} />;
      case 'study':
      default:
        if (!currentCard) {
          return <p>Loading cards...</p>;
        }
        const totalCards = activeCards.length;
        const visitedCount = visitedCards.size;

        return (
          <>
            <Flashcard 
              wordData={currentCard} 
              onAnswer={handleAnswer} 
              onNavigate={navigateCard}
            />
            {totalCards > 0 && (
              <div className="card-navigation">
                <p className="card-counter">
                  {visitedCount}/{totalCards}
                </p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Header setView={setView} redoMode={redoMode} setRedoMode={setRedoMode} />
      {renderView()}
    </div>
  );
}

export default App; 