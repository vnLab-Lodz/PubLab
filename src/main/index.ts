import path from 'path';
import { app, BrowserWindow } from 'electron';
import installDevToolsExtensions from './devToolsExtensions';
import registerApiHandlers from './api';
import { configStore } from '../shared/redux/configureStore';
import syncCheck from './utils/git/syncCheck';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

export const mainStore = configStore('main');

let mainWindow: InstanceType<typeof BrowserWindow>;
const gotTheLock = app.requestSingleInstanceLock();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

// Deep links | Electron - example of protocol definition/handling
// https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app#main-process-mainjs
if (process.defaultApp) {
  // Check if arguments contain both exec path process.argv[0]
  // and current js executable file path process.argv[1]
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('publab', process.execPath, [
      // This path will be passed to the executable as an argument
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  // Defaults to process.execPath if no arguments need
  // to be passed to the executable
  app.setAsDefaultProtocolClient('publab');
}

const createWindow = async (): Promise<void> => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1024,
    width: 1280,
    backgroundColor: '#111111',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      enableRemoteModule: true,
      nodeIntegration: true,
      defaultFontSize: 10,
    },
  });

  mainWindow.on('focus', () => syncCheck(mainStore));

  // and load the index.html of the app.
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (!app.isPackaged) mainWindow.webContents.openDevTools();
};

if (!gotTheLock) {
  app.quit();
} else {
  registerApiHandlers();

  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    if (!app.isPackaged) await installDevToolsExtensions();

    await createWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}
