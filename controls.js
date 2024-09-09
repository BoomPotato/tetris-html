//Shape controls
/**
 * Modified from StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
var action = {
  moveLeft() {
    //Move shape to the left
  },
  moveRight() {
    //Move shape to the right
  },
  rotateClockwise() {
    rotate();
  },
  hastenDescent() {
    //TO DO
  },
  placeShape() {
    //TO DO
  }
};
var keyAction = {
  'ArrowLeft': { keydown: action.moveLeft },
  'ArrowRight': { keydown: action.moveRight },
  'ArrowUp': { keydown: action.rotateClockwise },
  'ArrowDown': { keydown: action.hastenDescent },
  ' ': { keydown: action.placeShape }
};
var keyHandler = (event) => {
  if (!(event.key in keyAction) || !(event.type in keyAction[event.key])) return; //No such Action
  if (event.repeat && event.key == " ") {
    return; // Key-held, prevent repeated Actions (Does not work in IE11-)
  }
  keyAction[event.key][event.type]();  //Trigger an Action
};


function activateTankControls() {
  ['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
  });
}
