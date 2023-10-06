const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { contactIpc } = require("./ipc/contact.ipc");
const { Contact, ContactImage, sequelize } = require("./models/contact.model");

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

  return win;
}

(async () => {
  await app.whenReady();
  const mainWindow = await createWindow();
  await contactIpc(ipcMain, Contact, ContactImage);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

app.on("window-all-closed", async () => {
  sequelize.close()
  if (process.platform !== "darwin") {
    app.quit();
  }
});
