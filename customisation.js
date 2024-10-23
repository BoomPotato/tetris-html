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

var hastenDescentInterval = 50;

var generateShapesHorizontally = false;