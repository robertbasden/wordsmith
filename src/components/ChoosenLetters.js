import React from 'react';
import { InstructionsContainer, LetterContainer, Letter } from '../glamorous';

const ChoosenLetters = ({letters}) => {

  let letterElements = letters.map(letter => {
    return (<Letter className="no-select" key={letter.id}><div>{letter.letter}</div></Letter>);
  });

  if(letterElements.length > 0) {
    return (<LetterContainer>{letterElements}</LetterContainer>);
  } else {
    return (<InstructionsContainer>Click or type the letters above to solve the anagram before the time runs out!</InstructionsContainer>);

  }
}

export default ChoosenLetters;
