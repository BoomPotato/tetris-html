"use strict";

//Shape controls
//Modified from StackOverFlow:
//https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys

// //Stores the default defaultDescentInterval variable before it's overriden by the hastenDescentInterval variable.
// var defaultDescentIntervalBeforeOverride;

//Used to hasten shape descent
var arrowDownKeyIsHeld = false;


var action = {
  moveLeft() {
    //Move shape to the left
    let closestColumnCoordinateToTheLeft = currentShape.coordinates[0].column;
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      if (currentShape.coordinates[i].column < closestColumnCoordinateToTheLeft) {
        closestColumnCoordinateToTheLeft = currentShape.coordinates[i].column;
      }
    }

    let shapeColor = getColor(currentShape.shapeType);

    if (closestColumnCoordinateToTheLeft > 1) {
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Remove labels from old coordinate
        gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
        //Remove color from old coordinate
        gridItem.style.removeProperty("background-color");
      }
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        currentShape.coordinates[i].column--;
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Add label to new coordinate
        gridItem.classList.add(currentShape.coordinates[i].id, currentShape.rotationPhase);
        //Add color to new coordinate
        gridItem.style.backgroundColor = shapeColor;
      }
    }
  },

  moveRight() {
    //Move shape to the right
    let closestColumnCoordinateToTheRight = currentShape.coordinates[0].column;
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      if (currentShape.coordinates[i].column > closestColumnCoordinateToTheRight) {
        closestColumnCoordinateToTheRight = currentShape.coordinates[i].column;
      }
    }

    let shapeColor = getColor(currentShape.shapeType);

    if (closestColumnCoordinateToTheRight < columnWidth) {
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Remove labels from old coordinate
        gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
        //Remove color from old coordinate
        gridItem.style.removeProperty("background-color");
      }
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        currentShape.coordinates[i].column++;
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Add label to new coordinate
        gridItem.classList.add(currentShape.coordinates[i].id, currentShape.rotationPhase);
        //Add color to new coordinate
        gridItem.style.backgroundColor = shapeColor;
      }
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

};

var keyAction = {
  'ArrowLeft': { keydown: action.moveLeft },
  'ArrowRight': { keydown: action.moveRight },
  'ArrowUp': { keydown: action.rotate },
  'ArrowDown': { keydown: action.hastenDescent, keyup: action.revertDescentToDefaultSpeed },
  ' ': { keydown: action.placeShape }
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
  keyAction[event.key][event.type]();  //Trigger an Action
};


function activateControls() {
  ['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
  });
}
