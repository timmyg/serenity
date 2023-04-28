// renderer.js

function logMousePosition(mousePosition) {
  console.log(`Mouse position: X: ${mousePosition.x}, Y: ${mousePosition.y}`);
}

function logKeyPress(key) {
  console.log(`Key pressed: ${key}`);
}

// Request mouse position and set up a listener for position updates
electron.requestMousePosition();
electron.onReceiveMousePosition(logMousePosition);

// Request key press events and set up a listener for them
electron.requestKeyPress();
electron.onReceiveKeyPress(logKeyPress);
