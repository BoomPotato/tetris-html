"use strict";

var timeout;

//TO DO: Will be gradually shortened depending on how many lines the player has cleared. 
//Able to be temporarily overriden by the hastenDescentInterval variable.
var defaultDescentInterval = 1000;


function getDescentInterval() {
  //Conditional (ternary) operator
  return arrowDownKeyIsHeld ? hastenDescentInterval : defaultDescentInterval;
}


//Recursion
function moveShapeDownByOneRow() {
  timeout = setTimeout(() => {
    let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
    
    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].row--;
    }

    //Check if shape will go out of bounds or collide with placed shapes
    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('down', trialCoordinates)) {
      clearShape(currentShape);
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        //Update coordinate in global variable currentShape to descend by one row
        currentShape.coordinates[i].row--;
      }
      displayShape(currentShape);

      moveShapeDownByOneRow();
    } else {
      placeShape(currentShape);
      generateShape(false);
    }

  }, getDescentInterval());
}


//For testing. The button under the score and next shape table uses this. Can delete later.
function stopMoveShapeDownByOneRow() {
  console.log('stopped moveShapeDownByOneRow');
  clearInterval(timeout);
}

