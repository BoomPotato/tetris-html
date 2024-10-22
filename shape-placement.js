"use strict";

// var placedShapes = {
//   '1' (row): {
//     '2' (column): {
//       'row': 1,
//       'column': 2,
//       'color': 'yellow'
//     }
//   }
// };
var placedShapes = {};


//Check if the shape will move out of bounds or collide with placed shapes
function checkIfOutOfBoundsOrCollidesWithPlacedShapes(shapeMovement, trialCoordinates) {
  switch (shapeMovement) {
    case 'left':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed left boundary
        if (trialCoordinates[i].column >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;
    
    case 'right':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed right boundary
        if (trialCoordinates[i].column <= columnWidth) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;
    
    case 'down':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed bottom boundary
        if (trialCoordinates[i].row >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;
    
    case 'rotate':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed left, right, or bottom boundary
        if ((trialCoordinates[i].column >= 1 && trialCoordinates[i].column <= columnWidth) && trialCoordinates[i].row >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;

    case 'generate':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will collide with placed shapes
        if (trialCoordinates[i].row in placedShapes) {
          if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
            return true;
          }
        }
      }
      return false;
      break;
    
    default:
      break;
  }
}


function calculateDistanceBetweenShapeAndPlacedShapes(shapeCoordinates) {
  let uniqueColumnsOccupiedByShape = [];
  let lowestRowInEachShapeColumnArray = [];
  let lowestRowInEachShapeColumn = {};
  for (let i = 0; i < shapeCoordinates.length; i++) {
    if (!uniqueColumnsOccupiedByShape.includes(shapeCoordinates[i].column)) {
      uniqueColumnsOccupiedByShape.push(shapeCoordinates[i].column);
      lowestRowInEachShapeColumnArray.push(shapeCoordinates[i].row);
    } else {
      let indexOfExistingColumn = uniqueColumnsOccupiedByShape.indexOf(shapeCoordinates[i].column);
      if (shapeCoordinates[i].row < lowestRowInEachShapeColumnArray[indexOfExistingColumn]) {
        lowestRowInEachShapeColumnArray[indexOfExistingColumn] = shapeCoordinates[i].row;
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

  return smallestDistanceBetweenShapeAndPlacedShapes;
}


function placeShape(shapeCoordinates, shapeColor) {
  for (let i = 0; i < shapeCoordinates.length; i++) {
    let row = shapeCoordinates[i].row;
    let column = shapeCoordinates[i].column;

    if (!(row in placedShapes)) {
      placedShapes[row] = {};
    }

    placedShapes[row][column] = {
      'row': row,
      'column': column,
      'color': shapeColor
    };
  }

  //TO DO: increase lines cleared OR score if there are full rows

}


//Called whenever a shape descends (automatically by one row; sped up via down button; instantly placed via space bar)
function checkForHorizontalMatches() {
}


//For casual play, only takes into account how many lines are cleared; no extra points for clearing multiple rows at once
function increaseLinesCleared() {
}


//For competitive play; extra points for clearing multiple rows at once
function increaseScore() {
}

