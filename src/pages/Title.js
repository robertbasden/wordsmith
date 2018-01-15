import React from 'react';
import { PageTitle, PageText, ButtonSet, Button } from '../glamorous';

const Title = ({startClicked}) => {

  return (
    <div>
      <PageTitle>Wordsmith</PageTitle>
      <PageText>Complete the anagram before the time ran out</PageText>
      <ButtonSet>
        <Button type='success' onClick={startClicked}>Start Game</Button>
      </ButtonSet>
    </div>
  );

};

export default Title;
