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
 *       {row: 2, column: 3},
 *    ]
 * ]
 */
var grid = [];
var middleColumn;

var currentShape = {
  shapeType: "o",
  rotationPhase: "r0",
  coordinates: [
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }, 
    { id: "", row: null, column: null }
  ]
};


function initialiseGame() {
  //Hide game title and welcome buttons, and display score and lives
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("welcomeBtns").style.display = "none";
  document.getElementById("scoreAndNextShape").style.display = "block";

  loadGrid();
  // countdown();
  generateShape(true);
  startGame();
}


/**
 * Grid id format: grid-{row}-{column}
 */
function loadGrid() {
  middleColumn = Math.floor(columnWidth / 2);
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
    }
  }
}


function startGame() {
  activateControls();
  // moveShapeDownByOneRow();
}


function countdown() {
  //Unhide overlay
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  let countdown = document.getElementById("countdown");
  countdown.innerText = "COUNTDOWN";
  let counter = countdownDuration;
  let timer = setInterval(() => {
    countdown.innerText = counter;
    if (counter == 0) {
      countdown.innerText = "START";
    }
    if (counter <= -1) {
      clearInterval(timer);
      overlay.style.display = "none";
      startGame();
    }
    counter--;
  }, 1000);
}

