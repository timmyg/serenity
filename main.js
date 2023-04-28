// main.js

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const robot = require("robotjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle the requestMousePosition event
ipcMain.on("requestMousePosition", (event) => {
  setInterval(() => {
    const mousePosition = robot.getMousePos();
    event.sender.send("receiveMousePosition", mousePosition);
  }, 100);
});

// Handle the requestKeyPress event
// ipcMain.on("requestKeyPress", (event) => {
// Define the keys you want to detect
//   const keysToDetect = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     // "enter",
//     // "shift",
//     // "ctrl",
//     // "alt",
//   ];

//   setInterval(() => {
//     for (const key of keysToDetect) {
//       if (robot.keyToggle(key, "down")) {
//         event.sender.send("receiveKeyPress", key);
//       }
//     }
//   }, 100);
// });
