"use strict";

var columnSize = 10;
var rowSize = 20;

var countdownDuration = 5;

var currentShape = [
  {
    rotationPhase: 0
  },
  {
    coordinates: [
      { id: "s1", row: null, column: null }, 
      { id: "s2", row: null, column: null }, 
      { id: "s3", row: null, column: null }, 
      { id: "s4", row: null, column: null }
    ]
  },
  {
    pivotCoordinate: { id: "s4", row: null, column: null },
  }
];

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
  grid.style.setProperty("grid-template-columns", `repeat(${columnSize}, 2vw)`);
  grid.style.setProperty("grid-template-rows", `repeat(${rowSize}, 4.2vh)`);

  //Grid dimensions
  for (let row = rowSize; row > 0; row--) {
    for (let column = 1; column <= columnSize; column++) {
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

  let middleColumn = Math.floor(columnSize / 2);
  let pointOfGeneration = document.getElementById(`grid-${rowSize}-${middleColumn}`);
  pointOfGeneration.style.backgroundColor = "yellow";
  
  //Generate shape
  if (currentShapeIndex == 0) {
    document.getElementById(`grid-${rowSize}-${middleColumn + 1}`).style.backgroundColor = "yellow";
    document.getElementById(`grid-${rowSize - 1}-${middleColumn}`).style.backgroundColor = "yellow";
    document.getElementById(`grid-${rowSize - 1}-${middleColumn + 1}`).style.backgroundColor = "yellow";

    currentShape = [
      {
        rotationPhase: null
      },
      {
        pivotCoordinate: null
      },
      {
        coordinates: [
          { id: "o1", row: rowSize, column: middleColumn }, 
          { id: "o2", row: rowSize, column: middleColumn + 1 }, 
          { id: "o3", row: rowSize - 1, column: middleColumn }, 
          { id: "o4", row: rowSize - 1, column: middleColumn + 1 }
        ]
      }
    ];
    
  } else if (currentShapeIndex == 1) {


    currentShape = [
      {
        rotationPhase: 0
      },
      {
        pivotCoordinate: { id: "i3", row: null, column: null },
      },
      {
        coordinates: [
          { id: "i1", row: null, column: null }, 
          { id: "i2", row: null, column: null }, 
          { id: "i3", row: null, column: null }, 
          { id: "i4", row: null, column: null }
        ]
      }
    ];

  } else if (currentShapeIndex == 2) {

  } else if (currentShapeIndex == 3) {

  } else if (currentShapeIndex == 4) {

  } else if (currentShapeIndex == 5) {

  } else if (currentShapeIndex == 6) {

  }
}