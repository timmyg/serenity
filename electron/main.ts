import { app, BrowserWindow, ipcMain, systemPreferences } from 'electron';
// import { IpcChannel } from './bridge';
import { grey } from '@mui/material/colors';
import { Status } from '../src/components/Home/Home';

let mainWindow: BrowserWindow | null;
let ioHook: any = null;

let accessibilityCheckInterval: any = null;
let statusCheckInterval: any = null;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export type StatusEvent = {
  status: Status;
  timestamp: Date;
};

const checkActivitySeconds = 1;
const checkPermissionsSeconds = 2;
let isActive = false;

const setActivity = () => {
  isActive = true;
};

const sendStatusEvent = () => {
  const status: Status = isActive ? 'active' : 'inactive';
  const statusEvent: StatusEvent = {
    status,
    timestamp: new Date(),
  };
  mainWindow?.webContents.send('status-event', statusEvent);
  isActive = false;
};

const setupIOHook = () => {
  ioHook = require('iohook');

  ioHook.on('keydown', setActivity);
  ioHook.on('mousemove', setActivity);
  ioHook.on('mouseclick', setActivity);
  ioHook.on('mousewheel', setActivity);

  ioHook.start();
};

const checkAccessibiltyPermissionEvent = () => {
  const initialHasGrantedAccessibilityAccess =
    systemPreferences.isTrustedAccessibilityClient(false);

  if (initialHasGrantedAccessibilityAccess && ioHook === null) {
    setupIOHook();
    if (!statusCheckInterval) {
      statusCheckInterval = setInterval(
        sendStatusEvent,
        checkActivitySeconds * 1000
      );
    }
  }

  // TODO, prob a better way to do this
  accessibilityCheckInterval = setInterval(() => {
    const hasGrantedAccessibilityAccess =
      systemPreferences.isTrustedAccessibilityClient(false);
    if (
      initialHasGrantedAccessibilityAccess !== hasGrantedAccessibilityAccess
    ) {
      console.debug(
        'reloading due to permission change, does not reload gracefully locally'
      );
      // mainWindow?.reload();
      app.relaunch();
      app.quit(); // the application will be closed as soon as possible
    }
  }, checkPermissionsSeconds * 1000);

  // console.log({ hasGrantedAccessibilityAccess, ioHook });
  mainWindow?.webContents.send(
    'has-accessibility-permission',
    initialHasGrantedAccessibilityAccess
  );
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: grey[500],
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    if (accessibilityCheckInterval) {
      clearInterval(accessibilityCheckInterval);
    }
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    checkAccessibiltyPermissionEvent();
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    ipcMain.on(
      'check-accessibility-permissions',
      checkAccessibiltyPermissionEvent
    );
    // ipcMain.on('message', (_, message) => {
    //   console.log({ message });
    // });
    ipcMain.on('grantaccessibility', (_, message) => {
      setupIOHook();
    });
  })
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
