// main.ts (updated with show/hide behavior)
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";

let mainWindow: BrowserWindow;
let catWindow: BrowserWindow;

function repositionCatWindow() {
  if (!mainWindow || !catWindow) return;
  const bounds = mainWindow.getBounds();
  catWindow.setBounds({
    x: bounds.x + bounds.width - 600,
    y: bounds.y - 100,
    width: 500,
    height: 150,
  });
  catWindow.setHasShadow(false);
}

ipcMain.on("window-close", () => {
  mainWindow.close();
  app.quit();
});

ipcMain.on("window-minimize", () => {
  mainWindow.minimize();
});

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 900,
    frame: false,
    hasShadow: false,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  mainWindow.on("move", repositionCatWindow);
  mainWindow.on("resize", repositionCatWindow);
  mainWindow.on("show", () => catWindow.show());
  mainWindow.on("hide", () => catWindow.hide());
  mainWindow.on("minimize", () => catWindow.hide());
  mainWindow.on("restore", () => catWindow.show());
}

function createCatWindow() {
  catWindow = new BrowserWindow({
    width: 500,
    height: 200,
    hasShadow: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focusable: false,
    backgroundColor: "#00000000",
    show: true,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (process.env.NODE_ENV === "development") {
    catWindow.loadURL("http://localhost:5123/cat");
  } else {
    catWindow.loadFile(path.join(app.getAppPath(), "/dist-react/cat.html"));
  }
}

app.on("ready", () => {
  createMainWindow();
  createCatWindow();
  repositionCatWindow();
});
