const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

const isProd = process.env.NODE_ENV === 'prod' ? true : false

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "app", "out", "index.html"),
    protocol: "file",
  });

  // win.loadFile("index.html");
  if (isProd) {
    win.loadURL(startUrl)
  } else {
    win.loadURL(`http://localhost:${3000}`)
  }
}

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
