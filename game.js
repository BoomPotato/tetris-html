"use strict";

var columnSize = 10;
var rowSize = 20;

function initialiseGame() {
  //Hide game title and welcome buttons, and display score and lives
  document.getElementById("gameTitle").style.display = "none";
  document.getElementById("welcomeBtns").style.display = "none";
  document.getElementById("scoreAndNextShape").style.display = "block";

  loadGrid();

  // countdown();
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
      // let label = document.createTextNode(`${row}-${column}`);
      // gridItem.appendChild(label);

      grid.appendChild(gridItem);
      document.body.appendChild(grid);
    }
  }
}
