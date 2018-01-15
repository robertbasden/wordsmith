
const scambleWord = word => {
  return word.split('').reverse().join('');
}

const getRandomWord = words => {
  return words[Math.floor(Math.random()*words.length)];
}

export const getNextWord = () => {

  let words = [
    { word: 'MAXIMIZED', hint: 'Make as large or great as possible.' },
    { word: 'JACKKNIFE', hint: 'Move one\'s body into a bent or doubled-up position.' },
    { word: 'FLAPJACKS', hint: 'Sweet dense cakes made from oats, golden syrup, and melted butter, served in rectangles.' }
  ];

  let word = getRandomWord(words);
  return {
    word: word.word,
    scrambledWord: scambleWord(word.word),
    hint: word.hint
  }

};
