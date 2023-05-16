const { contextBridge, ipcRenderer } = require("electron");
// const iohook = require("iohook");
const iohookPath = require.resolve("iohook");
const iohook = require(iohookPath);

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

contextBridge.exposeInMainWorld("iohook", {
  start: () => {
    iohook.start();
  },
});
