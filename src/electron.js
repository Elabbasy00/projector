const electron = require('electron');

// Module to control application life.

const app = electron.app;

// Module to create native browser window.

const BrowserWindow = electron.BrowserWindow;

const path = require('path');

const url = require('url');

const { ipcMain } = require('electron');

const electronScreen = electron.screen;

const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let projectorDisplay;
let gameWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Reviwer',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  const startUrl = isDev
    ? 'http://localhost:3000/'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  gameWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    title: 'Projector',
    show: false,
  });

  mainWindow.loadURL(startUrl);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    gameWindow.close();
    mainWindow = null;
    gameWindow = null;
    app.quit();
  });
  ipcMain.handle('REQUEST_PROJECTOR_MODE', async () => {
    let promise = new Promise((resolve) => {
      projectorDisplay = electronScreen.getAllDisplays().find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
      });
      if (projectorDisplay !== undefined) {
        gameWindow.setBounds({
          x: projectorDisplay.bounds.x + 50,
          y: projectorDisplay.bounds.y + 50,
        });

        gameWindow.show();
        gameWindow.maximize();
        resolve(true);
      } else {
        resolve(false);
      }
    });
    return await promise;
  });

  const projectorUrl = isDev
    ? 'http://localhost:3000/projector/'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  gameWindow.loadURL(projectorUrl);

  gameWindow.webContents.executeJavaScript("location.assign('/projector/');");
}

app.on('ready', () => {
  createWindow();
  ipcMain.on('nameMsg', (event, arg) => {
    event.sender.send('nameReply', { not_right: false });
    gameWindow.webContents.send('forWin2', arg);
  });

  ipcMain.on('sendGallery', (event, arg) => {
    event.sender.send('galleryReplay', { not_right: false });
    mainWindow.webContents.send('forGallary', arg);
  });
  ipcMain.on('ChangePage', (event, arg) => {
    event.sender.send('ChangePageReplay', { not_right: false });
    gameWindow.webContents.send('ChangePageWin2', arg);
  });
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
