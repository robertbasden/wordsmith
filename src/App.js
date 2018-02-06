import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { Provider, connect } from 'react-redux';
import { getNextWord }from './wordService';
import LetterSelect from './components/LetterSelect';
import ChoosenLetters from './components/ChoosenLetters';
import Hint from './components/Hint';
import Timer from  './components/Timer';
import { HintContainer, ButtonSet, Button } from './glamorous';
import Title from './pages/Title';
import GameOver from './pages/GameOver';
import { clamp } from './utils';

//Actions
const START_GAME = 'START_GAME';
const NEXT_WORD = 'NEXT_WORD';
const TO_TITLE = 'TO_TITLE';
const GAME_OVER = 'GAME_OVER';

const NEW_WORD = 'NEW_WORD';
const CHOOSE_LETTER = 'CHOOSE_LETTER';
const SHOW_HINT = 'SHOW_HINT';
const UNDO = 'UNDO';
const CLEAR_LETTERS = 'CLEAR_LETTERS';
const SET_PERCENTAGE_ELAPSED = 'SET_PERCENTAGE_ELAPSED';

//Action creators

const startGame = () => {
  return {
    type: START_GAME
  }
}

const nextWord = () => {
  return {
    type: NEXT_WORD
  }
}

const toTitle = () => {
  return {
    type: TO_TITLE
  }
}

const gameOver = (message) => {
  return {
    type: GAME_OVER,
    message
  }
}

const newWord = () => {
  return {
    type: NEW_WORD
  }
}

const chooseLetter = id => {
  return {
    type: CHOOSE_LETTER,
    id
  }
}

const showHint = () => {
  return {
    type: SHOW_HINT
  }
}

const undo = () => {
  return {
    type: UNDO
  }
}

const done = () => {

  let state = store.getState();
  let solution = state.game.solution;
  let proposedSolution = state.game.choosenLetters.map(letter => {
    return letter.letter;
  }).join('');

  if(solution === proposedSolution) {

    return {
      type: NEW_WORD
    }

  } else {

    return {
      type: GAME_OVER,
      message: 'Whoops! That was the wrong word!'
    }

  }

}

const clearLetters = () => {
  return {
    type: CLEAR_LETTERS
  }
}

const setPercentageElapsed = (percentageElapsed) => {

  if(percentageElapsed == 100) {

    return {
      type: GAME_OVER,
      message: 'Whoops! You ran out of time!'
    };

  } else {

    return {
      type: SET_PERCENTAGE_ELAPSED,
      percentageElapsed
    }

  }

}

const getNewGameState = () => {

  let { word, scrambledWord, hint } = getNextWord();
  let availableLetters = scrambledWord.split('').map((letter, index) => {
    return { id: index, letter: letter, choosen: false };
  });

  return {
    letters: availableLetters,
    solution: word,
    hint: hint,
    choosenLetters: [],
    percentageElapsed: 0,
    hintShown: false,
    startTime: Date.now(),
    interval: null
  };

}

const getPercentageElapsed = (startTime, nowTime) => {

  let timeAllowed = 25;
  let timeDifference = nowTime - startTime;
  let secondsElapsed = timeDifference / 1000;
  let percentageElapsed = clamp((secondsElapsed / timeAllowed) * 100, 0, 100);
  return percentageElapsed;

}

const gameOverReducer = (state = null, action) => {

  switch(action.type) {

    case GAME_OVER:

      return action.message;

    default:

      return state;

  };

};

const pageReducer = (state = 'title', action) => {

  switch(action.type) {

    case START_GAME:
    case NEW_WORD:

      return 'game';

    case TO_TITLE:

      return 'title';

    case GAME_OVER:

      return 'gameOver';

    default:

      return state;

  };

};

const gameReducer = (state = null, action) => {
  switch(action.type) {

    case START_GAME:
    case NEW_WORD:

      if(state != null) {
        clearInterval(state.interval);
      };

      let newGameState = getNewGameState();
      newGameState.interval = setInterval(() => {

        store.dispatch(setPercentageElapsed(getPercentageElapsed(newGameState.startTime, Date.now())));

      }, 100);

      return newGameState;

    case TO_TITLE:

      clearInterval(state.interval);
      return null;

    case GAME_OVER:

      clearInterval(state.interval);
      return null;

    case SET_PERCENTAGE_ELAPSED:

      return { ...state, percentageElapsed: action.percentageElapsed };

    case CHOOSE_LETTER:

      let letterId = action.id;
      let letters = state.letters.map(letter => {
        if(letter.id === letterId) {
          return { ...letter, choosen: true };
        } else {
          return letter;
        }
      });
      let letterToAdd = state.letters.filter(letter => {
        return letter.id === letterId;
      })[0];
      let choosenLetters = [];
      if(letterToAdd !== undefined) {
        choosenLetters = [...state.choosenLetters, letterToAdd];
      } else {
        choosenLetters = state.choosenLetters;
      }
      return { ...state, letters: letters, choosenLetters: choosenLetters };

    case SHOW_HINT:

      return { ...state, showHint: true };

    case UNDO:

      let lastLetterChoosen = state.choosenLetters.slice(-1)[0];
      if(lastLetterChoosen === undefined) {
        return { ...state };
      } else {
        let newChoosenLetters = state.choosenLetters.slice(0, -1);
        let newLetters = state.letters.map(letter => {
          if(lastLetterChoosen.id === letter.id) {
            return { ...letter, choosen: false };
          } else {
            return letter;
          }
        });
        return { ...state, letters: newLetters, choosenLetters: newChoosenLetters };
      }

    case CLEAR_LETTERS:

      let newLetters = state.letters.map(letter => {
        return { ...letter, choosen: false };
      })
      return { ...state, letters: newLetters, choosenLetters: [] };

    default:

      return state;

  }
}

const reducer = combineReducers({
  page: pageReducer,
  game: gameReducer,
  gameOver: gameOverReducer
});

const store = createStore(reducer, applyMiddleware(logger));

const mapStateToProps = (state) => {
    if (state.game!=null) {
      return {
        letters: state.game.letters.map(letter => {
          return { ...letter, disabled: letter.choosen };
        })
      };
    } else {
      return {
        letters: []
      }
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
      letterClicked: id => {
        store.dispatch(chooseLetter(id));
      }
    };
};

const ConnectedLetterSelect = connect(mapStateToProps, mapDispatchToProps)(LetterSelect);
const ConnectedChoosenLetters = connect((state) => {
    if(state.game != null) {
      return {
        letters: state.game.choosenLetters
      }
    } else {
      return {
        letters: []
      }
    }
}, null)(ChoosenLetters);

const UndoButton = ({ canUndo, undoClicked }) => {
  return (<Button disabled={!canUndo} onClick={() => { undoClicked() }}>Undo</Button>)
}

const ConnectedUndoButton = connect((state) => {
    return {
      canUndo: (state.game == null) ? false : state.game.choosenLetters.length > 0
    }
}, (dispatch) => {
  return {
    undoClicked: () => {
      dispatch(undo());
    }
  }
})(UndoButton);

const ClearButton = ({ canClear, clearClicked }) => {
  return (<Button disabled={!canClear} type='danger' onClick={() => { clearClicked() }}>Clear</Button>)
}

const ConnectedClearButton = connect((state) => {
    return {
      canClear: (state.game == null) ? false : state.game.choosenLetters.length > 0
    }
}, (dispatch) => {
  return {
    clearClicked: () => {
      dispatch(clearLetters());
    }
  }
})(ClearButton);

const DoneButton = ({ canBeDone, doneClicked }) => {
  return (<Button disabled={!canBeDone} type='success' onClick={() => { doneClicked() }}>Submit</Button>)
}

const ConnectedDoneButton = connect((state) => {
    return {
      canBeDone: (state.game == null) ? false : state.game.choosenLetters.length === 9
    }
}, (dispatch) => {
  return {
    doneClicked: () => {
      dispatch(done());
    }
  }
})(DoneButton);

const ShowHintButton = ({ showHint, showHintClicked }) => {
  return (<Button disabled={showHint} onClick={() => { showHintClicked() }}>Show Hint</Button>)
}

const ConnectedShowHintButton = connect((state) => {
    return {
      showHint: state.game.showHint
    }
}, (dispatch) => {
  return {
    showHintClicked: () => {
      dispatch(showHint());
    }
  }
})(ShowHintButton);

const ConnectedTimer = connect((state) => {
    return {
      percentageElapsed: state.game.percentageElapsed
    }
}, null)(Timer);

const ConnectedHint = connect((state) => {
  return {
    hint: state.game.hint,
    showHint: state.game.showHint
  }
}, null)(Hint);

const Playing = () => {

  return (
    <div>
      <ConnectedTimer />
      <br />
      <div style={{textAlign: 'center', marginBottom: '10px', color: '#666'}}>Available letters: </div>
      <ConnectedLetterSelect></ConnectedLetterSelect>
      <br />
      <ConnectedChoosenLetters></ConnectedChoosenLetters>
      <br />
      <ButtonSet>
        <ConnectedUndoButton />
        <ConnectedClearButton />
        <ConnectedDoneButton />
        <ConnectedShowHintButton />
      </ButtonSet>
      <br />
      <HintContainer>
        <ConnectedHint />
      </HintContainer>
    </div>
  );

};

const ConnectedTitle = connect(null, (dispatch) => {
    return {
      startClicked: () => {
        dispatch(startGame());
      }
    }
}, null)(Title);

const ConnectedGameOver = connect((state) => {
  return {
    message: (state.gameOver == null) ? '' : state.gameOver
  }
}, (dispatch) => {
    return {
      tryAgainClicked: () => {
        dispatch(startGame());
      }
    }
}, null)(GameOver);

const MainView = ({page}) => {
  switch (page) {
    case 'title':
      return (<ConnectedTitle />);
    case 'game':
      return (<Playing />);
    case 'gameOver':
      return (<ConnectedGameOver />);
  }
}

const ConnectedMainView = connect((state) => {
  return {
    page: state.page
  }
}, null)(MainView);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedMainView />
      </Provider>
    );
  }
}

document.addEventListener('keydown', function(event) {
    if(event.which === 8) {
      //Backspace
      store.dispatch(undo());
    } else if(event.which === 13) {
        //Return
        store.dispatch(done());
    } else {
      let key = event.key.toUpperCase();
      let game = store.getState().game;
      if(game != null) {
        let letters = game.letters;
        let letterToChoose = letters.filter(letter => {
          return letter.choosen === false && letter.letter === key;
        })[0];
        if(letterToChoose !== undefined) {
          store.dispatch(chooseLetter(letterToChoose.id));
        }
      }
    }
});

export default App;
