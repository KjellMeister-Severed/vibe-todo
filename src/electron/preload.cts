const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  subscribeTodos: (callback: (todos: any) => void) => callback({}),
  getHello: () => "Hello from Electron!",
});
