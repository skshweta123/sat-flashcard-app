✅ SAT Flashcard App – Implementation TODO List
✅ 1. Load and Display Flashcards (Study Mode - Basic) - Done
Tasks:

Load JSON word list from public/vocab.json.

Display one flashcard at a time with word on front.

Flip card to show definition and pronunciation.

Acceptance Criteria:

 The app loads flashcards from a local JSON file.

 One card is visible at a time.

 Clicking the card flips it to show the back.

 Front shows word and pronunciation (IPA).

 Back shows definition and two buttons: ✔️ Right, ❌ Wrong.

✅ 2. Track User Responses in Local Storage - Done
Tasks:

Add "Right" / "Wrong" buttons below flipped card.

Save results per word in localStorage.

Structure: { word: { right: 2, wrong: 1 }, ... }

Acceptance Criteria:

 Clicking ✔️ or ❌ updates stats for that word.

 Stats are persisted between sessions.

 Data structure is accessible via developer tools.

✅ 3. Implement Weighted Random Card Selection - Done
Tasks:

Prefer cards marked incorrect more often.

Use weightedPicker.js to build logic.

Acceptance Criteria:

 Cards marked ❌ appear more frequently than those marked ✔️.

 Card order feels more adaptive to the user's learning gaps.

✅ 4. Add Audio Pronunciation with Web Speech API - Done
Tasks:

Add "🔊 Listen" button on back of flashcard.

Play the word using SpeechSynthesisUtterance.

Acceptance Criteria:

 Each flashcard back has a working audio button.

 Clicking the button plays the correct pronunciation.

✅ 5. Create Statistics Page - Done
Tasks:

Build a StatsPage component.

Show total words studied, right, wrong.

Optionally, display chart or % accuracy.

Acceptance Criteria:

 Stats page displays total right/wrong.

 Works with real-time updates from localStorage.

 Optional: Displays list of incorrect words.

✅ 6. Implement Quiz Mode (Multiple Choice) - Done
Tasks:

Show question: definition or word.

Provide 1 correct + 3 distractors.

Track and display results.

Acceptance Criteria:

 Multiple-choice quiz uses flashcard data.

 One correct answer + 3 random distractors.

 User sees immediate feedback after selection.

 Stats update like in study mode.

✅ 7. Implement Quiz Mode (Fill-in-the-Blank) - Done
Tasks:

Show definition, prompt user to type correct word.

Match input against correct answer.

Acceptance Criteria:

 Definition is shown, input box available.

 Typing the correct word triggers success.

 Typo or wrong word gives error.

 Updates stats accordingly.

✅ 8. Redo Mode (Incorrect Cards Only) - Done
Tasks:

Add toggle/button to review only incorrect cards.

Filter flashcards based on wrong > 0.

Acceptance Criteria:

 "Redo incorrect" mode is available.

 Only cards with wrong > right appear.

 Cards update normally when marked ✔️ or ❌ again.

✅ 9. Responsive Design & UI Polishing - Done
Tasks:

Use Flexbox or Tailwind to ensure responsiveness.

Make layout work well on tablets and desktops.

Improve visual hierarchy, colors, spacing.

Acceptance Criteria:

 App works well on different screen sizes.

 Flashcards remain centered, readable, and interactive.

✅ 10. Deploy to GitHub Pages - Done
Tasks:

Set up gh-pages in package.json.

Add deploy script.

Deploy with npm run deploy.

Acceptance Criteria:

 App is accessible at https://yourusername.github.io/sat-flashcards.

 All features work on deployed version.

 Reloading and localStorage persistence works.