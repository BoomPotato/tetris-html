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
var currentTime;

var gameMode = {};

var timerInterval;


function populateGameModeForm() {
  let unparsedGameModes = localStorage.getItem('gameModes');
  if (unparsedGameModes != null) {
    let gameModes = JSON.parse(unparsedGameModes);

    let gameModesKeys = Object.keys(gameModes);
    for (let i = 0; i < gameModesKeys.length; i++) {

      if (gameModes[gameModesKeys[i]]['selected'] == true) {
        document.getElementById(gameModesKeys[i]).checked = true;
      } else {
        document.getElementById(gameModesKeys[i]).checked = false;
      }

      if (gameModesKeys[i] != "endlessMode") {
        document.getElementById(`${gameModesKeys[i]}Value`).value = gameModes[gameModesKeys[i]]['value'];
      }
    }

  }
}


function setGameMode() {
  let formGameMode = document.querySelector('input[name="gameMode"]:checked').value;
  let radioButtons = document.querySelectorAll('input[type="radio"]');

  let gameModes = {};
  for (let i = 0; i < radioButtons.length; i++) {
    
    gameModes[radioButtons[i].id] = {};
    if (radioButtons[i].id == formGameMode) {
      gameModes[radioButtons[i].id]['selected'] = true;
    } else {
      gameModes[radioButtons[i].id]['selected'] = false;
    }

    if (radioButtons[i].id != "endlessMode") {
      let gameModeValue = document.getElementById(`${radioButtons[i].id}Value`).value;
      gameModes[radioButtons[i].id]['value'] = gameModeValue;
    }
  }

  if (localStorage.getItem('gameModes') != null) {
    localStorage.removeItem('gameModes');
  }
  localStorage.setItem('gameModes', JSON.stringify(gameModes));

  alert("Game mode set!");
}


function initialiseGame() {
  //Implement customisation
  let unparsedCustomisation = localStorage.getItem('customisation');
  if (unparsedCustomisation != null) {
    let customisation = JSON.parse(unparsedCustomisation);
    rowHeight = customisation.rowHeight;
    columnWidth = customisation.columnWidth;
    if (customisation.generateShapesHorizontally == "false") {
      generateShapesHorizontally = false;
    } else {
      generateShapesHorizontally = true;
    }
    if (customisation.enableGhostShape == "false") {
      enableGhostShape = false;
    } else {
      enableGhostShape = true;
    }
    defaultDescentInterval = customisation.defaultDescentInterval;
    hastenDescentInterval = customisation.hastenDescentInterval;
    colors = customisation.colors;
  }

  //Implement game mode
  let unparsedGameModes = localStorage.getItem('gameModes');
  if (unparsedGameModes != null) {
    let gameModes = JSON.parse(unparsedGameModes);
    let gameModesKeys = Object.keys(gameModes);
    
    for (let i = 0; i < gameModesKeys.length; i++) {
      if (gameModes[gameModesKeys[i]]['selected'] == true) {
        gameMode['gameMode'] = gameModesKeys[i];
        if (gameModesKeys[i] != "endlessMode") {
          gameMode['value'] = gameModes[gameModesKeys[i]]['value'];
        }
      }
    }

    if (gameMode['gameMode'] == "endlessMode") {
      document.getElementById("goalsToReach").style.display = "none";
    } else {
      document.getElementById(`${gameMode['gameMode']}ValueLabel`).innerText = gameMode['value'];
      let goals = document.getElementById('goalsToReach').getElementsByTagName('tr');
      for (let i = 0; i < goals.length; i++) {
        if (goals[i].id.toLowerCase().indexOf((`${gameMode['gameMode']}ValueLabel`).toLowerCase()) == -1) {
          document.getElementById(goals[i].id).style.display = "none";
        }
      }
    }
  } else {
    document.getElementById("goalsToReach").style.display = "none";
  }

  loadGrid();
  // countdown();
  generateShape(true);
  activateControls();
  activateGamepad();
  gameStartTime = Date.now();

  //Timer
  timerInterval = setInterval(() => {
    currentTime = Date.now();
    document.getElementById("timer").innerText = calculateGameDuration();
  }, 0);
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
  clearInterval(timerInterval);
  clearInterval(gamepadInterval);

  deactivateControls();
  deactivateGamepad();

  saveResultsToLocalStorage();

  //Show game over alert. To be replaced with game over screen later.
  alert("Game over! Your results have been saved!");
}


//https://stackoverflow.com/questions/8302166/dynamic-creation-of-table-with-dom
function showPastResults() {  
  let pastResults = JSON.parse(localStorage.getItem("pastResults"));
  
  if (pastResults == null) {
    document.getElementById("noPastResultsMsg").style.display = "flex";
  } else {
    document.getElementById("rowPastResults").style.display = "flex";
    let table = document.getElementById("pastResults");
    let indexCounter = pastResults.length + 1;
    for (let i = pastResults.length - 1; i >= 0; i--) {
      indexCounter--;
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

