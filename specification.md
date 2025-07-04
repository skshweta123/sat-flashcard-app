📘 SAT Flashcard Web App (React)
A responsive React-based flashcard app to help users study SAT vocabulary. Includes study mode, quiz mode, pronunciation (text + audio), and performance tracking.

🚀 Features
SAT vocabulary flashcards with definitions

Flip to see pronunciation and meaning

Mark if you got a word right or wrong

Focus review on incorrect cards

Quiz mode (multiple-choice and fill-in-the-blank)

Pronunciation:

Text-based (IPA) from CMU Pronouncing Dictionary

Audio using browser’s Web Speech API

Statistics page: track correct vs incorrect, progress

Data stored in localStorage

Responsive layout (desktop/tablet-first)

🧱 Tech Stack
React + Vite

JavaScript (or TypeScript optional)

Tailwind CSS (optional, for clean responsive UI)

Web Speech API

localStorage for persistence

📁 Folder Structure
pgsql
Copy
Edit
sat-flashcards/
│
├── public/
│   └── vocab.json           # List of SAT words
│
├── src/
│   ├── components/
│   │   ├── Flashcard.js
│   │   ├── StudyMode.js
│   │   ├── QuizMode.js
│   │   ├── StatsPage.js
│   │   └── Header.js
│   │
│   ├── utils/
│   │   ├── localStorage.js  # Helpers for saving/loading
│   │   ├── weightedPicker.js
│   │   └── cmuPronouncer.js # CMUdict-based lookup
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
├── .gitignore
├── vite.config.js
└── package.json
📦 Getting Started
bash
Copy
Edit
# 1. Create the app
npm create vite@latest sat-flashcards --template react
cd sat-flashcards
npm install

# 2. (Optional) Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Add Tailwind directives to src/styles.css

# 3. Start dev server
npm run dev
🧠 Flashcard Data Format
public/vocab.json:

json
Copy
Edit
[
  {
    "word": "abase",
    "type": "v.",
    "definition": "To lower in position, estimation, or the like; degrade."
  },
  ...
]
🔁 Flashcard Component (Core UI)
jsx
Copy
Edit
function Flashcard({ wordData, onAnswer }) {
  const [flipped, setFlipped] = useState(false);

  const speak = () => {
    const utter = new SpeechSynthesisUtterance(wordData.word);
    speechSynthesis.speak(utter);
  };

  return (
    <div className="card" onClick={() => setFlipped(!flipped)}>
      {!flipped ? (
        <div className="front">
          <h2>{wordData.word}</h2>
          <p className="pronunciation">{wordData.pronunciationIPA}</p>
        </div>
      ) : (
        <div className="back">
          <h3>{wordData.definition}</h3>
          <p><button onClick={speak}>🔊 Listen</button></p>
          <div className="actions">
            <button onClick={() => onAnswer(true)}>✔️ Right</button>
            <button onClick={() => onAnswer(false)}>❌ Wrong</button>
          </div>
        </div>
      )}
    </div>
  );
}
📊 Stats Tracking (localStorage)
js
Copy
Edit
// utils/localStorage.js
export const getStats = () =>
  JSON.parse(localStorage.getItem('stats')) || {};

export const updateStats = (word, correct) => {
  const stats = getStats();
  if (!stats[word]) stats[word] = { right: 0, wrong: 0 };
  correct ? stats[word].right++ : stats[word].wrong++;
  localStorage.setItem('stats', JSON.stringify(stats));
};
🎯 Weighted Random Logic
js
Copy
Edit
// utils/weightedPicker.js
export const pickWeightedCard = (cards, stats) => {
  const weighted = cards.flatMap(card => {
    const s = stats[card.word] || { right: 0, wrong: 0 };
    const weight = 1 + s.wrong * 3 - s.right;
    return Array(Math.max(1, weight)).fill(card);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
};
🔠 CMU Pronouncer (IPA Text)
You can use a subset of CMUdict and create a lookup table.

js
Copy
Edit
// utils/cmuPronouncer.js
import cmudict from './cmudict.json'; // your local subset

export const getIPA = word => cmudict[word.toLowerCase()] || '';
📈 Statistics Page
jsx
Copy
Edit
function StatsPage() {
  const stats = getStats();
  const total = Object.values(stats).reduce(
    (acc, s) => {
      acc.right += s.right;
      acc.wrong += s.wrong;
      return acc;
    },
    { right: 0, wrong: 0 }
  );

  return (
    <div>
      <h2>Study Stats</h2>
      <p>✔️ Correct: {total.right}</p>
      <p>❌ Incorrect: {total.wrong}</p>
    </div>
  );
}
🌐 Deployment (GitHub Pages)
Install GH Pages:

bash
Copy
Edit
npm install --save-dev gh-pages
In package.json, add:

json
Copy
Edit
"homepage": "https://yourusername.github.io/sat-flashcards",
"scripts": {
  "predeploy": "vite build",
  "deploy": "gh-pages -d dist"
}
Deploy:

bash
Copy
Edit
npm run deploy
✅ What’s Next
 Add categories or difficulty filters

 Offline support (e.g. service workers)

 Export stats as CSV

 Create user profiles (with backend)

