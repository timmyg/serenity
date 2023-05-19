import Electron, { contextBridge, ipcRenderer } from 'electron';

interface IpcRendererAPI {
  send: (channel: string, ...args: any[]) => void;
  on: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => void;
}

const ipc: IpcRendererAPI = {
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  },
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  },
};

const mainApi = {
  sendMessage: (message: string) => {
    ipc.send('message', message);
  },
  grantAccessibility: () => {
    ipc.send('grantaccessibility', true);
  },
  on: (channel: string, callback: Function) => {
    ipc.on(channel, (_, data) => callback(data));
  },
};

// const ioHookApi = {
// start: () => ipc.send('iohook-start'),
// stop: () => ipc.send('iohook-stop'),
// on: (event: string, callback: (data: any) => void) => {
//   ipc.on(`iohook-${event}`, (ipcEvent, data) => {
//     console.log('iohook', 'event')
//     callback(data)
//   })
// },
// }

contextBridge.exposeInMainWorld('Main', mainApi);
// contextBridge.exposeInMainWorld('ioHook', ioHookApi)
