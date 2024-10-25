"use strict";

/**
 * shape indexes:
 * 
 * 0 - O shape (not rotatable)
 * 1 - I shape (rotatable)
 * 2 - S shape (rotatable)
 * 3 - Z shape (rotatable)
 * 4 - L shape (rotatable)
 * 5 - J shape (rotatable)
 * 6 - T shape (rotatable)
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
  // shape = changeShape();

  if (!isFirstShape) {
    //Remove image of previous 'next' shape
    let nextShapeElement = document.getElementById("nextShape");
    nextShapeElement.removeChild(nextShapeElement.getElementsByTagName('img')[0]);
  }
  document.getElementById("nextShape").appendChild(getShapeImage(nextRandomShape));

  let trialCoordinates = [];
  let rotationPhase = "";
 
  //Generate shape
  switch (shape) {
    //O shape
    case "o":
      trialCoordinates = [
        { id: "o-1", row: rowHeight, column: middleColumn },
        { id: "o-2", row: rowHeight, column: middleColumn + 1 },
        { id: "o-3", row: rowHeight - 1, column: middleColumn },
        { id: "o-4", row: rowHeight - 1, column: middleColumn + 1 }
      ];

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "o",
          rotationPhase: "r0",
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
        let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
        let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
        let heightOfShape = 2;
        let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

        switch (numberOfRowsToGenerate) {
          case 1:
            currentShape = {
              shapeType: "o",
              rotationPhase: "r0",
              coordinates: [
                { id: "o-3", row: rowHeight, column: middleColumn },
                { id: "o-4", row: rowHeight, column: middleColumn + 1 }
              ]
            };

            displayShape(currentShape);
            placeShape(currentShape);
            gameOver();
            return;

          default:
            gameOver();
            return;
        }
      }
      break;

    //I shape
    case "i":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "i-1", row: rowHeight, column: middleColumn - 1 },
          { id: "i-2", row: rowHeight, column: middleColumn },
          { id: "i-3", row: rowHeight, column: middleColumn + 1 },
          { id: "i-4", row: rowHeight, column: middleColumn + 2}
        ];
        rotationPhase = "r3";
      } else {
        trialCoordinates = [
          { id: "i-1", row: rowHeight, column: middleColumn },
          { id: "i-2", row: rowHeight - 1, column: middleColumn },
          { id: "i-3", row: rowHeight - 2, column: middleColumn },
          { id: "i-4", row: rowHeight - 3, column: middleColumn }
        ];
        rotationPhase = "r0";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "i",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) {
          gameOver();
          return;
        } else {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 4;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "i",
                rotationPhase: "r0",
                coordinates: [
                  { id: "i-4", row: rowHeight, column: middleColumn }
                ]
              };
  
              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;
  
            case 2:
              currentShape = {
                shapeType: "i",
                rotationPhase: "r0",
                coordinates: [
                  { id: "i-3", row: rowHeight, column: middleColumn },
                  { id: "i-4", row: rowHeight - 1, column: middleColumn }
                ]
              };
  
              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;
  
            case 3:
              currentShape = {
                shapeType: "i",
                rotationPhase: "r0",
                coordinates: [
                  { id: "i-2", row: rowHeight, column: middleColumn },
                  { id: "i-3", row: rowHeight - 1, column: middleColumn },
                  { id: "i-4", row: rowHeight - 2, column: middleColumn }
                ]
              };
  
              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;
  
            default:
              gameOver();
              return;
          }
        }
      }
      break;

    //S shape
    case "s":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "s-1", row: rowHeight, column: middleColumn },
          { id: "s-2", row: rowHeight, column: middleColumn + 1 },
          { id: "s-3", row: rowHeight - 1, column: middleColumn - 1 },
          { id: "s-4", row: rowHeight - 1, column: middleColumn }
        ];
        rotationPhase = "r0";
      } else {
        trialCoordinates = [
          { id: "s-2", row: rowHeight, column: middleColumn },
          { id: "s-1", row: rowHeight - 1, column: middleColumn },
          { id: "s-4", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "s-3", row: rowHeight - 2, column: middleColumn + 1 }
        ];
        rotationPhase = "r3";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "s",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 2;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "s",
                rotationPhase: "r0",
                coordinates: [
                  { id: "s-3", row: rowHeight, column: middleColumn - 1 },
                  { id: "s-4", row: rowHeight, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        } else {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 3;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "s",
                rotationPhase: "r3",
                coordinates: [
                  { id: "s-3", row: rowHeight, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            case 2:
              currentShape = {
                shapeType: "s",
                rotationPhase: "r3",
                coordinates: [
                  { id: "s-1", row: rowHeight, column: middleColumn },
                  { id: "s-4", row: rowHeight, column: middleColumn + 1 },
                  { id: "s-3", row: rowHeight - 1, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        }
      }
      break;

    //Z shape
    case "z":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "z-1", row: rowHeight, column: middleColumn - 1 },
          { id: "z-2", row: rowHeight, column: middleColumn },
          { id: "z-3", row: rowHeight - 1, column: middleColumn },
          { id: "z-4", row: rowHeight - 1, column: middleColumn + 1 }
        ];
        rotationPhase = "r0";
      } else {
        trialCoordinates = [
          { id: "z-4", row: rowHeight, column: middleColumn + 1 },
          { id: "z-3", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "z-2", row: rowHeight - 1, column: middleColumn },
          { id: "z-1", row: rowHeight - 2, column: middleColumn }
        ];
        rotationPhase = "r3";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "z",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 2;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "z",
                rotationPhase: "r0",
                coordinates: [
                  { id: "z-3", row: rowHeight, column: middleColumn },
                  { id: "z-4", row: rowHeight, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        } else { 
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 3;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "z",
                rotationPhase: "r3",
                coordinates: [
                  { id: "z-1", row: rowHeight, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            case 2:
              currentShape = {
                shapeType: "z",
                rotationPhase: "r3",
                coordinates: [
                  { id: "z-3", row: rowHeight, column: middleColumn + 1 },
                  { id: "z-2", row: rowHeight, column: middleColumn },
                  { id: "z-1", row: rowHeight - 1, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        }
      }
      break;

    //L shape
    case "l":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "l-4", row: rowHeight, column: middleColumn + 2 },
          { id: "l-1", row: rowHeight - 1, column: middleColumn },
          { id: "l-2", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "l-3", row: rowHeight - 1, column: middleColumn + 2 }
        ];
        rotationPhase = "r3";
      } else {
        trialCoordinates = [
          { id: "l-1", row: rowHeight, column: middleColumn },
          { id: "l-2", row: rowHeight - 1, column: middleColumn },
          { id: "l-3", row: rowHeight - 2, column: middleColumn },
          { id: "l-4", row: rowHeight - 2, column: middleColumn + 1 }
        ];
        rotationPhase = "r0";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "l",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) { 
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 2;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "l",
                rotationPhase: "r3",
                coordinates: [
                  { id: "l-1", row: rowHeight, column: middleColumn },
                  { id: "l-2", row: rowHeight, column: middleColumn + 1 },
                  { id: "l-3", row: rowHeight, column: middleColumn + 2 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        } else {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 3;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "l",
                rotationPhase: "r0",
                coordinates: [
                  { id: "l-3", row: rowHeight, column: middleColumn },
                  { id: "l-4", row: rowHeight, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            case 2:
              currentShape = {
                shapeType: "l",
                rotationPhase: "r0",
                coordinates: [
                  { id: "l-2", row: rowHeight, column: middleColumn },
                  { id: "l-3", row: rowHeight - 1, column: middleColumn },
                  { id: "l-4", row: rowHeight - 1, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        }
      }
      break;

    //J shape
    case "j":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "j-4", row: rowHeight, column: middleColumn },
          { id: "j-3", row: rowHeight - 1, column: middleColumn },
          { id: "j-2", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "j-1", row: rowHeight - 1, column: middleColumn + 2 }
        ];
        rotationPhase = "r1";
      } else {
        trialCoordinates = [
          { id: "j-1", row: rowHeight, column: middleColumn + 1 },
          { id: "j-2", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "j-3", row: rowHeight - 2, column: middleColumn + 1 },
          { id: "j-4", row: rowHeight - 2, column: middleColumn }
        ];
        rotationPhase = "r0";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "j",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 2;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "j",
                rotationPhase: "r1",
                coordinates: [
                  { id: "j-3", row: rowHeight, column: middleColumn },
                  { id: "j-2", row: rowHeight, column: middleColumn + 1 },
                  { id: "j-1", row: rowHeight, column: middleColumn + 2 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        } else {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 3;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "j",
                rotationPhase: "r0",
                coordinates: [
                  { id: "j-3", row: rowHeight, column: middleColumn + 1 },
                  { id: "j-4", row: rowHeight, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            case 2:
              currentShape = {
                shapeType: "j",
                rotationPhase: "r0",
                coordinates: [
                  { id: "j-2", row: rowHeight, column: middleColumn + 1 },
                  { id: "j-3", row: rowHeight - 1, column: middleColumn + 1 },
                  { id: "j-4", row: rowHeight - 1, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        }
      }
      break;
    
    //T shape
    case "t":
      if (generateShapesHorizontally) {
        trialCoordinates = [
          { id: "t-1", row: rowHeight, column: middleColumn },
          { id: "t-2", row: rowHeight, column: middleColumn + 1 },
          { id: "t-3", row: rowHeight, column: middleColumn + 2 },
          { id: "t-4", row: rowHeight - 1, column: middleColumn + 1 }
        ];
        rotationPhase = "r0";
      } else {
        trialCoordinates = [
          { id: "t-3", row: rowHeight, column: middleColumn },
          { id: "t-2", row: rowHeight - 1, column: middleColumn },
          { id: "t-4", row: rowHeight - 1, column: middleColumn + 1 },
          { id: "t-1", row: rowHeight - 2, column: middleColumn }
        ];
        rotationPhase = "r3";
      }

      if (!checkIfOutOfBoundsOrCollidesWithPlacedShapes('generate', trialCoordinates)) {
        currentShape = {
          shapeType: "t",
          rotationPhase: rotationPhase,
          coordinates: trialCoordinates
        };

        displayShape(currentShape);
      } else {
        if (generateShapesHorizontally) {
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 2;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "t",
                rotationPhase: "r0",
                coordinates: [
                  { id: "t-4", row: rowHeight, column: middleColumn + 1 }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        } else { 
          //The smallestDistanceBetweenShapeAndPlacedShapes returned here should be negative, since the shapes overlap
          let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(trialCoordinates);
          let numberOfOverlappingCoordinates = Math.abs(smallestDistanceBetweenShapeAndPlacedShapes);
          let heightOfShape = 3;
          let numberOfRowsToGenerate = heightOfShape - numberOfOverlappingCoordinates;

          switch (numberOfRowsToGenerate) {
            case 1:
              currentShape = {
                shapeType: "t",
                rotationPhase: "r3",
                coordinates: [
                  { id: "t-1", row: rowHeight, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;
            
            case 2:
              currentShape = {
                shapeType: "t",
                rotationPhase: "r3",
                coordinates: [
                  { id: "t-2", row: rowHeight, column: middleColumn },
                  { id: "t-4", row: rowHeight, column: middleColumn + 1 },
                  { id: "t-1", row: rowHeight - 1, column: middleColumn }
                ]
              };

              displayShape(currentShape);
              placeShape(currentShape);
              gameOver();
              return;

            default:
              gameOver();
              return;
          }
        }
      }
      break;

    default:
      break;
  }

  moveShapeDownByOneRow();
}


function displayShape(shape) {
  let shapeColor = getColor(shape.shapeType);
  for (let i = 0; i < shape.coordinates.length; i++) {
    let gridItem = document.getElementById(`grid-${shape.coordinates[i].row}-${shape.coordinates[i].column}`);
    //Add label to new coordinate
    gridItem.classList.add(shape.coordinates[i].id, shape.rotationPhase);
    //Add color to new coordinate
    gridItem.style.backgroundColor = shapeColor;
  }
}


function clearShape(shape) {
  for (let i = 0; i < shape.coordinates.length; i++) {
    let gridItem = document.getElementById(`grid-${shape.coordinates[i].row}-${shape.coordinates[i].column}`);
    //Remove labels from old coordinate
    gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
    //Remove color from old coordinate
    gridItem.style.removeProperty("background-color");  
  }
}

