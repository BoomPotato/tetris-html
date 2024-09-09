"use strict";

var tempCoordinates = [];
var rotateCoordinateTestPassed = false;


//Requires the global variables currentShape and rotationDirection
function rotate() {
  /**
   * coordinates is a temporary array for testing if rotating a shape will cause it to go out of bounds of the grid
   * coordinates structure sample:
   * 
   * [
   *    { id: "i-1", row: 0, column: 0},
   *    { id: "i-2", row: 0, column: 0},
   *    { id: "i-3", row: 0, column: 0},
   *    { id: "i-4", row: 0, column: 0}
   * ]
   * 
   */

  //Create a deep copy of the original coordinates using JSON, in contrast to using '=' to create a reference to it
  tempCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
  let [firstCoordinateShapeType, firstCoordinateBlockIndex] = tempCoordinates[0].id.split('-');

  switch (firstCoordinateShapeType) {
    case "i":
      if (currentShape.rotationPhase == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          //TEST
          // console.log("algebra:", row, column);

          switch (blockIndex) {
            case "1":
              row -= 1;
              column += 2;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (currentShape.rotationPhase == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          //TEST
          // console.log("algebra:", row, column);

          switch (blockIndex) {
            case "1":
              row -= 2;
              column -= 2;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (currentShape.rotationPhase == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          //TEST
          // console.log("algebra:", row, column);

          switch (blockIndex) {
            case "1":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column += 2;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (currentShape.rotationPhase == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 2;
              column -= 2;
              if (!(rotateCoordinateTest(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }

      //TEST
      // console.log("======================");

      break;

    case "s":
      break;

    case "z":
      break;

    case "l":
      break;

    case "j":
      break;

    case "t":
      break;

    default:
      break;
  }

  if (rotateCoordinateTestPassed) {
    rotateCoordinates(tempCoordinates);
  }
}


//DO NOT DELETE! THIS FUNCTION IS USED IN-GAME! NOT USED FOR DEBUGGING!
//Test if rotating a shape's coordinate will cause the shape to go out of bounds of the grid
function rotateCoordinateTest(i, row, column) {

  //TEST
  // console.log(currentShape.coordinates[i]);
  // console.log(currentShape.rotationPhase);
  // console.log(i, tempCoordinates[i].row, tempCoordinates[i].column);
  // console.log(i, row, column);

  if (((row >= 1) && (row <= rowHeight)) && ((column >= 1) && (column <= columnWidth))) {
    //Rotate coordinate in test array tempCoordinates
    tempCoordinates[i].row = JSON.parse(JSON.stringify(row));
    tempCoordinates[i].column = JSON.parse(JSON.stringify(column));
    rotateCoordinateTestPassed = true;
    return true;
  } else {
    console.log("Error: cannot rotate " + tempCoordinates[i].id + ", coordinate falls outside grid boundaries");
    rotateCoordinateTestPassed = false;
    return false;
  }
}


function rotateCoordinates() {
  incrementRotationPhase();
  let shapeColor = getColor();

  for (let i = 0; i < currentShape.coordinates.length; i++) {
    let gridItem = document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`);

    //Remove labels from old coordinate
    gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
    
    //Remove color from old coordinate
    gridItem.style.removeProperty("background-color");
  }
  for (let i = 0; i < currentShape.coordinates.length; i++) {
    //Update coordinate in global variable currentShape
    currentShape.coordinates[i].row = JSON.parse(JSON.stringify(tempCoordinates[i].row));
    currentShape.coordinates[i].column = JSON.parse(JSON.stringify(tempCoordinates[i].column));

    //Add label to new coordinate
    document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`).classList.add(tempCoordinates[i].id, currentShape.rotationPhase);

    //Add color to new coordinate
    document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`).style.backgroundColor = shapeColor;
  }
}


function incrementRotationPhase() {
  if (currentShape.rotationPhase == 3) {
    currentShape.rotationPhase = 0;
  } else {
    currentShape.rotationPhase++;
  }
}