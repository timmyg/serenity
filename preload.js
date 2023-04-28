// preload.js

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  requestMousePosition: () => {
    ipcRenderer.send("requestMousePosition");
  },
  onReceiveMousePosition: (callback) => {
    ipcRenderer.on("receiveMousePosition", (event, mousePosition) => {
      callback(mousePosition);
    });
  },
  requestKeyPress: () => {
    ipcRenderer.send("requestKeyPress");
  },
  onReceiveKeyPress: (callback) => {
    ipcRenderer.on("receiveKeyPress", (event, key) => {
      callback(key);
    });
  },
});
