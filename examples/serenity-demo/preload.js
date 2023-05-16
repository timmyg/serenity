const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ioHook", {
  start: () => ipcRenderer.send("iohook-start"),
  stop: () => ipcRenderer.send("iohook-stop"),
  on: (event, callback) => {
    ipcRenderer.on(`iohook-${event}`, (ipcEvent, data) => {
      callback(data);
    });
  },
});
