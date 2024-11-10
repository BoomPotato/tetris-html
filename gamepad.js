"use strict";

//Gamepad controls. Can be used simultaneously with keyboard.

//8 Nov 2024:
//Gamepad support was originally hardcoded for my bootleg PS3 controller, but has since been 
//made dynamic. I've tested the code on my PS5 DualSense controller, and I could assign the 
//rotate, placeShape, and hastenDescent controls but not the left and right controls because the 
//directional buttons on the DualSense are buttons and not axes. I will need to rewrite the code 
//for the left and right controls to accommodate both axes and buttons. The left and right controls 
//currently only support axes input.

//10 Nov 2024:
//All controls now accommodate both axes and buttons input. I'm now able to assign any input from my 
//PS5 DualSense controller to any of the controls.

//https://developer.mozilla.org/en-US/docs/Web/API/Window/ongamepadconnected#Browser_compatibility
//https://www.youtube.com/watch?v=vGPgTvNojv0
//https://j2i.net/apps/gamePadStatus/

var gamepadInterval;
var gamepadIntervalDuration = 50;
var gamepadSettingsInterval;
var gamepadLeftOrRightTriggered;

var gamepadDetectionInterval;

var gamepadControls = {
  left: {
    index: null,
    value: null
  },
  right: {
    index: null,
    value: null
  },
  rotate: {
    index: null,
    value: null
  },
  placeShape: {
    index: null,
    value: null
  },
  hastenDescent: {
    index: null,
    value: null
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
  console.log("Error: Browser does not support gamepads.");
  return;
}


function gamepadConnected(event) {
  // console.log('Adding gamepad.', event);
}


function gamepadDisconnected(event) {
  // console.log('Removing gamepad.', event);
}


function handleGamepadLeftControl() {
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

  gamepadLeftOrRightTriggered = true;
}


function handleGamepadRightControl() {
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

  gamepadLeftOrRightTriggered = true;
}


function handleGamepadRotateControl() {
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
}


function handleGamepadPlaceShapeControl() {
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
}


function handleGamepadInput() {
  let gamepads = navigator.getGamepads();
  let gamepad;
  for (let i = 0; i < gamepads.length; ++i) {
    if (gamepads[i] != null) {
      gamepad = gamepads[i];
      break;
    }
  }
  if (gamepad != null) {

    gamepadLeftOrRightTriggered = false;


    //Left
    if (gamepadControls.left.value != null) {
      if (Math.sign(gamepad.axes[gamepadControls.left.index]) * Math.round(Math.abs(gamepad.axes[gamepadControls.left.index])) == gamepadControls.left.value) {
        handleGamepadLeftControl();
      }
    } else {
      if (gamepad.buttons[gamepadControls.left.index].pressed) {
        handleGamepadLeftControl();
      }
    }


    //Right
    if (gamepadControls.right.value != null) {
      if (Math.sign(gamepad.axes[gamepadControls.right.index]) * Math.round(Math.abs(gamepad.axes[gamepadControls.right.index])) == gamepadControls.right.value) {
        handleGamepadRightControl();
      }
    } else {
      if (gamepad.buttons[gamepadControls.right.index].pressed) {
        handleGamepadRightControl();
      }
    }


    //Reset cache if both left and right controls are not triggered
    if (!gamepadLeftOrRightTriggered) {
      gamepadCache.left.pressed = false;
      gamepadCache.left.passes = 0;
      gamepadCache.left.inertiaFulfilled = false;

      gamepadCache.right.pressed = false;
      gamepadCache.right.passes = 0;
      gamepadCache.right.inertiaFulfilled = false;
    }


    //Rotate
    if (gamepadControls.rotate.value != null) {
      if (Math.sign(gamepad.axes[gamepadControls.rotate.index]) * Math.round(Math.abs(gamepad.axes[gamepadControls.rotate.index])) == gamepadControls.rotate.value) {
        handleGamepadRotateControl();
      } else {
        //Reset cache if rotate control is not triggered
        gamepadCache.rotate.pressed = false;
        gamepadCache.rotate.passes = 0;
      }
    } else {
      if (gamepad.buttons[gamepadControls.rotate.index].pressed) {
        handleGamepadRotateControl();
      } else {
        gamepadCache.rotate.pressed = false;
        gamepadCache.rotate.passes = 0;
      }
    }


    //Place Shape
    if (gamepadControls.placeShape.value != null) {
      if (Math.sign(gamepad.axes[gamepadControls.placeShape.index]) * Math.round(Math.abs(gamepad.axes[gamepadControls.placeShape.index])) == gamepadControls.placeShape.value) {
        handleGamepadPlaceShapeControl();
      } else {
        //Reset cache if placeShape control is not triggered
        gamepadCache.placeShape.pressed = false;
        gamepadCache.placeShape.passes = 0;
      }
    } else {
      if (gamepad.buttons[gamepadControls.placeShape.index].pressed) {
        handleGamepadPlaceShapeControl();
      } else {
        gamepadCache.placeShape.pressed = false;
        gamepadCache.placeShape.passes = 0;
      }
    }


    //Hasten Descent 
    //Is a special case, as compared to rotate and placeShape. While the cache of rotate and placeShape
    //are more flexible and can be reset for every interval that the two controls are not triggered, the 
    //effect and cache of hastenDescent can only be reversed if the control was previously triggered. This 
    //is necessary to prevent a clash with the keyboard's hastenDescent control.
    //Uses else-if statement instead of else statement.
    if (gamepadControls.hastenDescent.value != null) {
      if (Math.sign(gamepad.axes[gamepadControls.hastenDescent.index]) * Math.round(Math.abs(gamepad.axes[gamepadControls.hastenDescent.index])) == gamepadControls.hastenDescent.value) {
        if (!gamepadCache.hastenDescent.pressed) {
          action.hastenDescent();
          gamepadCache.hastenDescent.pressed = true;
        }
      }
      //Only attempt to revert speed if the hasten descent button on the gamepad was previously pressed. 
      //Otherwise, the gamepad function (revert speed) will override the keyboard function (hasten descent),
      //and the player will be limited to using the gamepad to hasten descent. The else-if statement provides 
      //the flexibility to use both input methods (gamepad and keyboard) simultaneously.
      else if (gamepadCache.hastenDescent.pressed) {
        action.revertDescentToDefaultSpeed();
        gamepadCache.hastenDescent.pressed = false;
      }
    } else {
      if (gamepad.buttons[gamepadControls.hastenDescent.index].pressed) {
        if (!gamepadCache.hastenDescent.pressed) {
          action.hastenDescent();
          gamepadCache.hastenDescent.pressed = true;
        }
      } else if (gamepadCache.hastenDescent.pressed) {
        action.revertDescentToDefaultSpeed();
        gamepadCache.hastenDescent.pressed = false;
      }
    }


  }
}


function activateGamepad() {
  if (!isGamepadSupported()) {
    showGamepadNotSupported();
    return;
  }
  document.body.addEventListener("gamepadconnected", gamepadConnected());
  document.body.addEventListener("gamepaddisconnected", gamepadDisconnected());

  gamepadInterval = setInterval(() => {
    handleGamepadInput();
  }, gamepadIntervalDuration);
}


function deactivateGamepad() {
  clearInterval(gamepadInterval);
  document.body.removeEventListener("gamepadconnected", gamepadConnected());
  document.body.removeEventListener("gamepaddisconnected", gamepadDisconnected());
}


//++i is faster than i++
//https://codeforces.com/blog/entry/115877
function setGamepadControl(control) {
  disableSetAndTestButtons();
  updateLog(`Setting ${control} control...`);

  gamepadSettingsInterval = setInterval(() => {
    let gamepads = navigator.getGamepads();
    let gamepad;
    for (let i = 0; i < gamepads.length; ++i) {
      if (gamepads[i] != null) {
        gamepad = gamepads[i];
        break;
      }
    }
    if (gamepad != null) {
      for (let i = 0; i < gamepad.axes.length; ++i) {
        if (Math.round(Math.abs(gamepad.axes[i])) == 1) {
          if (!handleGamepadControls('checkExists', null, i, Math.sign(gamepad.axes[i]))) {
            switch (control) {
              case 'left':
                if (gamepadControls.left.index != null) {
                  handleGamepadControls('remove', 'left', null, null);
                }
                handleGamepadControls('add', 'left', i, Math.sign(gamepad.axes[i]));
                document.getElementById("gamepadSettingLeft").textContent = `axes[${i}] = ${Math.sign(gamepad.axes[i])}`;
                break;

              case 'right':
                if (gamepadControls.right.index != null) {
                  handleGamepadControls('remove', 'right', null, null);
                }
                handleGamepadControls('add', 'right', i, Math.sign(gamepad.axes[i]));
                document.getElementById("gamepadSettingRight").textContent = `axes[${i}] = ${Math.sign(gamepad.axes[i])}`;
                break;

              case 'rotate':
                if (gamepadControls.rotate.index != null) {
                  handleGamepadControls('remove', 'rotate', null, null);
                }
                handleGamepadControls('add', 'rotate', i, Math.sign(gamepad.axes[i]));
                document.getElementById("gamepadSettingRotate").textContent = `axes[${i}] = ${Math.sign(gamepad.axes[i])}`;
                break;

              case 'placeShape':
                if (gamepadControls.placeShape.index != null) {
                  handleGamepadControls('remove', 'placeShape', null, null);
                }
                handleGamepadControls('add', 'placeShape', i, Math.sign(gamepad.axes[i]));
                document.getElementById("gamepadSettingPlaceShape").textContent = `axes[${i}] = ${Math.sign(gamepad.axes[i])}`;
                break;

              case 'hastenDescent':
                if (gamepadControls.hastenDescent.index != null) {
                  handleGamepadControls('remove', 'hastenDescent', null, null);
                }
                handleGamepadControls('add', 'hastenDescent', i, Math.sign(gamepad.axes[i]));
                document.getElementById("gamepadSettingHastenDescent").textContent = `axes[${i}] = ${Math.sign(gamepad.axes[i])}`;
                break;
            }
            updateLog(`Finish setting ${control} control: axes[${i}] = ${Math.sign(gamepad.axes[i])}`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          } else {
            updateLog(`Setting Error: axes[${i}] = ${Math.sign(gamepad.axes[i])} has already been assigned.`);
            clearInterval(gamepadSettingsInterval);
            enableSetAndTestButtons();
            return;
          }
        }
      }
      for (let i = 0; i < gamepad.buttons.length; ++i) {
        if (gamepad.buttons[i].pressed) {
          if (!handleGamepadControls('checkExists', null, i, null)) {
            switch (control) {
              case 'left':
                if (gamepadControls.left.index != null) {
                  handleGamepadControls('remove', 'left', null, null);
                }
                handleGamepadControls('add', 'left', i, null);
                document.getElementById("gamepadSettingLeft").textContent = `buttons[${i}]`;
                break;

              case 'right':
                if (gamepadControls.right.index != null) {
                  handleGamepadControls('remove', 'right', null, null);
                }
                handleGamepadControls('add', 'right', i, null);
                document.getElementById("gamepadSettingRight").textContent = `buttons[${i}]`;
                break;

              case 'rotate':
                if (gamepadControls.rotate.index != null) {
                  handleGamepadControls('remove', 'rotate', null, null);
                }
                handleGamepadControls('add', 'rotate', i, null);
                document.getElementById("gamepadSettingRotate").textContent = `buttons[${i}]`;
                break;

              case 'placeShape':
                if (gamepadControls.placeShape.index != null) {
                  handleGamepadControls('remove', 'placeShape', null, null);
                }
                handleGamepadControls('add', 'placeShape', i, null);
                document.getElementById("gamepadSettingPlaceShape").textContent = `buttons[${i}]`;
                break;

              case 'hastenDescent':
                if (gamepadControls.hastenDescent.index != null) {
                  handleGamepadControls('remove', 'hastenDescent', null, null);
                }
                handleGamepadControls('add', 'hastenDescent', i, null);
                document.getElementById("gamepadSettingHastenDescent").textContent = `buttons[${i}]`;
                break;
            }
            updateLog(`Finish setting ${control} control: buttons[${i}]`);
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
    }
  }, gamepadIntervalDuration);
}


function disableSetAndTestButtons() {
  let setButtons = document.getElementsByClassName('gamepadSetButton');
  let clearButtons = document.getElementsByClassName('gamepadClearButton');
  for (let i = 0; i < setButtons.length; ++i) {
    setButtons[i].disabled = true;
    clearButtons[i].disabled = true;
  }
  document.getElementById('testGamepadButton').disabled = true;
}


function enableSetAndTestButtons() {
  let setButtons = document.getElementsByClassName('gamepadSetButton');
  let clearButtons = document.getElementsByClassName('gamepadClearButton');
  for (let i = 0; i < setButtons.length; ++i) {
    setButtons[i].disabled = false;
    clearButtons[i].disabled = false;
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


function testGamepadControl() {
  disableSetAndTestButtons();
  updateLog(`Testing gamepad controls...`);
  updateTestGamepadText(`Testing gamepad controls...`);

  gamepadSettingsInterval = setInterval(() => {
    let gamepads = navigator.getGamepads();
    let gamepad;
    for (let i = 0; i < gamepads.length; ++i) {
      if (gamepads[i] != null) {
        gamepad = gamepads[i];
        break;
      }
    }
    if (gamepad != null) {
      for (let i = 0; i < gamepad.axes.length; ++i) {
        // if (Math.abs(gamepad.axes[i]) == 1) {
        if (Math.round(Math.abs(gamepad.axes[i])) == 1) {
          if (gamepadControls.left.value != null) {
            if (i == gamepadControls.left.index && Math.sign(gamepad.axes[i]) * Math.round(Math.abs(gamepad.axes[i])) == gamepadControls.left.value) {
              let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} assigned as left control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.right.value != null) {
            if (i == gamepadControls.right.index && Math.sign(gamepad.axes[i]) * Math.round(Math.abs(gamepad.axes[i])) == gamepadControls.right.value) {
              let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} assigned as right control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.rotate.value != null) {
            if (i == gamepadControls.rotate.index && Math.sign(gamepad.axes[i]) * Math.round(Math.abs(gamepad.axes[i])) == gamepadControls.rotate.value) {
              let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} assigned as rotate control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.placeShape.value != null) {
            if (i == gamepadControls.placeShape.index && Math.sign(gamepad.axes[i]) * Math.round(Math.abs(gamepad.axes[i])) == gamepadControls.placeShape.value) {
              let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} assigned as placeShape control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.hastenDescent.value != null) {
            if (i == gamepadControls.hastenDescent.index && Math.sign(gamepad.axes[i]) * Math.round(Math.abs(gamepad.axes[i])) == gamepadControls.hastenDescent.value) {
              let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} assigned as hastenDescent control.`;
              endGamepadTest(message);
              return;
            }
          }

          let message = `Test complete. axes[${i}] = ${Math.sign(gamepad.axes[i])} is unassigned.`;
          endGamepadTest(message);
          return;
        }
      }
      for (let i = 0; i < gamepad.buttons.length; ++i) {
        if (gamepad.buttons[i].pressed) {
          if (gamepadControls.left.value == null) {
            if (i == gamepadControls.left.index) {
              let message = `Test complete. buttons[${i}] assigned as left control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.right.value == null) {
            if (i == gamepadControls.right.index) {
              let message = `Test complete. buttons[${i}] assigned as right control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.rotate.value == null) {
            if (i == gamepadControls.rotate.index) {
              let message = `Test complete. buttons[${i}] assigned as rotate control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.placeShape.value == null) {
            if (i == gamepadControls.placeShape.index) {
              let message = `Test complete. buttons[${i}] assigned as placeShape control.`;
              endGamepadTest(message);
              return;
            }
          }
          if (gamepadControls.hastenDescent.value == null) {
            if (i == gamepadControls.hastenDescent.index) {
              let message = `Test complete. buttons[${i}] assigned as hastenDescent control.`;
              endGamepadTest(message);
              return;
            }
          }

          let message = `Test complete. buttons[${i}] is unassigned.`;
          endGamepadTest(message);
          return;
        }
      }
    }
  }, gamepadIntervalDuration);
}


function endGamepadTest(message) {
  updateTestGamepadText(message);
  updateLog(message);
  clearInterval(gamepadSettingsInterval);
  enableSetAndTestButtons();
}


function clearGamepadControl(control) {
  switch (control) {
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
      gamepadControls[control.toString()].index = index;
      gamepadControls[control.toString()].value = value;
      saveGamepadControls();
      break;

    case 'remove':
      gamepadControls[control.toString()].index = null;
      gamepadControls[control.toString()].value = null;
      saveGamepadControls();
      break;

    case 'checkExists':
      let keys = Object.keys(gamepadControls);
      for (let i = 0; i < keys.length; ++i) {
        if (gamepadControls[keys[i]].index == index && gamepadControls[keys[i]].value == value) {
          return true;
        }
      }
      return false;
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
  gamepadDetectionInterval = setInterval(() => {
    //Detect gamepad
    let gamepads = navigator.getGamepads();
    console.log(gamepads)
    let gamepadFound = false;
    for (let i = 0; i < gamepads.length; ++i) {
      if (gamepads[i] != null) {
        gamepadFound = true;
        document.getElementById("gamepadDetectionStatus-configuration").textContent = `Gamepad detected. Index = ${i}`;
        break;
      }
    }
    if (!gamepadFound) {
      document.getElementById("gamepadDetectionStatus-configuration").textContent = 'Gamepad not detected.';
    }
  }, gamepadIntervalDuration);

  //Populate form
  let unparsedGamepadControls = localStorage.getItem('gamepadControls');
  if (unparsedGamepadControls != null) {
    gamepadControls = JSON.parse(unparsedGamepadControls);

    let nullFieldFound = 0;
    if (gamepadControls.left.index != null) {
      if (gamepadControls.left.value != null) {
        document.getElementById('gamepadSettingLeft').textContent = `axes[${gamepadControls.left.index}] = ${gamepadControls.left.value}`;
      } else {
        document.getElementById('gamepadSettingLeft').textContent = `buttons[${gamepadControls.left.index}]`;
      }
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.right.index != null) {
      if (gamepadControls.right.value != null) {
        document.getElementById('gamepadSettingRight').textContent = `axes[${gamepadControls.right.index}] = ${gamepadControls.right.value}`;
      } else {
        document.getElementById('gamepadSettingRight').textContent = `buttons[${gamepadControls.right.index}]`;
      }
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.rotate.index != null) {
      if (gamepadControls.rotate.value != null) {
        document.getElementById('gamepadSettingRotate').textContent = `axes[${gamepadControls.rotate.index}] = ${gamepadControls.rotate.value}`;
      } else {
        document.getElementById('gamepadSettingRotate').textContent = `buttons[${gamepadControls.rotate.index}]`;
      }
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.placeShape.index != null) {
      if (gamepadControls.placeShape.value != null) {
        document.getElementById('gamepadSettingPlaceShape').textContent = `axes[${gamepadControls.placeShape.index}] = ${gamepadControls.placeShape.value}`;
      } else {
        document.getElementById('gamepadSettingPlaceShape').textContent = `buttons[${gamepadControls.placeShape.index}]`;
      }
    } else {
      nullFieldFound++;
    }

    if (gamepadControls.hastenDescent.index != null) {
      if (gamepadControls.hastenDescent.value != null) {
        document.getElementById('gamepadSettingHastenDescent').textContent = `axes[${gamepadControls.hastenDescent.index}] = ${gamepadControls.hastenDescent.value}`;
      } else {
        document.getElementById('gamepadSettingHastenDescent').textContent = `buttons[${gamepadControls.hastenDescent.index}]`;
      }
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

