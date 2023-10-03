const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { contactIpc, contactIpcWindow } = require("./ipc/contact.ipc");
const SqliteDb = require("./connections/sqlite.connection");

const sqlite = SqliteDb.getInstance();

const isDev = process.env.NODE_ENV === "dev";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "app", "out", "index.html"),
    protocol: "file",
  });

  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL(`http://localhost:${3000}`);
  } else {
    win.loadURL(startUrl);
  }
}

(async () => {
  await app.whenReady();
  createWindow();
  const contactDb = await sqlite.connectionContact;
  const dapobudLocalDb = await sqlite.connectionDapobudLocal;
  const dapobudServerDb = await sqlite.connectionDapobudServer;
  await contactIpc(ipcMain, contactDb);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

app.on("window-all-closed", async () => {
  await sqlite.connectionContact.close();
  await sqlite.connectionDapobudLocal.close();
  await sqlite.connectionDapobudServer.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
