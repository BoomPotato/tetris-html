"use strict";

var rotationDirection = "";

/**
 * shape indexes:
 * 
 * 0 - O shape
 * 1 - I shape
 * 2 - S shape
 * 3 - Z shape
 * 4 - L shape
 * 5 - J shape
 * 6 - T shape
 */
//Requires the global variable middleColumn
function generateShape() {

  //TESTING - DELETE LATER
  let currentShapeIndex = 1;
  
  // let currentShapeIndex = Math.floor(Math.random() * 7);
  let shapeColor = getColor();

  //Generate shape
  if (currentShapeIndex == 0) {
    //O shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "o-1", row: rowHeight, column: middleColumn },
        { id: "o-2", row: rowHeight, column: middleColumn + 1 },
        { id: "o-3", row: rowHeight - 1, column: middleColumn },
        { id: "o-4", row: rowHeight - 1, column: middleColumn + 1 }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("o-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("o-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("o-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).classList.add("o-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 1) {
    //I shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "i-1", row: rowHeight, column: middleColumn },
        { id: "i-2", row: rowHeight - 1, column: middleColumn },
        { id: "i-3", row: rowHeight - 2, column: middleColumn },
        { id: "i-4", row: rowHeight - 3, column: middleColumn }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("i-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("i-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).classList.add("i-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 3}-${middleColumn}`).classList.add("i-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 3}-${middleColumn}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 2) {
    //S shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "s-1", row: rowHeight, column: middleColumn },
        { id: "s-2", row: rowHeight, column: middleColumn + 1 },
        { id: "s-3", row: rowHeight - 1, column: middleColumn },
        { id: "s-4", row: rowHeight - 1, column: middleColumn - 1 }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("s-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("s-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("s-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn - 1}`).classList.add("s-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn - 1}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 3) {
    //Z shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "z-1", row: rowHeight, column: middleColumn },
        { id: "z-2", row: rowHeight, column: middleColumn - 1 },
        { id: "z-3", row: rowHeight - 1, column: middleColumn },
        { id: "z-4", row: rowHeight - 1, column: middleColumn + 1 }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("z-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).classList.add("z-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("z-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).classList.add("z-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 4) {
    //L shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "l-1", row: rowHeight, column: middleColumn },
        { id: "l-2", row: rowHeight - 1, column: middleColumn },
        { id: "l-3", row: rowHeight - 2, column: middleColumn },
        { id: "l-4", row: rowHeight - 2, column: middleColumn + 1 }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("l-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("l-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).classList.add("l-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn + 1}`).classList.add("l-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 5) {
    //J shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "j-1", row: rowHeight, column: middleColumn },
        { id: "j-2", row: rowHeight - 1, column: middleColumn },
        { id: "j-3", row: rowHeight - 2, column: middleColumn },
        { id: "j-4", row: rowHeight - 2, column: middleColumn - 1 }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("j-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("j-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).classList.add("j-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn - 1}`).classList.add("j-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn - 1}`).style.backgroundColor = shapeColor;

  } else if (currentShapeIndex == 6) {
    //T shape
    currentShape = {
      rotationPhase: 0,
      colorIndex: 0,
      coordinates: [
        { id: "t-1", row: rowHeight, column: middleColumn },
        { id: "t-2", row: rowHeight, column: middleColumn - 1 },
        { id: "t-3", row: rowHeight, column: middleColumn + 1 },
        { id: "t-4", row: rowHeight - 1, column: middleColumn }
      ]
    };

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("t-1", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).classList.add("t-2", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("t-3", currentShape.rotationPhase);
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("t-4", currentShape.rotationPhase);

    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;

  }

  activateTankControls();
}