// The preload script has a unique role in Electron applications. It
// runs before the renderer process is loaded, and it has access to
// Node.js and Electron APIs, just like the main process. Its primary
// purpose is to create a safe bridge between the renderer process
// (which is isolated for security reasons) and the main process.
// You can use it to selectively expose features to the renderer
// process, which you can then use in your front-end code.

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ioHook", {
  start: () => ipcRenderer.send("iohook-start"),
  stop: () => ipcRenderer.send("iohook-stop"),
  on: (event: string, callback: (data: any) => void) => {
    ipcRenderer.on(`iohook-${event}`, (ipcEvent, data) => {
      callback(data);
    });
  },
});
