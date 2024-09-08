"use strict";

function rotate(currentShape, rotationDirection) {
  /**
   * coordinates is a temporary array for testing if rotating a shape will cause it to go out of bounds of the grid
   * coordinates structure sample:
   * 
   * New:
   * [
   *    { id: "i-1", row: 0, column: 0},
   *    { id: "i-2", row: 0, column: 0},
   *    { id: "i-3", row: 0, column: 0},
   *    { id: "i-4", row: 0, column: 0}
   * ]
   * 
   * 
   * Old:
   * [
   *    { id: "i-1", row: 0, column: 0, rotationTestPassed: false},
   *    { id: "i-2", row: 0, column: 0, rotationTestPassed: true},
   *    { id: "i-3", row: 0, column: 0, rotationTestPassed: true},
   *    { id: "i-4", row: 0, column: 0, rotationTestPassed: true}
   * ]
   * 
   */
  let coordinates = currentShape.coordinates;
  let [firstCoordinateShapeType, firstCoordinateBlockIndex] = coordinates[0].id.split('-');
  let rotationPhase = currentShape.rotationPhase;
  let rotateCoordinateTestPassed;

  switch (firstCoordinateShapeType) {
    case "o":
      break;

    case "i":
      if (rotationPhase == 1) {
        //JavaScript label
        rotationLoop:
        for (let i = 0; i < coordinates.length; i++) {
          let [shapeType, blockIndex] = coordinates[i].id.split('-');
          let row = coordinates[i].row;
          let column = coordinates[i].column;

          if (rotationDirection == "clockwise") {
            switch (blockIndex) {
              case "1":
                row -= 1;
                column += 1;
                if (!(rotateCoordinateTest(i, row, column))) {
                  break rotationLoop;
                }
                break;

              case "2":
                break;
  
              case "3":
                row += 1;
                column -= 1;
                if (!(rotateCoordinateTest(i, row, column))) {
                  break rotationLoop;
                }
                break;
  
              case "4":
                row += 2;
                column -= 2;
                if (!(rotateCoordinateTest(i, row, column))) {
                  break rotationLoop;
                }
                break;

              default:
                console.log("Error in blockIndex switch case")
                break;
            }
          } else if (rotationDirection == "anticlockwise") {
            
          }

        }

      } else if (rotationPhase == 2) {

      } else if (rotationPhase == 3) {

      } else if (rotationPhase == 4) {

      }

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
    rotateCoordinates(coordinates);
  }
}


function rotateCoordinateTest(i, row, column) {
  if (((row >= 1) && (row <= rowHeight)) && 
  ((column >= 1) && (column <= columnWidth))) {
    //Rotate coordinate in temp array "coordinates"
    coordinates[i].row = row;
    coordinates[i].column = column;
    rotationTestPassed = true;
    return true;
  } else {
    console.log("Error: cannot rotate" + coordinates[i] + ", one or more coordinates fall outside play area");
    rotationTestPassed = false;
    return false;
  }
}


function rotateCoordinates(coordinates) {
  for (let i = 0; i < currentShape.coordinates.length; i++) {
    //Remove color from old coordinate
    document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`).removeAttribute('style');

    //Update coordinate in global variable currentShape
    currentShape.coordinates[i].row = coordinates[i].row;
    currentShape.coordinates[i].column = coordinates[i].column;

    //Add color to new coordinate
    document.getElementById(`grid-${currentShape.coordinates[i].row}-${currentShape.coordinates[i].column}`).style.backgroundColor = shapeColor;
  }

}
