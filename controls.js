"use strict";

//Shape controls
//Modified from StackOverFlow:
//https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys

//Used to hasten shape descent
var arrowDownKeyIsHeld = false;


var action = {
  moveLeft() {
    let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
    let shapeColor = getColor(currentShape.shapeType);

    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].column--;
    }

    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('left', trialCoordinates)) {
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
    let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
    let shapeColor = getColor(currentShape.shapeType);

    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].column++;
    }

    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('right', trialCoordinates)) {
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

  triggerPlaceShape() {
    clearTimeout(timeout);
    let uniqueColumnsOccupiedByShape = [];
    let lowestRowInEachShapeColumnArray = [];
    let lowestRowInEachShapeColumn = {};
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      if (!uniqueColumnsOccupiedByShape.includes(currentShape.coordinates[i].column)) {
        uniqueColumnsOccupiedByShape.push(currentShape.coordinates[i].column);
        lowestRowInEachShapeColumnArray.push(currentShape.coordinates[i].row);
      } else {
        let indexOfExistingColumn = uniqueColumnsOccupiedByShape.indexOf(currentShape.coordinates[i].column);
        if (currentShape.coordinates[i].row < lowestRowInEachShapeColumnArray[indexOfExistingColumn]) {
          lowestRowInEachShapeColumnArray[indexOfExistingColumn] = currentShape.coordinates[i].row;
        }
      }
    }
    for (let i = 0; i < uniqueColumnsOccupiedByShape.length; i++) {
      lowestRowInEachShapeColumn[uniqueColumnsOccupiedByShape[i]] = lowestRowInEachShapeColumnArray[i];
    }

    let highestRowInEachPlacedShapesColumn = {};
    if (Object.keys(placedShapes).length != 0) {
      let rowsOccupiedByPlacedShapes = Object.keys(placedShapes);
      for (let i = rowsOccupiedByPlacedShapes.length - 1; i >= 0; i--) {
        //Find the shape's unique columns occupied by the placed shapes
        for (let j = 0; j < uniqueColumnsOccupiedByShape.length; j++) {
          //If the shape's unique column is also occupied by the placed shapes for a particular row
          if (uniqueColumnsOccupiedByShape[j] in placedShapes[rowsOccupiedByPlacedShapes[i]]) {
            //If the shape's unique column doesn't exist in the temp object yet
            if (!(uniqueColumnsOccupiedByShape[j].toString() in highestRowInEachPlacedShapesColumn)) {
              //Create a new key-item pair (column: row) for the unique column in the temp object
              highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]] = parseInt(rowsOccupiedByPlacedShapes[i]);
            } else {
              //Compare if the new row is larger than the existing row for that unique column in the temp object
              if (parseInt(rowsOccupiedByPlacedShapes[i]) > highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]]) {
                //If the new row is larger, replace the old row with it
                highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]] = parseInt(rowsOccupiedByPlacedShapes[i]);
              }
            }
          }
        }
      }
    }
    
    //Note: Object keys are always converted to string, even if their initial assignment was int... this 
    //made me go on a 4 day long bug hunt for the spacebar feature, because I assumed the column object key 
    //was an int when it was actually a string, and js couldn't compare a string (eg: '9') to an int (eg: 10) 
    //in the if-statement
    let columns1 = Object.keys(lowestRowInEachShapeColumn);
    let smallestDistanceBetweenShapeAndPlacedShapes = rowHeight;
    if (Object.keys(highestRowInEachPlacedShapesColumn).length != 0) {
      let columns2 = Object.keys(highestRowInEachPlacedShapesColumn);
      for (let i = 0; i < columns1.length; i++) {
        for (let j = 0; j < columns2.length; j++) {
          if (columns1[i] == columns2[j]) {
            let distanceBetweenCoordinates = lowestRowInEachShapeColumn[columns1[i]] - highestRowInEachPlacedShapesColumn[columns2[j]] - 1;
            if (distanceBetweenCoordinates < smallestDistanceBetweenShapeAndPlacedShapes) {              
              smallestDistanceBetweenShapeAndPlacedShapes = distanceBetweenCoordinates;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < columns1.length; i++) {
        let distanceBetweenCoordinates = lowestRowInEachShapeColumn[columns1[i]] - 1;
        if (distanceBetweenCoordinates < smallestDistanceBetweenShapeAndPlacedShapes) {
          smallestDistanceBetweenShapeAndPlacedShapes = distanceBetweenCoordinates;
        }
      }
    }

    let shapeColor = getColor(currentShape.shapeType);
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
      //Remove labels from old coordinate
      gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
      //Remove color from old coordinate
      gridItem.style.removeProperty("background-color");
    }
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      currentShape.coordinates[i].row -= smallestDistanceBetweenShapeAndPlacedShapes;
      let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
      //Add label to new coordinate
      gridItem.classList.add(currentShape.coordinates[i].id, currentShape.rotationPhase);
      //Add color to new coordinate
      gridItem.style.backgroundColor = shapeColor;
    }

    placeShape(shapeColor);
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
