"use strict";

var rowHeight = 20;
var columnWidth = 10;

var countdownDuration = 5;

var colors = [
  "yellow",
  "light-blue",
  "red",
  "green",
  "orange",
  "pink",
  "purple"
]

function getColor() {
  return colors[currentShape.colorIndex];
}

var hastenDescentInterval = 900;