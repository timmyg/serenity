import { app, BrowserWindow, ipcMain } from 'electron'
const ioHook = require('iohook')

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// Set up a flag to track activity status
let isActive = false

// Function to send the status event
const sendStatusEvent = () => {
  const status = isActive ? 'active' : 'inactive'
  console.log({ sendStatusEvent: status })
  mainWindow?.webContents.send('status-event', status)
  isActive = false
}

// Function to set the activity flag to true
const setActivity = () => {
  isActive = true
}

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  // Event listeners for keydown, mousemove, and mouseclick
  ioHook.on('keydown', () => {
    setActivity()
  })

  ioHook.on('mousemove', () => {
    setActivity()
  })

  ioHook.on('mouseclick', () => {
    setActivity()
  })

  ioHook.start()

  ipcMain.on('iohook-start', () => {
    ioHook.start()
  })

  ipcMain.on('iohook-stop', () => {
    ioHook.stop()
  })

  // Start the global app-level timer
  setInterval(() => {
    // isActive = false
    sendStatusEvent()
  }, 1000)
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
