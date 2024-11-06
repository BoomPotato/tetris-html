"use strict";

var ghostShape = {};

function displayGhostShape() {
  if (Object.keys(ghostShape).length > 0) {
    clearShape(ghostShape);
  }

  let smallestDistanceBetweenShapeAndPlacedShapes = calculateDistanceBetweenShapeAndPlacedShapes(currentShape.coordinates);
  
  ghostShape = JSON.parse(JSON.stringify(currentShape));

  let shapeColor = getColor(ghostShape.shapeType);
  // let shapeColor = getColor('ghost');
  for (let i = 0; i < ghostShape.coordinates.length; i++) {
    ghostShape.coordinates[i].row -= smallestDistanceBetweenShapeAndPlacedShapes;

    let gridItem = document.getElementById(`grid-${ghostShape.coordinates[i].row}-${ghostShape.coordinates[i].column}`);
    //Add label to new coordinate
    gridItem.classList.add(`ghost-${ghostShape.coordinates[i].id}`, ghostShape.rotationPhase);
    //Add color to new coordinate
    gridItem.style.backgroundColor = shapeColor;

    gridItem.style.opacity = 0.5;
  }
}

