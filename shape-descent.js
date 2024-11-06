"use strict";

var timeout;


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
      //TESTING
      displayGhostShape();

      displayShape(currentShape);

      moveShapeDownByOneRow();
    } else {
      placeShape(currentShape);
      
      if (!gameModeGoalReached) {
        generateShape(false);
      } else {
        gameOver();
      }
    }

  }, getDescentInterval());
}


//For testing. The button under the score and next shape table uses this. Can delete later.
function stopMoveShapeDownByOneRow() {
  clearInterval(timerInterval);
  console.log('stopped moveShapeDownByOneRow');
  clearInterval(timeout);
}

