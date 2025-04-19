const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  close: () => ipcRenderer.send("window-close"),
  minimize: () => ipcRenderer.send("window-minimize"),
});
