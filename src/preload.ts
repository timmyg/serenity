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
