const { app, BrowserWindow } = require("electron");
const serve = require("./serve");

const path = require("path");
const isDev = require("electron-is-dev");

const loadURL = serve({
  directory: "build",
  scheme: "app",
});

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({ width: 900, height: 680 });

  isDev
    ? await mainWindow.loadURL("http://localhost:3000")
    : await loadURL(mainWindow);

  // await loadURL(mainWindow);

  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.setMenu(null);

  // & devtools
  // mainWindow.webContents.openDevTools();
  isDev ? mainWindow.webContents.openDevTools() : null;
})();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
