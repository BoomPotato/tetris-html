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
    let shapeColor = getColor(currentShape.shapeType);
    
    for (let i = 0; i < trialCoordinates.length; i++) {
      trialCoordinates[i].row--;
    }

    //Check if shape will go out of bounds or collide with placed shapes
    if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('down', trialCoordinates)) {
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Remove labels from old coordinate
        gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
        //Remove color from old coordinate
        gridItem.style.removeProperty("background-color");  
      }
      for (let i = 0; i < currentShape.coordinates.length; i++) {
        //Update coordinate in global variable currentShape to descend by one row
        currentShape.coordinates[i].row--;
        let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
        //Add label to new coordinate
        gridItem.classList.add(currentShape.coordinates[i].id, currentShape.rotationPhase);
        //Add color to new coordinate
        gridItem.style.backgroundColor = shapeColor;
      }
      moveShapeDownByOneRow();
    } else {
      placeShape(shapeColor);
      // clearTimeout(timeout);
    }

  }, getDescentInterval());
}


//For testing. The button under the score and next shape table uses this. Can delete later.
function stopMoveShapeDownByOneRow() {
  console.log('stopped moveShapeDownByOneRow');
  clearInterval(timeout);
}

