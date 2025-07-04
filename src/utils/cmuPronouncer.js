export const getIPA = (word, cmuDict) => {
  if (!cmuDict || !word) {
    return '';
  }
  const upperWord = word.toUpperCase();
  return cmuDict[upperWord] || '';
}; 