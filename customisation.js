'use strict';

var rowHeight = 20;
var columnWidth = 10;

//Not in use
var countdownDuration = 5;

var colors = {
  'o': 'yellow',
  'i': 'lightblue',
  's': 'green',
  'z': 'red',
  'l': 'orange',
  'j': 'blue',
  't': 'purple'
};

//TO DO: Will be gradually shortened depending on how many lines the player has cleared. 
//Able to be temporarily overriden by the hastenDescentInterval variable.
var defaultDescentInterval = 300;

var hastenDescentInterval = 50;

var generateShapesHorizontally = true;

var enableGhostShape = true;


function getColor(shapeType) {
  return colors[shapeType];
}


function populateCustomisationForm() {
  let unparsedCustomisation = localStorage.getItem('customisation');
  if (unparsedCustomisation != null) {
    let customisation = JSON.parse(unparsedCustomisation);
    document.getElementById("rowHeight").value = customisation.rowHeight;
    document.getElementById("columnWidth").value = customisation.columnWidth;

    if (customisation.generateShapesHorizontally == "true") {
      document.getElementById("horizontally").checked = true;
      document.getElementById("vertically").checked = false;
    } else {
      document.getElementById("horizontally").checked = false;
      document.getElementById("vertically").checked = true;
    }

    if (customisation.enableGhostShape == "true") {
      document.getElementById("ghostEnable").checked = true;
      document.getElementById("ghostDisable").checked = false;
    } else {
      document.getElementById("ghostEnable").checked = false;
      document.getElementById("ghostDisable").checked = true;
    }

    document.getElementById("descentInterval").value = customisation.defaultDescentInterval;
    document.getElementById("hastenDescentInterval").value = customisation.hastenDescentInterval;

    document.getElementById("colorO").value = customisation.colors['o'];
    document.getElementById("colorI").value = customisation.colors['i'];
    document.getElementById("colorS").value = customisation.colors['s'];
    document.getElementById("colorZ").value = customisation.colors['z'];
    document.getElementById("colorL").value = customisation.colors['l'];
    document.getElementById("colorJ").value = customisation.colors['j'];
    document.getElementById("colorT").value = customisation.colors['t'];
  }
}


function customiseGame() {
  let formRowHeight = document.getElementById("rowHeight").value;
  let formColumnWidth = document.getElementById("columnWidth").value;
  let formGenerateShapesHorizontally = document.querySelector('input[name="generateShapes"]:checked').value;
  let formGhostShape = document.querySelector('input[name="ghostShape"]:checked').value;
  let formDescentInterval = document.getElementById("descentInterval").value;
  let formHastenDescentInterval = document.getElementById("hastenDescentInterval").value;
  let formColorO = document.getElementById("colorO").value;
  let formColorI = document.getElementById("colorI").value;
  let formColorS = document.getElementById("colorS").value;
  let formColorZ = document.getElementById("colorZ").value;
  let formColorL = document.getElementById("colorL").value;
  let formColorJ = document.getElementById("colorJ").value;
  let formColorT = document.getElementById("colorT").value;

  colors['o'] = formColorO;
  colors['i'] = formColorI;
  colors['s'] = formColorS;
  colors['z'] = formColorZ;
  colors['l'] = formColorL;
  colors['j'] = formColorJ;
  colors['t'] = formColorT;

  let customisation = {
    'rowHeight': formRowHeight,
    'columnWidth': formColumnWidth,
    'generateShapesHorizontally': formGenerateShapesHorizontally,
    'enableGhostShape': formGhostShape,
    'defaultDescentInterval': formDescentInterval,
    'hastenDescentInterval': formHastenDescentInterval,
    'colors': colors
  }

  if (localStorage.getItem('customisation') != null) {
    localStorage.removeItem('customisation');
  }
  localStorage.setItem('customisation', JSON.stringify(customisation));

  //Direct to game page
  window.location.href = './game.html';
}

