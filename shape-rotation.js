"use strict";

var tempCoordinates = [];
var rotateCoordinateTrialPassed = false;


//Requires the global variables currentShape
//Rotates shape clockwise, 90 degrees each time
function rotateClockwise() {
  /**
   * tempCoordinates is a temporary array for testing if rotating a shape will cause it to go out of bounds of the grid.
   * data sample:
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
  let [rotationNotation, rotationIndex] = currentShape.rotationPhase.split('');

  switch (firstCoordinateShapeType) {
    case "i":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                //If rotate test fails for one coordinate (means that rotating the coordinate will cause 
                //it to go out of bounds, don't try to rotate the subsequent coordinates)
                break rotationLoop;
              }
              break;

            case "2":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 2;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
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
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 2;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    case "s":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    case "z":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    case "l":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    case "j":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    case "t":
      if (rotationIndex == 0) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row -= 2;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 2) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row -= 1;
              column -= 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              column -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              row += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              row -= 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      } else if (rotationIndex == 3) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < tempCoordinates.length; i++) {
          let [shapeType, blockIndex] = tempCoordinates[i].id.split('-');
          let row = tempCoordinates[i].row;
          let column = tempCoordinates[i].column;

          switch (blockIndex) {
            case "1":
              row += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "2":
              row += 1;
              column += 1;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "3":
              column += 2;
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            case "4":
              if (!(rotateCoordinateTrial(i, row, column))) {
                break rotationLoop;
              }
              break;

            default:
              break;
          }
        }
      }
      break;

    default:
      break;
  }

  if (rotateCoordinateTrialPassed) {
    rotateCoordinates(tempCoordinates);
  }
}


//DO NOT DELETE! THIS FUNCTION IS USED IN-GAME! NOT USED FOR DEBUGGING!
//Test if rotating a shape's coordinate will cause the shape to go out of bounds of the grid
function rotateCoordinateTrial(i, row, column) {
  if (((row >= 1) && (row <= rowHeight)) && ((column >= 1) && (column <= columnWidth))) {
    //Rotate coordinate in test array tempCoordinates
    tempCoordinates[i].row = JSON.parse(JSON.stringify(row));
    tempCoordinates[i].column = JSON.parse(JSON.stringify(column));
    rotateCoordinateTrialPassed = true;
    return true;
  } else {
    //Log rotation error in console, but don't show to player
    console.log("Error, cannot rotate:" + '\n' + `id: ${currentShape.coordinates[i].id}, row: ${currentShape.coordinates[i].row}, column: ${currentShape.coordinates[i].column}` + '\n' + "Because rotated coordinate falls outside grid boundaries: " + '\n' + `id: ${tempCoordinates[i].id}, row: ${row}, column: ${column}`);
    rotateCoordinateTrialPassed = false;
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
  let [rotationNotation, rotationIndex] = currentShape.rotationPhase.split('');
  if (rotationIndex == 3) {
    currentShape.rotationPhase = "r0";
  } else {
    rotationIndex++;
    currentShape.rotationPhase = `r${rotationIndex}`;
  }
}