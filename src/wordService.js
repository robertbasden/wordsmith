
/**
 * Randomly shuffle letters of a word.
 * Uses the Fisher-Yates shuffling algorithm.
 *
 * @param  {String} word - Word to be shuffled
 * @return {String} Random ordering of letters
 * @see  https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 */
export const scrambleWord = word => {
  const wordArray = word.split('');
  let idx = wordArray.length;

  while( idx !== 0){
    const rndIndex = Math.floor(idx * Math.random());

    const tmpValue = wordArray[idx];
    wordArray[idx] = wordArray[rndIndex];
    wordArray[rndIndex] = tmpValue;

    idx -= 1;
  }

  return wordArray.join('');
};

const getRandomWord = words => {
  return words[Math.floor(Math.random()*words.length)];
}

export const getNextWord = () => {

  let words = [
    { word: 'MAXIMIZED', hint: 'Make as large or great as possible.' },
    { word: 'JACKKNIFE', hint: 'Move one\'s body into a bent or doubled-up position.' },
    { word: 'FLAPJACKS', hint: 'Sweet dense cakes made from oats, golden syrup, and melted butter, served in rectangles.' },
    { word: 'REFLECTION', hint: 'An image seen in a mirror or shiny surface' },
    { word: 'ABSTRACT', hint: 'Existing in thought or as an idea but not having a physical or concrete existence' },
    { word: 'DIRECTOR', hint: 'A person who is in charge of an activity, department, or organization' },
    { word: 'VERSION', hint: 'A particular release of a piece of computer software' },
    { word: 'DEMAND', hint: 'An insistent and peremptory request, made as of right' }
  ];

  let word = getRandomWord(words);
  return {
    word: word.word,
    scrambledWord: scrambleWord(word.word),
    hint: word.hint
  }

};
