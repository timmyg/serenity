import { app, BrowserWindow, ipcMain, systemPreferences } from 'electron';

let mainWindow: BrowserWindow | null;
let ioHook: any = null;

let accessibilityCheckInterval: any = null;
let statusCheckInterval: any = null;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const checkActivitySeconds = 1;
let isActive = false;

const setActivity = () => {
  isActive = true;
};

const sendStatusEvent = () => {
  const status = isActive ? 'active' : 'inactive';
  console.log({ isActive });
  mainWindow?.webContents.send('status-event', status);
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

const sendAccessibiltyPermissionEvent = () => {
  const hasGrantedAccessibilityAccess =
    systemPreferences.isTrustedAccessibilityClient(false);

  if (hasGrantedAccessibilityAccess && ioHook === null) {
    setupIOHook();
    if (!statusCheckInterval) {
      statusCheckInterval = setInterval(
        sendStatusEvent,
        checkActivitySeconds * 1000
      );
    }
  }

  // console.log({ hasGrantedAccessibilityAccess, ioHook });
  mainWindow?.webContents.send(
    'has-accessibility-permission',
    hasGrantedAccessibilityAccess
  );
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
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
    sendAccessibiltyPermissionEvent();

    // Start the interval
    // TODO, prob dont need to do this every 2 seconds
    accessibilityCheckInterval = setInterval(() => {
      sendAccessibiltyPermissionEvent();
    }, checkActivitySeconds * 2000);
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    ipcMain.on(
      'check-accessibility-permissions',
      sendAccessibiltyPermissionEvent
    );
    // ipcMain.on('message', (_, message) => {
    //   console.log({ message });
    // });
    ipcMain.on('grantaccessibility', (_, message) => {
      // console.log({ message });
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
