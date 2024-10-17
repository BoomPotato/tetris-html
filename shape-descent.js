"use strict";

//Will be gradually shortened depending on how many lines the player has cleared. 
//Able to be temporarily overriden by the hastenDescentInterval variable.
var defaultDescentInterval = 1000;

function getDescentInterval() {
  return arrowDownKeyIsHeld ? hastenDescentInterval : defaultDescentInterval;
}

//Recursion
function moveShapeDownByOneRow() {
  setTimeout(() => {
    let shapeColor = getColor(currentShape.shapeType);

    //Check for the lowest coordinate of the shape (the coordinate closest to the bottom of the grid; the coordinate with the lowest row number)
    let lowestRowCoordinateOfShape = currentShape.coordinates[0].row;
    for (let i = 0; i < currentShape.coordinates.length; i++) {
      if (currentShape.coordinates[i].row < lowestRowCoordinateOfShape) {
        lowestRowCoordinateOfShape = currentShape.coordinates[i].row;
      }
    }

    //TEST
    // console.log("lowest coordinate of shape before descending:", lowestRowCoordinateOfShape);
  
    //If the lowest coordinate of the shape will not fall below the bottom of the grid if descended, proceed with descent
    if (lowestRowCoordinateOfShape > 1) {
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
      placeShape();
    }
    
    //TEST
    console.log(getDescentInterval());

  }, getDescentInterval());
}


// function startAutomaticDescent() {
//   let descentIntervalFunction = setInterval(function moveShapeDownByOneRow() {
//     let shapeColor = getColor(currentShape.shapeType);

//     //Check for the lowest coordinate of the shape (the coordinate closest to the bottom of the grid; the coordinate with the lowest row number)
//     let lowestRowCoordinateOfShape = currentShape.coordinates[0].row;
//     for (let i = 0; i < currentShape.coordinates.length; i++) {
//       if (currentShape.coordinates[i].row < lowestRowCoordinateOfShape) {
//         lowestRowCoordinateOfShape = currentShape.coordinates[i].row;
//       }
//     }

//     //TEST
//     // console.log("lowest coordinate of shape before descending:", lowestRowCoordinateOfShape);
  
//     //If the lowest coordinate of the shape will not fall below the bottom of the grid if descended, proceed with descent
//     if (lowestRowCoordinateOfShape > 1) {
//       for (let i = 0; i < currentShape.coordinates.length; i++) {
//         let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
      
//         //Remove labels from old coordinate
//         gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
      
//         //Remove color from old coordinate
//         gridItem.style.removeProperty("background-color");  
//       }
//       for (let i = 0; i < currentShape.coordinates.length; i++) {
//         //Update coordinate in global variable currentShape to descend by one row
//         currentShape.coordinates[i].row--;
//         let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);
    
//         //Add label to new coordinate
//         gridItem.classList.add(currentShape.coordinates[i].id, currentShape.rotationPhase);
    
//         //Add color to new coordinate
//         gridItem.style.backgroundColor = shapeColor;
//       }
//     } else {
//       clearInterval(descentIntervalFunction);
//       placeShape();
//     }
//     console.log(getDescentInterval());
//   }, getDescentInterval());
// }


function placeShape() {
  //TO DO: increase lines cleared OR score

  //PLACEHOLDERS
  console.log("finish descent");
  alert("finish descent");
}


//Called whenever a shape descends (automatically by one row; sped up via down button; instantly placed via space bar)
function checkForHorizontalMatches() {

}

