import React from 'react';
import { TimerContainer } from '../glamorous';

//https://codepen.io/anon/pen/baKyzy
const Timer = ({ percentageElapsed = 0 }) => {
  let rotation = (percentageElapsed / 100) * 360;
  let rotationString = "rotate(" + rotation + " 100 100)";
  return (
    <TimerContainer>
      <svg width="200px" height="200px">
        <circle cx="100px" cy="100px" r="90px" />
        <path d="M100 100 L100 30" transform={rotationString} />
      </svg>
    </TimerContainer>
  );
}

export default Timer;

//        <rect height="80px" y="20px" width="8px" x="96px" transform={rotationString} />
