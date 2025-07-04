import React from 'react';

function Header({ setView, redoMode, setRedoMode }) {
  return (
    <header className="app-header">
      <nav className="main-nav">
        <button onClick={() => setView('study')}>Study</button>
        <button onClick={() => setView('quiz')}>Quiz</button>
        <button onClick={() => setView('stats')}>Stats</button>
      </nav>
      <div className="redo-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={redoMode} 
            onChange={() => setRedoMode(!redoMode)} 
          />
          Redo Incorrect Only
        </label>
      </div>
    </header>
  );
}

export default Header; 