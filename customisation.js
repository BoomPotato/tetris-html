'use strict';

var rowHeight = 20;
var columnWidth = 10;

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

function getColor(shapeType) {
  return colors[shapeType];
}

//TO DO: Will be gradually shortened depending on how many lines the player has cleared. 
//Able to be temporarily overriden by the hastenDescentInterval variable.
var defaultDescentInterval = 400;

var hastenDescentInterval = 50;

var generateShapesHorizontally = true;