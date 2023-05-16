const { app, BrowserWindow } = require("electron");
const iohook = require("iohook");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
  });

  win.loadFile("index.html");

  iohook.on("mousemove", (event) => {
    console.log("mousemove");
    win.webContents.send("iohook-event", event);
  });

  iohook.on("keydown", (event) => {
    console.log("keydown");
    win.webContents.send("iohook-event", event);
  });

  win.on("close", () => {
    iohook.unload();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
