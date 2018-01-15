import React from 'react';

const Hint = ({showHint, hint}) => {

  if(showHint) {
    return (<div><strong>Hint</strong>: {hint}</div>);
  } else {
    return (<div></div>);
  }
  
};

export default Hint;
