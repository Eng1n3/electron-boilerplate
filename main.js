const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

const {
  PrismaClient: DapobudLocalPrisma,
} = require("./prisma/generated/dapobud-local");
const {
  PrismaClient: DapobudServerPrisma,
} = require("./prisma/generated/dapobud-server");
const { dapobudLocalIpc } = require("./ipc/dapobud-local.ipc");

const dapobudLocalPrisma = new DapobudLocalPrisma();
const dapobudServerPrisma = new DapobudServerPrisma();
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
  await dapobudLocalIpc(ipcMain, dapobudLocalPrisma);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
