// This is the main entry point of your Electron application. It is
// responsible for creating the application window and handling
// system events. It runs in the main process and has full Node.js
// and Electron API access. You can do things like control the
// application lifecycle, create and control browser windows,
// and handle system-level operations in this script.

import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
// import * as ioHook2 from "iohook";
const ioHook = require("iohook");
// console.log({ ioHook, ioHook2 });

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  console.log("PREELOAD", path.join(__dirname, "preload.js"));
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // mainWindow.loadFile("index.html");
  // mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

ioHook.on("keydown", (event: any) => {
  console.log({ event });
  console.log(String.fromCharCode(event.keycode));
  console.log("keydown");
  mainWindow?.webContents.send(
    "iohook-keydown",
    String.fromCharCode(event.keycode)
  );
});

ioHook.on("mousemove", (event: any) => {
  console.log("mousemove");
  mainWindow?.webContents.send("iohook-mousemove", { x: event.x, y: event.y });
});

ioHook.start();

ipcMain.on("iohook-start", () => {
  ioHook.start();
});

ipcMain.on("iohook-stop", () => {
  ioHook.stop();
});

app.whenReady().then(createWindow);
