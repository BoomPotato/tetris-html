"use strict";


//Requires the global variables currentShape
//Rotates shape clockwise, 90 degrees each time
function rotateClockwise() {
  /**
   * trialCoordinates is a temporary array for testing if rotating a shape will cause it to go out of bounds of the grid.
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
  let trialCoordinates = JSON.parse(JSON.stringify(currentShape.coordinates));
  let [rotationNotation, rotationIndex] = currentShape.rotationPhase.split('');

  switch (currentShape.shapeType) {
    case "i":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        }
      } else {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 2;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    case "s":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 2;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                break;
  
              case "2":
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "4":
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        }
      } else { 
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                break;
  
              case "2":
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "4":
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 2;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    case "z":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                break;
  
              case "3":
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                break;
  
              default:
                break;
            }
          }
        }
      } else { // WIP
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                break;
  
              case "3":
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    case "l":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 2;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        }
      } else {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 2;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 1;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    case "j":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                break;
  
              default:
                break;
            }
          }
        }
      } else {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 2;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 2;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    case "t":
      if (!generateShapesVertically) {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 2;
                break;
  
              case "4":
                break;
  
              default:
                break;
            }
          }
        }
      } else {
        if (rotationIndex == 0) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row += 2;
                break;
  
              case "2":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "3":
                trialCoordinates[i].column += 2;
                break;
  
              case "4":
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 1) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                trialCoordinates[i].row -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row -= 2;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].column -= 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 2) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column += 1;
                break;
  
              case "2":
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column -= 1;
                break;
  
              case "4":
                trialCoordinates[i].row += 1;
                trialCoordinates[i].column += 1;
                break;
  
              default:
                break;
            }
          }
        } else if (rotationIndex == 3) {
          for (let i = 0; i < trialCoordinates.length; i++) {
            let [shapeType, blockIndex] = trialCoordinates[i].id.split('-');
  
            switch (blockIndex) {
              case "1":
                trialCoordinates[i].row -= 1;
                trialCoordinates[i].column -= 2;
                break;
  
              case "2":
                trialCoordinates[i].column -= 1;
                break;
  
              case "3":
                trialCoordinates[i].row += 1;
                break;
  
              case "4":
                trialCoordinates[i].row -= 1;
                break;
  
              default:
                break;
            }
          }
        }
      }
      break;

    default:
      break;
  }

  if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('rotate', trialCoordinates)) {
    rotateCoordinates(trialCoordinates);
  }
}


function rotateCoordinates(trialCoordinates) {
  incrementRotationPhase();
  clearShape(currentShape);
  for (let i = 0; i < currentShape.coordinates.length; i++) {
    //Update coordinate in global variable currentShape
    currentShape.coordinates[i].row = JSON.parse(JSON.stringify(trialCoordinates[i].row));
    currentShape.coordinates[i].column = JSON.parse(JSON.stringify(trialCoordinates[i].column));
  }
  displayShape(currentShape);
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

