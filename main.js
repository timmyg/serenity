const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ioHook = require("iohook");

function createWindow() {
  console.log("PREELOAD", path.join(__dirname, "preload.js"));
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // preload: path.join(__dirname, "preload.js"),
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

ioHook.on("keydown", (event) => {
  console.log({ event });
  console.log(String.fromCharCode(event.keycode));
  console.log("keydown");
  mainWindow.webContents.send(
    "iohook-keydown",
    String.fromCharCode(event.keycode)
  );
});

ioHook.on("mousemove", (event) => {
  console.log("mousemove");
  mainWindow.webContents.send("iohook-mousemove", { x: event.x, y: event.y });
});

ioHook.start();

ipcMain.on("iohook-start", () => {
  ioHook.start();
});

ipcMain.on("iohook-stop", () => {
  ioHook.stop();
});

app.whenReady().then(createWindow);
