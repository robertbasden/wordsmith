import React from 'react';
import { LetterContainer, SelectableLetter } from '../glamorous';

const LetterSelection = ({ letters, letterClicked }) => {

  let letterElements = (letters.map(letter => {
		let clickHandler = (letter.disabled ?
			id => {} :
			id => { letterClicked(letter.id) }
		);
    return (
      <SelectableLetter disabled={letter.disabled} length={letters.length} className="no-select" key={letter.id} onClick={() => clickHandler(letter.id)}><div>{letter.letter}</div></SelectableLetter>
    );
  }));

  return (
    <LetterContainer>{letterElements}</LetterContainer>
  )

}

export default LetterSelection;
