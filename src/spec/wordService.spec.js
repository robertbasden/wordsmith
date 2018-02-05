import { scrambleWord } from '../wordService.js';

it('sucessfully randomises a word', () => {
    const testWord = 'foobar';
    const randomizedWord = scrambleWord(testWord);

    expect(randomizedWord).not.toBeNull();
    expect(randomizedWord).not.toBeUndefined();
    expect(randomizedWord).not.toEqual(testWord);
    expect(randomizedWord).not.toEqual(testWord.split('').reverse().join(''));
});

it('does not drop letters', () => {
    const testWord = 'barbaz';
    const randomizedWord = scrambleWord(testWord);

    expect(randomizedWord.split('')).toHaveLength(testWord.split('').length);
});
