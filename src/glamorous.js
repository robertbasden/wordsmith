import glamorous from 'glamorous';

const verticalRhythm = 10;

export const PageTitle = glamorous.h1({
  textTransform: 'uppercase',
  marginBottom: verticalRhythm,
  textAlign: 'center'
});

export const PageText = glamorous.div({
  marginBottom: verticalRhythm,
  textAlign: 'center'
});

export const TimerContainer = glamorous.div({
    width: '200px',
    margin: '0 auto'
});

export const LetterContainer = glamorous.div({
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#F1F1F1',
    padding: '5px',
    margin: '0 auto',
    boxShadow: 'inset 0 0 10px #CCC',
    border: '5px solid #CCC'
});

const letterBaseStyles = {
  backgroundColor: '#344C9F',
  color: '#BED4EF',
  border: '2px solid #579FC8',
  borderRadius: '5px',
  boxShadow: '0 5px 5px rgba(182, 182, 182, 0.75)',
  overflow: 'hidden',
  width: 'calc((100% - (8 * 5px)) / 9)',
  position: 'relative',
  display: 'inline-block',
  marginRight: '5px',
  '& > div': {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    marginTop: '-16px',
    fontSize: '28px'
  },
  '&:before': {
    content: " ",
    fontSize: 0,
  	display: 'block',
  	paddingTop: '100%'
  },
  ':last-child': {
    marginRight: '0px',
  }
};

export const SelectableLetter = glamorous.div(({ disabled }) => {
	return { ...letterBaseStyles,
    opacity: (disabled ? 0.5 : 1),
    transition: 'transform 0.1s linear, opacity 0.1s linear',
    ':hover': {
      transform: (disabled ? '' : 'scale(1.1)')
    }
  }
});

export const Letter = glamorous.div(() => {
  return { ...letterBaseStyles };
});

export const ButtonSet = glamorous.div({
  display: 'flex',
  maxWidth: '400px',
  margin: '0 auto'
});

export const Button = glamorous.div(({disabled, type}) => {
  let backgroundColor = '#364E9D';
  let shadowColor = '#1c337a';
  switch(type) {
    case 'success':
      backgroundColor = '#2d9b14';
      shadowColor = '#2a7f1c';
      break;
    case 'danger':
      backgroundColor = '#CD0A0A';
      shadowColor = '#af0f15';
      break;
    default:
      break;
  }
  return {
    backgroundColor: backgroundColor,
    fontSize: '16px',
    color: '#FFF',
    padding: '10px',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: '20px',
    flexGrow: 1,
    marginRight: '5px',
    boxShadow: '0 6px ' + shadowColor,
    opacity: (disabled ? 0.5 : 1),
    cursor: (disabled ? 'auto' : 'pointer'),
    position: 'relative',
    ':hover': (disabled ? {} : {
      boxShadow: '0 4px ' + shadowColor,
      top: '2px'
    }),
    ':last-child': {
      marginRight: '0px',
    }
  }
});

export const HintContainer = glamorous.div({
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center'
});

export const InstructionsContainer = glamorous.div({
  fontSize: '20px',
  paddingTop: '20px',
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
  height: '80px'
});
