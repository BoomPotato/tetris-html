"use strict";

//Gamepad controls. Can be used simultaneously with keyboard.

//Gamepad support was originally hardcoded for my bootleg PS3 controller, but has since been 
//made dynamic. I've tested the code on my PS5 DualSense controller, and I could assign the 
//rotate, placeShape, and hastenDescent controls but not the left and right controls because the 
//directional buttons on the DualSense are buttons and not axes. I will need to rewrite the code 
//for the left and right controls to accommodate both axes and buttons. The left and right controls 
//currently only support axes input.

//https://developer.mozilla.org/en-US/docs/Web/API/Window/ongamepadconnected#Browser_compatibility
//https://www.youtube.com/watch?v=vGPgTvNojv0
//https://j2i.net/apps/gamePadStatus/

var gamepadInterval;
var gamepadSettingsInterval;

var gamepadControls = {
  left: {
    axisIndex: null,
    axisValue: null
  },
  right: {
    axisIndex: null,
    axisValue: null
  },
  rotate: {
    buttonIndex: null
  },
  placeShape: {
    buttonIndex: null
  },
  hastenDescent: {
    buttonIndex: null
  }
}

var gamepadCache = {
  left: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5,
    inertiaFulfilled: false
  },
  right: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5,
    inertiaFulfilled: false
  },
  rotate: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5
  },
  placeShape: {
    wasPressed: false,
    passes: 0,
    passesRequired: 5
  },
  hastenDescent: {
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


function updateController(gamepad) {
  updateAxes(gamepad);
  updateButtons(gamepad);
}


// Axis 0 (-1) -> Left
// Axis 0 (1) -> Right
// Axis 1 (-1) -> Up
// Axis 1 (1) -> Down
function updateAxes(gamepad) {
  if (gamepad != null) {
    //If left control is triggered
    if (gamepad.axes[gamepadControls.left.axisIndex] == gamepadControls.left.axisValue) {
      if (gamepadCache.left.inertiaFulfilled) {
        action.moveLeft();
      } else {
        if (!gamepadCache.left.pressed) {
          action.moveLeft();
          gamepadCache.left.pressed = true;
          gamepadCache.left.passes++;
        } else if (gamepadCache.left.passes == gamepadCache.left.passesRequired) {
          gamepadCache.left.pressed = false;
          gamepadCache.left.passes = 0;
          gamepadCache.left.inertiaFulfilled = true;
        } else {
          gamepadCache.left.passes++;
        }
      }
      gamepadCache.right.pressed = false;
      gamepadCache.right.passes = 0;
      gamepadCache.right.inertiaFulfilled = false;
    } 

    //If right control is triggered
    else if (gamepad.axes[gamepadControls.right.axisIndex] == gamepadControls.right.axisValue) {
      if (gamepadCache.right.inertiaFulfilled) {
        action.moveRight();
      } else {
        if (!gamepadCache.right.pressed) {
          action.moveRight();
          gamepadCache.right.pressed = true;
          gamepadCache.right.passes++;
        } else if (gamepadCache.right.passes == gamepadCache.right.passesRequired) {
          gamepadCache.right.pressed = false;
          gamepadCache.right.passes = 0;
          gamepadCache.right.inertiaFulfilled = true;
        } else {
          gamepadCache.right.passes++;
        }
      }
      gamepadCache.left.pressed = false;
      gamepadCache.left.passes = 0;
      gamepadCache.left.inertiaFulfilled = false;
    } 
    
    else {
      gamepadCache.left.pressed = false;
      gamepadCache.left.passes = 0;
      gamepadCache.left.inertiaFulfilled = false;

      gamepadCache.right.pressed = false;
      gamepadCache.right.passes = 0;
      gamepadCache.right.inertiaFulfilled = false;
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
    if (gamepad.buttons[gamepadControls.rotate.buttonIndex].pressed) {
      if (!gamepadCache.rotate.pressed) {
        if (gamepadCache.rotate.passes == 0) {
          action.rotate();
          gamepadCache.rotate.pressed = true;
          gamepadCache.rotate.passes++;
        }
      } else if (gamepadCache.rotate.passes == gamepadCache.rotate.passesRequired) {
        gamepadCache.rotate.pressed = false;
        gamepadCache.rotate.passes = 0;
      } else {
        gamepadCache.rotate.passes++;
      }
    } else {
      gamepadCache.rotate.pressed = false;
      gamepadCache.rotate.passes = 0;
    }

    //Place Shape
    if (gamepad.buttons[gamepadControls.placeShape.buttonIndex].pressed) {
      if (!gamepadCache.placeShape.pressed) {
        if (gamepadCache.placeShape.passes == 0) {
          action.triggerPlaceShape();
          gamepadCache.placeShape.pressed = true;
          gamepadCache.placeShape.passes++;
        }
      //passesRequired staggers the frequency in which triggerPlaceShape() is called.
      //The else-if statement is necessary to prevent placing more blocks than the player intends to.
      //The player's reaction will most likely be slower than the interval that checks for gamepad inputs, 
      //so they may not lift their finger off the button in time before the next shape is placed. 
      //Due to the slow reaction time, 2 to 3 shapes would have been placed instead of just 1.
      } else if (gamepadCache.placeShape.passes == gamepadCache.placeShape.passesRequired) {
        gamepadCache.placeShape.pressed = false;
        gamepadCache.placeShape.passes = 0;
      } else {
        gamepadCache.placeShape.passes++;
      }
    } else {
      gamepadCache.placeShape.pressed = false;
      gamepadCache.placeShape.passes = 0;
    }

    //Hasten Descent
    if (gamepad.buttons[gamepadControls.hastenDescent.buttonIndex].pressed) {
      if (!gamepadCache.hastenDescent.pressed) {
        action.hastenDescent();
        gamepadCache.hastenDescent.pressed = true;
      }
    } 
    //Only attempt to revert speed if the hasten descent button on the gamepad was previously pressed. 
    //Otherwise, the gamepad function (revert speed) will override the keyboard function (hasten descent),
    //and the player will be limited to using the gamepad to hasten descent. The else statement provides 
    //the flexibility/opportunity to use both controls (gamepad and keyboard) simultaneously.
    else if (gamepadCache.hastenDescent.pressed) {
      action.revertDescentToDefaultSpeed();
      gamepadCache.hastenDescent.pressed = false;
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
    updateController(gamepads[0]);
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


//Not in use
function detectGamepad() {
  let gamepads = navigator.getGamepads();
  if (gamepads[0] == null) {
    disableSetAndTestButtons();
    updateLog("Gamepad not connected. Please connect only one gamepad; multiple gamepads not supported.");
    return false;
  }
  return true;
}


//++i is faster than i++
//https://codeforces.com/blog/entry/115877
function setAxis(input) {
  disableSetAndTestButtons();
  updateLog(`Setting ${input} axis...`);

  gamepadSettingsInterval = setInterval(() => {
    let gamepads = navigator.getGamepads();
    if (gamepads[0] != null) {
      for (let i = 0; i < gamepads[0].axes.length; ++i) {
        if (Math.abs(gamepads[0].axes[i]) == 1) {
          if (!handleGamepadControls('checkExists', null, i, gamepads[0].axes[i])) {
            switch (input) {
              case 'left':
                if (gamepadControls.left.axisIndex != null) {
                  handleGamepadControls('remove', 'left', null, null);
                }
                handleGamepadControls('add', 'left', i, gamepads[0].axes[i]);
                document.getElementById("gamepadSettingLeft").textContent = `axes[${i}] = ${gamepads[0].axes[i]}`;
                break;
              
              case 'right':
                if (gamepadControls.right.axisIndex != null) {
                  handleGamepadControls('remove', 'right', null, null);
                }
                handleGamepadControls('add', 'right', i, gamepads[0].axes[i]);
                document.getElementById("gamepadSettingRight").textContent = `axes[${i}] = ${gamepads[0].axes[i]}`;
                break;
            }
            updateLog(`Finish setting ${input} axis: axes[${i}] = ${gamepads[0].axes[i]}`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          } else {
            updateLog(`Setting Error: axes[${i}] = ${gamepads[0].axes[i]} has already been assigned.`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          }
        }
      }
      for (let i = 0; i < gamepads[0].buttons.length; ++i) {
        if (gamepads[0].buttons[i].pressed) {
          updateLog(`Setting Error: unable to assign button to axis, please press an axis instead.`);
          clearInterval(gamepadSettingsInterval);
          enableSetAndTestButtons();
          return;
        }
      }
    }
  }, 50);
}


function setButton(input) {
  disableSetAndTestButtons();
  updateLog(`Setting ${input} button...`);

  gamepadSettingsInterval = setInterval(() => {
    let gamepads = navigator.getGamepads();
    if (gamepads[0] != null) {
      for (let i = 0; i < gamepads[0].buttons.length; ++i) {
        if (gamepads[0].buttons[i].pressed) {
          if (!handleGamepadControls('checkExists', null, i, null)) {
            switch (input) {
              case 'rotate':
                if (gamepadControls.rotate.buttonIndex != null) {
                  handleGamepadControls('remove', 'rotate', null, null);
                }
                handleGamepadControls('add', 'rotate', i, null);
                document.getElementById("gamepadSettingRotate").textContent = `buttons[${i}]`;
                break;
              
              case 'placeShape':
                if (gamepadControls.placeShape.buttonIndex != null) {
                  handleGamepadControls('remove', 'placeShape', null, null);
                }
                handleGamepadControls('add', 'placeShape', i, null);
                document.getElementById("gamepadSettingPlaceShape").textContent = `buttons[${i}]`;
                break;
  
              case 'hastenDescent':
                if (gamepadControls.hastenDescent.buttonIndex != null) {
                  handleGamepadControls('remove', 'hastenDescent', null, null);
                }
                handleGamepadControls('add', 'hastenDescent', i, null);
                document.getElementById("gamepadSettingHastenDescent").textContent = `buttons[${i}]`;
                break;
            }
            updateLog(`Finish setting ${input} button: buttons[${i}]`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          } else {
            updateLog(`Setting Error: buttons[${i}] has already been assigned.`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          }
        }
      }
      for (let i = 0; i < gamepads[0].axes.length; ++i) {
        if (Math.abs(gamepads[0].axes[i]) == 1) {
          updateLog(`Setting Error: unable to assign axis to button, please press a button instead.`);
          clearInterval(gamepadSettingsInterval);
          enableSetAndTestButtons();
          return;
        }
      }
    }
  }, 50);
}


function disableSetAndTestButtons() {
  let setButtons = document.getElementsByClassName('gamepadSetButton');
  for (let i = 0; i < setButtons.length; ++i) {
    setButtons[i].disabled = true;
  }
  document.getElementById('testGamepadButton').disabled = true;
}


function enableSetAndTestButtons() {
  let setButtons = document.getElementsByClassName('gamepadSetButton');
  for (let i = 0; i < setButtons.length; ++i) {
    setButtons[i].disabled = false;
  }
  document.getElementById('testGamepadButton').disabled = false;
}


function getTimestamp() {
  let timestamp = Date.now();
  let timestampFormatted = new Date(timestamp).toString();
  return timestampFormatted;
}


function updateLog(message) {
  let gamepadLog = document.getElementById("gamepadLog");
  let div = document.createElement("div");
  div.classList.add("logMessage");
  let p1 = document.createElement("p");
  p1.classList.add("logTimestamp");
  let text1 = document.createTextNode(`${gamepadLog.children.length}) ${getTimestamp()}`);
  let p2 = document.createElement("p");
  let text2 = document.createTextNode(message);
  p1.appendChild(text1);
  div.appendChild(p1);
  p2.appendChild(text2);
  div.appendChild(p2);
  gamepadLog.appendChild(div);
}


function updateTestGamepadText(message) {
  document.getElementById("testGamepadText").textContent = message;
}


function testGamepad() {
  disableSetAndTestButtons();
  updateLog(`Testing gamepad controls...`);
  updateTestGamepadText(`Testing gamepad controls...`);

  gamepadSettingsInterval = setInterval(() => {
    let gamepads = navigator.getGamepads();
    if (gamepads[0] != null) {
      for (let i = 0; i < gamepads[0].axes.length; ++i) {
        if (Math.abs(gamepads[0].axes[i]) == 1) {
          if (i == gamepadControls.left.axisIndex && gamepads[0].axes[i] == gamepadControls.left.axisValue) {
            let message = `Test complete. axes[${i}] = ${gamepads[0].axes[i]} assigned as left control.`;
            endGamepadTest(message);
            return;
          } else if (i == gamepadControls.right.axisIndex && gamepads[0].axes[i] == gamepadControls.right.axisValue) {
            let message = `Test complete. axes[${i}] = ${gamepads[0].axes[i]} assigned as right control.`;
            endGamepadTest(message);
            return;
          } else {
            let message = `Test complete. axes[${i}] = ${gamepads[0].axes[i]} is unassigned.`;
            endGamepadTest(message);
            return;
          }
        }
      }
      for (let i = 0; i < gamepads[0].buttons.length; ++i) {
        if (gamepads[0].buttons[i].pressed) {
          if (i == gamepadControls.rotate.buttonIndex) {
            let message = `Test complete. buttons[${i}] assigned as rotate control.`;
            endGamepadTest(message);
            return;
          }
          else if (i == gamepadControls.placeShape.buttonIndex) {
            let message = `Test complete. buttons[${i}] assigned as placeShape control.`;
            endGamepadTest(message);
            return;
          }
          else if (i == gamepadControls.hastenDescent.buttonIndex) {
            let message = `Test complete. buttons[${i}] assigned as hastenDescent control.`;
            endGamepadTest(message);
            return;
          } else {
            let message = `Test complete. buttons[${i}] is unassigned.`;
            endGamepadTest(message);
            return;
          }
        }
      }
    }
  }, 50);
}


function endGamepadTest(message) {
  updateTestGamepadText(message);
  updateLog(message);
  clearInterval(gamepadSettingsInterval);
  enableSetAndTestButtons();
}


function clearGamepadControl(input) {
  switch (input) {
    case 'left':
      handleGamepadControls('remove', 'left', null, null);
      document.getElementById('gamepadSettingLeft').textContent = "-";
      break;

    case 'right':
      handleGamepadControls('remove', 'right', null, null);
      document.getElementById('gamepadSettingRight').textContent = "-";
      break;

    case 'rotate':
      handleGamepadControls('remove', 'rotate', null, null);
      document.getElementById('gamepadSettingRotate').textContent = "-";
      break;

    case 'placeShape':
      handleGamepadControls('remove', 'placeShape', null, null);
      document.getElementById('gamepadSettingPlaceShape').textContent = "-";
      break;

    case 'hastenDescent':
      handleGamepadControls('remove', 'hastenDescent', null, null);
      document.getElementById('gamepadSettingHastenDescent').textContent = "-";
      break;
  }

}

//action: add, remove, checkExists
//control: left, right, rotate, placeShape, hastenDescent
//index is the array index of the axis or button
//value is the value of an axis
function handleGamepadControls(action, control, index, value) {
  switch (action) {
    case 'add':
      switch (control) {
        case 'left':
          gamepadControls.left.axisIndex = index;
          gamepadControls.left.axisValue = value;
          break;

        case 'right':
          gamepadControls.right.axisIndex = index;
          gamepadControls.right.axisValue = value;
          break;

        case 'rotate':
          gamepadControls.rotate.buttonIndex = index;
          break;

        case 'placeShape':
          gamepadControls.placeShape.buttonIndex = index;
          break;
        
        case 'hastenDescent':
          gamepadControls.hastenDescent.buttonIndex = index;
          break;
      }
      saveGamepadControls();
      break;
    
    case 'remove':
      switch (control) {
        case 'left':
          gamepadControls.left.axisIndex = null;
          gamepadControls.left.axisValue = null;
          break;

        case 'right':
          gamepadControls.right.axisIndex = null;
          gamepadControls.right.axisValue = null;
          break;

        case 'rotate':
          gamepadControls.rotate.buttonIndex = null;
          break;

        case 'placeShape':
          gamepadControls.placeShape.buttonIndex = null;
          break;
        
        case 'hastenDescent':
          gamepadControls.hastenDescent.buttonIndex = null;
          break;
      }
      saveGamepadControls();
      break;

    case 'checkExists':
      switch (value) {
        //Buttons don't have values
        case null:
          if (index == gamepadControls.rotate.buttonIndex) {
            return true;
          } else if (index == gamepadControls.placeShape.buttonIndex) {
            return true;
          } else if (index == gamepadControls.hastenDescent.buttonIndex) {
            return true;
          } else {
            return false;
          }
          break;

        //Axes have values
        default:
          if (index == gamepadControls.left.axisIndex && value == gamepadControls.left.axisValue) {
            return true;
          } else if (index == gamepadControls.right.axisIndex && value == gamepadControls.right.axisValue) {
            return true;
          } else {
            return false;
          }
          break;
      }
      break;
  }
  
}


function saveGamepadControls() {
  let unparsedGamepadControls = localStorage.getItem('gamepadControls');
  if (unparsedGamepadControls != null) {
    localStorage.removeItem('gamepadControls');
  }
  localStorage.setItem('gamepadControls', JSON.stringify(gamepadControls));
}


function populateGameControlsForm() {
  let unparsedGamepadControls = localStorage.getItem('gamepadControls');
  if (unparsedGamepadControls != null) {
    gamepadControls = JSON.parse(unparsedGamepadControls);

    let nullFieldFound = 0;
    if (gamepadControls.left.axisIndex != null) {
      document.getElementById('gamepadSettingLeft').textContent = `axes[${gamepadControls.left.axisIndex}] = ${gamepadControls.left.axisValue}`;
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.right.axisIndex != null) {
      document.getElementById('gamepadSettingRight').textContent = `axes[${gamepadControls.right.axisIndex}] = ${gamepadControls.right.axisValue}`;
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.rotate.buttonIndex != null) {
      document.getElementById('gamepadSettingRotate').textContent = `buttons[${gamepadControls.rotate.buttonIndex}]`;
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.placeShape.buttonIndex != null) {
      document.getElementById('gamepadSettingPlaceShape').textContent = `buttons[${gamepadControls.placeShape.buttonIndex}]`;
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.hastenDescent.buttonIndex != null) {
      document.getElementById('gamepadSettingHastenDescent').textContent = `buttons[${gamepadControls.hastenDescent.buttonIndex}]`;
    } else {
      nullFieldFound++;
    }

    if (nullFieldFound > 0 && nullFieldFound < 5) {
      updateLog('Incomplete gamepad configuration data found. Please configure all the controls to enable the gamepad.');
    } else if (nullFieldFound == 0) {
      updateLog('Gamepad configuration data found.');
    } else if (nullFieldFound == 5) {
    updateLog('Gamepad configuration data not found. Please configure a gamepad if you wish to use one. A gamepad is optional, the game is also playable with a keyboard.');
    }
  } else {
    updateLog('Gamepad configuration data not found. Please configure a gamepad if you wish to use one. A gamepad is optional, the game is also playable with a keyboard.');
  }
}

