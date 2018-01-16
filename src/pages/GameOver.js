import React from 'react';
import { PageTitle, PageText, ButtonSet, Button } from '../glamorous';

const GameOver = ({tryAgainClicked, message}) => {

  return (
    <div>
      <PageTitle>Whoops!</PageTitle>
      <PageText>{message}</PageText>
      <ButtonSet>
        <Button type='success' onClick={tryAgainClicked}>Start again?</Button>
      </ButtonSet>
    </div>
  );

};

export default GameOver;
