"use strict";

/**
 * Grid data structure: grid[row][column]
 * 
 * Sample:
 * [
 *    [
 *       {row: 1, column: 1},
 *       {row: 1, column: 2},
 *       {row: 1, column: 3},
 *    ],
 *    [
 *       {row: 2, column: 1},
 *       {row: 2, column: 2},
 *       {row: 1, column: 3},
 *    ]
 * ]
 */
var grid = [];

var currentShape = {
  rotationPhase: 1,
  coordinates: [
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }
  ]
}

var colorIndex = 0;
var rotationDirection = "";


function initialiseGame() {
  //Hide game title and welcome buttons, and display score and lives
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("welcomeBtns").style.display = "none";
  document.getElementById("scoreAndNextShape").style.display = "block";

  loadGrid();

  countdown();
}

/**
 * Grid id format: grid-{row}-{column}
 */
function loadGrid(){
  let grid = document.getElementById("grid");
  grid.style.setProperty("grid-template-columns", `repeat(${columnWidth}, 2vw)`);
  grid.style.setProperty("grid-template-rows", `repeat(${rowHeight}, 4.2vh)`);

  //Grid dimensions
  for (let row = rowHeight; row > 0; row--) {
    for (let column = 1; column <= columnWidth; column++) {
      let gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.setAttribute("id", `grid-${row}-${column}`);

      //Label the grid cell
      let label = document.createTextNode(`${row}-${column}`);
      gridItem.appendChild(label);

      grid.appendChild(gridItem);
      document.body.appendChild(grid);
    }
  }
}

function countdown() {
  //Unhide overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  let countdownElement = document.getElementById("countdown");
  countdownElement.innerText = "COUNTDOWN";
  let counter = countdownDuration;
  let timer = setInterval(() => {
    countdownElement.innerText = counter;
    if (counter == 0) {
      countdownElement.innerText = "START";
    }
    if (counter <= -1) {
      clearInterval(timer);
      overlay.style.display = "none";
      startGame();
    }
    counter--;
  }, 1000);
}

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
function startGame() {
  let currentShapeIndex = Math.floor(Math.random() * 7);
  let middleColumn = Math.floor(columnWidth / 2);
  let shapeColor = getColor(colorIndex);

  //Generate shape
  if (currentShapeIndex == 0) {
    //O shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "o-1", row: rowHeight, column: middleColumn }, 
        { id: "o-2", row: rowHeight, column: middleColumn + 1 }, 
        { id: "o-3", row: rowHeight - 1, column: middleColumn }, 
        { id: "o-4", row: rowHeight - 1, column: middleColumn + 1 }
      ]
    };
    
  } else if (currentShapeIndex == 1) {
    //I shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 3}-${middleColumn}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "i-1", row: rowHeight, column: middleColumn }, 
        { id: "i-2", row: rowHeight - 1, column: middleColumn }, 
        { id: "i-3", row: rowHeight - 2, column: middleColumn }, 
        { id: "i-4", row: rowHeight - 3, column: middleColumn }
      ]
    };

  } else if (currentShapeIndex == 2) {
    //S shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn - 1}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "s-1", row: rowHeight, column: middleColumn }, 
        { id: "s-2", row: rowHeight, column: middleColumn + 1 }, 
        { id: "s-3", row: rowHeight - 1, column: middleColumn }, 
        { id: "s-4", row: rowHeight - 1, column: middleColumn - 1 }
      ]
    };

  } else if (currentShapeIndex == 3) {
    //Z shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "z-1", row: rowHeight, column: middleColumn }, 
        { id: "z-2", row: rowHeight, column: middleColumn - 1 }, 
        { id: "z-3", row: rowHeight - 1, column: middleColumn }, 
        { id: "z-4", row: rowHeight - 1, column: middleColumn + 1 }
      ]
    };

  } else if (currentShapeIndex == 4) {
    //L shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn + 1}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "l-1", row: rowHeight, column: middleColumn }, 
        { id: "l-2", row: rowHeight - 1, column: middleColumn }, 
        { id: "l-3", row: rowHeight - 2, column: middleColumn }, 
        { id: "l-4", row: rowHeight - 2, column: middleColumn + 1 }
      ]
    };

  } else if (currentShapeIndex == 5) {
    //J shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 2}-${middleColumn - 1}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "j-1", row: rowHeight, column: middleColumn }, 
        { id: "j-2", row: rowHeight - 1, column: middleColumn }, 
        { id: "j-3", row: rowHeight - 2, column: middleColumn }, 
        { id: "j-4", row: rowHeight - 2, column: middleColumn - 1 }
      ]
    };

  } else if (currentShapeIndex == 6) {
    //T shape
    document.getElementById(`grid-${rowHeight}-${middleColumn}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn - 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight}-${middleColumn + 1}`).style.backgroundColor = shapeColor;
    document.getElementById(`grid-${rowHeight - 1}-${middleColumn}`).style.backgroundColor = shapeColor;

    currentShape = {
      rotationPhase: 1,
      coordinates: [
        { id: "t-1", row: rowHeight, column: middleColumn }, 
        { id: "t-2", row: rowHeight, column: middleColumn - 1 }, 
        { id: "t-3", row: rowHeight, column: middleColumn + 1 }, 
        { id: "t-4", row: rowHeight - 1, column: middleColumn }
      ]
    };

  }


  console.log("currentShape.coordinates: ", currentShape.coordinates);

  rotate(currentShape);
}