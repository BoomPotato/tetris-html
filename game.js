"use strict";

var middleColumn;

// var currentShape = {
//   shapeType: "o",
//   rotationPhase: "r0",
//   coordinates: [
//     { id: "", row: null, column: null }, 
//     { id: "", row: null, column: null }, 
//     { id: "", row: null, column: null }, 
//     { id: "", row: null, column: null }
//   ]
// };
var currentShape = {};

var gameStartTime;
var gameEndTime;


function initialiseGame() {
  loadGrid();
  // countdown();
  generateShape(true);
  activateControls();
  gameStartTime = Date.now();
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


function gameOver() {
  //Placeholder
  console.log("GAME OVER!");
  
  //Deactivate controls
  document.body.removeEventListener("keydown", keyHandler);
  document.body.removeEventListener("keyup", keyHandler);

  saveResultsToLocalStorage();
}


//https://stackoverflow.com/questions/8302166/dynamic-creation-of-table-with-dom
function showPastResults() {  
  let pastResults = JSON.parse(localStorage.getItem("pastResults"));
  
  if (pastResults == null) {
    document.getElementById("noPastResultsMsg").style.display = "flex";
  } else {
    document.getElementById("rowPastResults").style.display = "flex";
    let table = document.getElementById("pastResults");
    let indexCounter = 0;
    for (let i = 0; i < pastResults.length; i++) {
      indexCounter++;
      let tr = document.createElement("tr");

      let thHeaders = document.getElementById("pastResultsTableHeaders").getElementsByTagName("th");
      let keys = Object.keys(pastResults[i]);
      for (let j = 0; j < thHeaders.length; j++) {
        let td = document.createElement("td");
        td.id = `${thHeaders[j].id}-${indexCounter}`;
        td.style.fontSize = "1em";
        td.style.textAlign = "center";
        if (thHeaders[j].id == "index") {
          let text = document.createTextNode(indexCounter);
          td.appendChild(text);
        } else if (keys.includes(thHeaders[j].id)) {
          let text = document.createTextNode(pastResults[i][thHeaders[j].id]);
          td.appendChild(text);
        }
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }
  }
}

