"use strict";

//Gamepad controls. Can be used simultaneously with keyboard.

//Gamepad support is currently hardcoded for my bootleg no brand PS3 controller. 
//TO DO: make buttons and axes assignable

//https://developer.mozilla.org/en-US/docs/Web/API/Window/ongamepadconnected#Browser_compatibility
//https://www.youtube.com/watch?v=vGPgTvNojv0
//https://j2i.net/apps/gamePadStatus/

var gamepadInterval;

var gamepadCache = {
  leftButton: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5,
    inertiaFulfilled: false
  },
  rightButton: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5,
    inertiaFulfilled: false
  },
  rotateButton: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5
  },
  placeShapeButtons: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5
  },
  hastenDescentButton: {
    wasPressed: false
  }
}


function isGamepadSupported() {
  return "getGamepads" in window.navigator;
}


function showGamepadNotSupported() {
  console.log("Error: Gamepad not supported");
  alert("Error: Gamepad not supported");
  return;
}


function gamepadConnected(event) {
  console.log('adding gamepad', event);
  var index = event.gamepad.index;
}


function gamepadDisconnected(event) {
  console.log('removing gamepad', event);
}


function updateController(index, gamepad) {
  updateAxes(gamepad);
  updateButtons(gamepad);
}


// Axis 0 (-1) -> Left
// Axis 0 (1) -> Right
// Axis 1 (-1) -> Up
// Axis 1 (1) -> Down
function updateAxes(gamepad) {
  if (gamepad != null) {
    switch (gamepad.axes[0]) {
      //Left
      case -1:
        if (gamepadCache.leftButton.inertiaFulfilled) {
          action.moveLeft();
        } else {
          if (!gamepadCache.leftButton.pressed) {
            action.moveLeft();
            gamepadCache.leftButton.pressed = true;
            gamepadCache.leftButton.passes++;
          } else if (gamepadCache.leftButton.passes == gamepadCache.leftButton.passesRequired) {
            gamepadCache.leftButton.pressed = false;
            gamepadCache.leftButton.passes = 0;
            gamepadCache.leftButton.inertiaFulfilled = true;
          } else {
            gamepadCache.leftButton.passes++;
          }
        }
        gamepadCache.rightButton.pressed = false;
        gamepadCache.rightButton.passes = 0;
        gamepadCache.rightButton.inertiaFulfilled = false;
        break;
      
      //Right
      case 1:
        if (gamepadCache.rightButton.inertiaFulfilled) {
          action.moveRight();
        } else {
          if (!gamepadCache.rightButton.pressed) {
            action.moveRight();
            gamepadCache.rightButton.pressed = true;
            gamepadCache.rightButton.passes++;
          } else if (gamepadCache.rightButton.passes == gamepadCache.rightButton.passesRequired) {
            gamepadCache.rightButton.pressed = false;
            gamepadCache.rightButton.passes = 0;
            gamepadCache.rightButton.inertiaFulfilled = true;
          } else {
            gamepadCache.rightButton.passes++;
          }
        }
        gamepadCache.leftButton.pressed = false;
        gamepadCache.leftButton.passes = 0;
        gamepadCache.leftButton.inertiaFulfilled = false;
        break;
      
      default:
        gamepadCache.leftButton.pressed = false;
        gamepadCache.leftButton.passes = 0;
        gamepadCache.leftButton.inertiaFulfilled = false;

        gamepadCache.rightButton.pressed = false;
        gamepadCache.rightButton.passes = 0;
        gamepadCache.rightButton.inertiaFulfilled = false;
        break;
    }

  }
}


// Button 0 -> 1
// Button 1 -> 2
// Button 2 -> 3
// Button 3 -> 4
function updateButtons(gamepad) {
  if (gamepad != null) {
    //Rotate
    if (gamepad.buttons[0].pressed) {
      if (!gamepadCache.rotateButton.pressed) {
        if (gamepadCache.rotateButton.passes == 0) {
          action.rotate();
          gamepadCache.rotateButton.pressed = true;
          gamepadCache.rotateButton.passes++;
        }
      } else if (gamepadCache.rotateButton.passes == gamepadCache.rotateButton.passesRequired) {
        gamepadCache.rotateButton.pressed = false;
        gamepadCache.rotateButton.passes = 0;
      } else {
        gamepadCache.rotateButton.passes++;
      }
    } else {
      gamepadCache.rotateButton.pressed = false;
      gamepadCache.rotateButton.passes = 0;
    }

    //Place Shape
    if (gamepad.buttons[1].pressed) {
      if (!gamepadCache.placeShapeButtons.pressed) {
        if (gamepadCache.placeShapeButtons.passes == 0) {
          action.triggerPlaceShape();
          gamepadCache.placeShapeButtons.pressed = true;
          gamepadCache.placeShapeButtons.passes++;
        }
      //passesRequired staggers the frequency in which triggerPlaceShape() is called.
      //The else-if statement is necessary to prevent placing more blocks than the player intends to.
      //The player's reaction will most likely be slower than the interval that checks for gamepad inputs, 
      //so they may not lift their finger off the button in time before the next shape is placed. 
      //Due to the slow reaction time, 2 to 3 shapes would have been placed instead of just 1.
      } else if (gamepadCache.placeShapeButtons.passes == gamepadCache.placeShapeButtons.passesRequired) {
        gamepadCache.placeShapeButtons.pressed = false;
        gamepadCache.placeShapeButtons.passes = 0;
      } else {
        gamepadCache.placeShapeButtons.passes++;
      }
    } else {
      gamepadCache.placeShapeButtons.pressed = false;
      gamepadCache.placeShapeButtons.passes = 0;
    }
    
    //Hasten Descent
    if (gamepad.buttons[2].pressed) {
      if (!gamepadCache.hastenDescentButton.pressed) {
        action.hastenDescent();
        gamepadCache.hastenDescentButton.pressed = true;
      }
    } 
    //Only attempt to revert speed if the hasten descent button on the gamepad was previously pressed. 
    //Otherwise, the gamepad function (revert speed) will override the keyboard function (hasten descent),
    //and the player will be limited to using the gamepad to hasten descent. The else statement provides 
    //the flexibility/opportunity to use both controls (gamepad and keyboard) simultaneously.
    else if (gamepadCache.hastenDescentButton.pressed) {
      action.revertDescentToDefaultSpeed();
      gamepadCache.hastenDescentButton.pressed = false;
    }

  }
}


function activateGamepad() {
  if (!isGamepadSupported()) {
    showGamepadNotSupported();
    return;
  }
  document.body.addEventListener("gamepadconnected", gamepadConnected);
  document.body.addEventListener("gamepaddisconnected", gamepadDisconnected);

  gamepadInterval = setInterval(() => {
    var gamepads = navigator.getGamepads();
    for (var i = 0; i < gamepads.length; ++i) {
      updateController(i, gamepads[i]);
    }
  }, 35);
}


function deactivateGamepad() {
  if (!isGamepadSupported()) {
    showGamepadNotSupported();
    return;
  }
  document.body.removeEventListener("gamepadconnected", gamepadConnected);
  document.body.removeEventListener("gamepaddisconnected", gamepadDisconnected);
}

