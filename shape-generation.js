"use strict";

/**
 * shape indexes:
 * 
 * 0 - O shape (no rotation required)
 * 1 - I shape (done rotation)
 * 2 - S shape (done rotation)
 * 3 - Z shape (done rotation)
 * 4 - L shape (done rotation)
 * 5 - J shape (done rotation)
 * 6 - T shape (done rotation)
 */
var shapes = ["o", "i", "s", "z", "l", "j", "t"];

var nextRandomShape = "";


//Requires the global variable middleColumn
function generateShape(isFirstShape) {
  let shape;

  if (isFirstShape) {
    //Randomise first shape
    let randomShapeIndex = Math.floor(Math.random() * 7);
    shape = shapes[randomShapeIndex];
  } else {
    //Take the previously randomised 'next' shape as the current shape
    shape = nextRandomShape;
  }

  //Randomise next shape (will be different from current shape)
  let tempShapesArray = JSON.parse(JSON.stringify(shapes));
  tempShapesArray.splice(tempShapesArray.indexOf(shape), 1);
  let nextRandomShapeIndex = Math.floor(Math.random() * 6);
  nextRandomShape = tempShapesArray[nextRandomShapeIndex];

  //TESTING - DELETE LATER
  shape = "l";

  if (!isFirstShape) {
    //Remove image of previous 'next' shape
    let nextShapeElement = document.getElementById("nextShape");
    nextShapeElement.removeChild(nextShapeElement.getElementsByTagName('img')[0]);
  }
  document.getElementById("nextShape").appendChild(getShapeImage(nextRandomShape));

  let shapeColor = getColor(shape);
 
  //Generate shape
  switch (shape) {
    case "o":
      //O shape
      currentShape = {
        shapeType: "o",
        rotationPhase: "r0",
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
      break;

    case "i":
      //I shape
      currentShape = {
        shapeType: "i",
        rotationPhase: "r0",
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
      break;

    case "s":
      //S shape
      currentShape = {
        shapeType: "s",
        rotationPhase: "r0",
        coordinates: [
          { id: "s-1", row: rowHeight, column: middleColumn },
          { id: "s-2", row: rowHeight, column: middleColumn + 1 },
          { id: "s-3", row: rowHeight - 1, column: middleColumn - 1 },
          { id: "s-4", row: rowHeight - 1, column: middleColumn }
        ]
      };

      document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("s-1", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("s-2", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn - 1}`).classList.add("s-3", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("s-4", currentShape.rotationPhase);

      document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn - 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
      break;

    case "z":
      //Z shape
      currentShape = {
        shapeType: "z",
        rotationPhase: "r0",
        coordinates: [
          { id: "z-1", row: rowHeight, column: middleColumn - 1 },
          { id: "z-2", row: rowHeight, column: middleColumn },
          { id: "z-3", row: rowHeight - 1, column: middleColumn },
          { id: "z-4", row: rowHeight - 1, column: middleColumn + 1 }
        ]
      };

      document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).classList.add("z-1", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("z-2", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).classList.add("z-3", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).classList.add("z-4", currentShape.rotationPhase);

      document.getElementById(`grid-${rowHeight}-${middleColumn  - 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      break;

    case "l":
      //L shape
      currentShape = {
        shapeType: "l",
        rotationPhase: "r0",
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
      break;

    case "j":
      //J shape
      currentShape = {
        shapeType: "j",
        rotationPhase: "r0",
        coordinates: [
          { id: "j-1", row: rowHeight, column: middleColumn + 1 },
          { id: "j-2", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "j-3", row: rowHeight - 2, column: middleColumn + 1 },
          { id: "j-4", row: rowHeight - 2, column: middleColumn }
        ]
      };

      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("j-1", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).classList.add("j-2", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 2}-${middleColumn + 1}`).classList.add("j-3", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).classList.add("j-4", currentShape.rotationPhase);

      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 2}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
      break;
    
    case "t":
      //T shape
      currentShape = {
        shapeType: "t",
        rotationPhase: "r0",
        coordinates: [
          { id: "t-1", row: rowHeight, column: middleColumn },
          { id: "t-2", row: rowHeight, column: middleColumn + 1 },
          { id: "t-3", row: rowHeight, column: middleColumn + 2 },
          { id: "t-4", row: rowHeight - 1, column: middleColumn + 1 }
        ]
      };

      document.getElementById(`grid-${rowHeight}-${middleColumn}`).classList.add("t-1", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).classList.add("t-2", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight}-${middleColumn + 2}`).classList.add("t-3", currentShape.rotationPhase);
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).classList.add("t-4", currentShape.rotationPhase);

      document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight}-${middleColumn + 2}`).style.backgroundColor = shapeColor;
      document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
      break;

    default:
      break;
  }

  moveShapeDownByOneRow();
}