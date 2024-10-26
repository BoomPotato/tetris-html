"use strict";

var placedShapes = {};
var totalLinesCleared = 0;
var totalScore = 0;

var singleLinesCleared = 0;
var doubleLinesCleared = 0;
var tripleLinesCleared = 0;
var tetrisLinesCleared = 0;


//Check if the shape will move out of bounds or collide with placed shapes
function checkIfOutOfBoundsOrCollidesWithPlacedShapes(shapeMovement, trialCoordinates) {
  switch (shapeMovement) {
    case 'left':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed left boundary
        if (trialCoordinates[i].column >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;

    case 'right':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed right boundary
        if (trialCoordinates[i].column <= columnWidth) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;

    case 'down':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed bottom boundary
        if (trialCoordinates[i].row >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;

    case 'rotate':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will not exceed left, right, top, or bottom boundary
        if (((trialCoordinates[i].column >= 1 && trialCoordinates[i].column <= columnWidth) && trialCoordinates[i].row <= rowHeight) && trialCoordinates[i].row >= 1) {
          //If shape will collide with placed shapes
          if (trialCoordinates[i].row in placedShapes) {
            if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      return false;
      break;

    case 'generate':
      for (let i = 0; i < trialCoordinates.length; i++) {
        //If shape will collide with placed shapes
        if (trialCoordinates[i].row in placedShapes) {
          if (trialCoordinates[i].column in placedShapes[trialCoordinates[i].row]) {
            return true;
          }
        }
      }
      return false;
      break;

    default:
      break;
  }
}


function calculateDistanceBetweenShapeAndPlacedShapes(shapeCoordinates) {
  let uniqueColumnsOccupiedByShape = [];
  let lowestRowInEachShapeColumnArray = [];
  let lowestRowInEachShapeColumn = {};
  for (let i = 0; i < shapeCoordinates.length; i++) {
    if (!uniqueColumnsOccupiedByShape.includes(shapeCoordinates[i].column)) {
      uniqueColumnsOccupiedByShape.push(shapeCoordinates[i].column);
      lowestRowInEachShapeColumnArray.push(shapeCoordinates[i].row);
    } else {
      let indexOfExistingColumn = uniqueColumnsOccupiedByShape.indexOf(shapeCoordinates[i].column);
      if (shapeCoordinates[i].row < lowestRowInEachShapeColumnArray[indexOfExistingColumn]) {
        lowestRowInEachShapeColumnArray[indexOfExistingColumn] = shapeCoordinates[i].row;
      }
    }
  }
  for (let i = 0; i < uniqueColumnsOccupiedByShape.length; i++) {
    lowestRowInEachShapeColumn[uniqueColumnsOccupiedByShape[i]] = lowestRowInEachShapeColumnArray[i];
  }

  let highestRowInEachPlacedShapesColumn = {};
  if (Object.keys(placedShapes).length != 0) {
    let rowsOccupiedByPlacedShapes = Object.keys(placedShapes);
    for (let i = rowsOccupiedByPlacedShapes.length - 1; i >= 0; i--) {
      //Find the shape's unique columns occupied by the placed shapes
      for (let j = 0; j < uniqueColumnsOccupiedByShape.length; j++) {
        //If the shape's unique column is also occupied by the placed shapes for a particular row
        if (uniqueColumnsOccupiedByShape[j] in placedShapes[rowsOccupiedByPlacedShapes[i]]) {
          //If the shape's unique column doesn't exist in the temp object yet
          if (!(uniqueColumnsOccupiedByShape[j].toString() in highestRowInEachPlacedShapesColumn)) {
            //Create a new key-item pair (column: row) for the unique column in the temp object
            highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]] = parseInt(rowsOccupiedByPlacedShapes[i]);
          } else {
            //Compare if the new row is larger than the existing row for that unique column in the temp object
            if (parseInt(rowsOccupiedByPlacedShapes[i]) > highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]]) {
              //If the new row is larger, replace the old row with it
              highestRowInEachPlacedShapesColumn[uniqueColumnsOccupiedByShape[j]] = parseInt(rowsOccupiedByPlacedShapes[i]);
            }
          }
        }
      }
    }
  }

  //Note: Object keys are always converted to string, even if their initial assignment was int... this 
  //made me go on a 4 day long bug hunt for the spacebar feature, because I assumed the column object key 
  //was an int when it was actually a string, and js couldn't compare a string (eg: '9') to an int (eg: 10) 
  //in the if-statement
  let columns1 = Object.keys(lowestRowInEachShapeColumn);
  let smallestDistanceBetweenShapeAndPlacedShapes = rowHeight;
  if (Object.keys(highestRowInEachPlacedShapesColumn).length != 0) {
    let columns2 = Object.keys(highestRowInEachPlacedShapesColumn);
    for (let i = 0; i < columns1.length; i++) {
      for (let j = 0; j < columns2.length; j++) {
        if (columns1[i] == columns2[j]) {
          let distanceBetweenCoordinates = lowestRowInEachShapeColumn[columns1[i]] - highestRowInEachPlacedShapesColumn[columns2[j]] - 1;
          if (distanceBetweenCoordinates < smallestDistanceBetweenShapeAndPlacedShapes) {
            smallestDistanceBetweenShapeAndPlacedShapes = distanceBetweenCoordinates;
          }
        }
      }
    }
  } else {
    for (let i = 0; i < columns1.length; i++) {
      let distanceBetweenCoordinates = lowestRowInEachShapeColumn[columns1[i]] - 1;
      if (distanceBetweenCoordinates < smallestDistanceBetweenShapeAndPlacedShapes) {
        smallestDistanceBetweenShapeAndPlacedShapes = distanceBetweenCoordinates;
      }
    }
  }

  return smallestDistanceBetweenShapeAndPlacedShapes;
}


function placeShape(shape) {
  let shapeColor = getColor(shape.shapeType);
  for (let i = 0; i < shape.coordinates.length; i++) {
    let row = shape.coordinates[i].row;
    let column = shape.coordinates[i].column;

    if (!(row in placedShapes)) {
      placedShapes[row] = {};
    }

    placedShapes[row][column] = {
      'row': row,
      'column': column,
      'color': shapeColor,
      'shapeType': shape.shapeType,
      'rotationPhase': shape.rotationPhase,
      'id': shape.coordinates[i].id
    };
  }

  //TO DO: increase lines cleared OR score if there are full rows
  checkForHorizontalMatches();

}


//Called whenever a shape descends (automatically by one row; sped up via down button; instantly placed via space bar)
function checkForHorizontalMatches() { 
  let rows = Object.keys(placedShapes);
  let rowsMatched = [];
  for (let i = 0; i < rows.length; i++) {
    if (Object.keys(placedShapes[rows[i]]).length == columnWidth) {
      rowsMatched.push(rows[i]);
    }
  }

  if (rowsMatched.length > 0) {
    increaseLinesCleared(rowsMatched.length);
    increaseScore(rowsMatched.length);
    clearPlacedShapesInGrid();
    for (let i = 0; i < rowsMatched.length; i++) {
      delete placedShapes[rowsMatched[i]];
    }
    displayRemainingPlacedShapes();
  }
}


function clearPlacedShapesInGrid() {
  let rows = Object.keys(placedShapes);
  for (let i = 0; i < rows.length; i++) {
    let columns = Object.keys(placedShapes[rows[i]]);
    for (let j = 0; j < columns.length; j++) {
      let gridItem = document.getElementById(`grid-${rows[i]}-${columns[j]}`);
      //Remove labels from old coordinate
      gridItem.classList.remove(gridItem.classList.item(1), gridItem.classList.item(2));
      //Remove color from old coordinate
      gridItem.style.removeProperty("background-color");
    }
  }
}


//Sorting object keys:
//https://www.basedash.com/blog/how-to-sort-javascript-objects-by-key
function displayRemainingPlacedShapes() {
  let sortedRows = Object.keys(placedShapes).sort((a, b) => placedShapes[a] - placedShapes[b]);

  let rowCounter = 0;
  for (let i = 0; i < sortedRows.length; i++) {
    rowCounter++;
    let columns = Object.keys(placedShapes[sortedRows[i]]);
    
    if (sortedRows[i] == rowCounter) { 
      for (let j = 0; j < columns.length; j++) {
        let unchangedCoordinate = placedShapes[sortedRows[i]][columns[j]];

        let gridItem = document.getElementById(`grid-${rowCounter}-${columns[j]}`);
        //Add label to coordinate
        gridItem.classList.add(unchangedCoordinate.id, unchangedCoordinate.rotationPhase);
        //Add color to coordinate
        let shapeColor = getColor(unchangedCoordinate.shapeType);
        gridItem.style.backgroundColor = shapeColor;
      }
    } else { 
      for (let j = 0; j < columns.length; j++) {
        //Descend higher rows to fill the gaps between rows
        placedShapes[sortedRows[i]][columns[j]].row = rowCounter;
        
        let newCoordinate = placedShapes[sortedRows[i]][columns[j]];
        let gridItem = document.getElementById(`grid-${newCoordinate.row}-${newCoordinate.column}`);
        //Add label to new coordinate
        gridItem.classList.add(newCoordinate.id, newCoordinate.rotationPhase);
        //Add color to new coordinate
        let shapeColor = getColor(newCoordinate.shapeType);
        gridItem.style.backgroundColor = shapeColor;
      }

      //Update data structure with the new row as a key, and delete the old key
      let tempRow = JSON.parse(JSON.stringify(placedShapes[sortedRows[i]]));
      delete placedShapes[sortedRows[i]];
      placedShapes[rowCounter] = tempRow;
    }
  }
}


//For casual play; only takes into account how many lines are cleared; no extra points for clearing multiple rows at once
function increaseLinesCleared(linesCleared) {
  totalLinesCleared += linesCleared;
  document.getElementById("totalLinesCleared").innerText = totalLinesCleared;
}


//For competitive play; extra points for clearing multiple rows at once
function increaseScore(linesCleared) {
  let score = 0;
  switch (linesCleared) {
    case 1:
      score = 1;
      singleLinesCleared++;
      document.getElementById("singleLinesCleared").innerText = singleLinesCleared;
      break;
    
    case 2:
      score = 3;
      doubleLinesCleared++;
      document.getElementById("doubleLinesCleared").innerText = doubleLinesCleared;
      break;
    
    case 3:
      score = 5;
      tripleLinesCleared++;
      document.getElementById("tripleLinesCleared").innerText = tripleLinesCleared;
      break;
    
    case 4:
      score = 8;
      tetrisLinesCleared++;
      document.getElementById("tetrisLinesCleared").innerText = tetrisLinesCleared;
      break;
  }

  totalScore += score;
  document.getElementById("totalScore").innerText = totalScore;
}


function saveResultsToLocalStorage() {
  let gameStartTimeFormatted = new Date(gameStartTime).toString();
  gameEndTime = Date.now();
  let gameEndTimeFormatted = new Date(gameEndTime).toString();

  let gameDuration = calculateGameDuration();
  
  let newResults = {
    "score": totalScore,
    "linesCleared": totalLinesCleared,
    "single": singleLinesCleared,
    "double": doubleLinesCleared,
    "triple": tripleLinesCleared,
    "tetris": tetrisLinesCleared,
    "duration": gameDuration,
    "startTime": gameStartTimeFormatted,
    "endTime": gameEndTimeFormatted,
  }

  let pastResults = JSON.parse(localStorage.getItem("pastResults"));
  if (pastResults == null) {
    pastResults = [];
    pastResults.push(newResults);
    localStorage.setItem("pastResults", JSON.stringify(pastResults));
  } else {
    pastResults.push(newResults);
    localStorage.removeItem("pastResults");
    localStorage.setItem("pastResults", JSON.stringify(pastResults));
  }
}


//https://www.geeksforgeeks.org/get-the-relative-timestamp-difference-between-dates-in-javascript/
function calculateGameDuration() {
  let ms_Sec = 1000; // milliseconds in Second 
  let ms_Min = 60 * 1000; // milliseconds in Minute 
  let ms_Hour = ms_Min * 60; // milliseconds in Hour 
  let gameDuration = gameEndTime - gameStartTime; //difference between times
  
  let unconvertedTime;
  let hours = Math.floor(gameDuration / ms_Hour);
  unconvertedTime = gameDuration - (hours * ms_Hour);
  let minutes = Math.floor(unconvertedTime / ms_Min);
  unconvertedTime -= (minutes * ms_Min);
  let seconds = Math.floor(unconvertedTime / ms_Sec);
  unconvertedTime -= (seconds * ms_Sec);

  let formattedDuration = `${hours} hours, ${minutes} minutes, ${seconds} seconds, ${unconvertedTime} miliseconds`;

  return formattedDuration;
}

