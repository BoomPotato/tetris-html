"use strict";

// var placedShapes = {
//   '1' (row): {
//     '2' (column): {
//       'row': '1',
//       'column': '2',
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
      break;
    
    default:
      break;
  }
}


function placeShape(shapeColor) { // BUG ;-;
  // console.log("currentShape.coordinates:", JSON.parse(JSON.stringify(currentShape.coordinates)));

  for (let i = 0; i < currentShape.coordinates.length; i++) {
    let row = currentShape.coordinates[i].row;
    let column = currentShape.coordinates[i].column;

    //TEST
    // console.log("row1:", row);

    if (!(row in placedShapes)) {
      placedShapes[row] = {};

      //TEST
      // console.log("row2:", row);
    }

    placedShapes[row][column] = {
      'row': row,
      'column': column,
      'color': shapeColor
    };

    //TEST
    // console.log("placedShapes[row][column]:", placedShapes[row][column]);
  }

  //TEST
  // console.log("placedShapes:", JSON.parse(JSON.stringify(placedShapes)));

  clearTimeout(timeout);
  generateShape();

  


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

