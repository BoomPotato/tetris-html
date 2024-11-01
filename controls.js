"use strict";

//Shape controls
//Modified from StackOverFlow:
//https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys

//Used to hasten shape descent
var arrowDownKeyIsHeld = false;


var action = {
  moveLeft() {
    let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].column--;
    }
    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('left', trialCoordinates)) {
      clearShape(currentShape);
      currentShape.coordinates = trialCoordinates;
      displayShape(currentShape);
    }
  },

  moveRight() {
    let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].column++;
    }
    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('right', trialCoordinates)) {
      clearShape(currentShape);
      currentShape.coordinates = trialCoordinates;
      displayShape(currentShape);
    }
  },

  rotate() {
    rotateClockwise();
  },

  hastenDescent() {
    arrowDownKeyIsHeld = true;
  },

  revertDescentToDefaultSpeed() {
    arrowDownKeyIsHeld = false;
  },

  triggerPlaceShape() {
    clearTimeout(timeout);
    let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(currentShape.coordinates);
    clearShape(currentShape);
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      currentShape.coordinates[i].row -= smallestDistanceBetweenShapeAndPlacedShapes;
    }
    displayShape(currentShape);
    placeShape(currentShape);

    if (!gameModeGoalReached) {
      generateShape(false);
    } else {
      gameOver();
    }
  }
};


var keyAction = {
  'ArrowLeft': { keydown: action.moveLeft },
  'ArrowRight': { keydown: action.moveRight },
  'ArrowUp': { keydown: action.rotate },
  'ArrowDown': { keydown: action.hastenDescent, keyup: action.revertDescentToDefaultSpeed },
  ' ': { keydown: action.triggerPlaceShape }
};


/**
 * Sample event (press arrow up button)
 * event.key = "ArrowUp"
 * event.type = "keydown"
 * 
 * Sample event (release arrow up button)
 * event.key = "ArrowUp"
 * event.type = "keyup"
 */
var keyHandler = (event) => {
  
  if (!(event.key in keyAction) || !(event.type in keyAction[event.key])) return; //No such Action
  if (event.repeat && event.key == "ArrowDown") {
    //Key-held, prevent repeated Actions (Does not work in IE11-)
    return;
  }
  //Trigger an Action
  keyAction[event.key][event.type]();
};


function activateControls() {
  ['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
  });
}
