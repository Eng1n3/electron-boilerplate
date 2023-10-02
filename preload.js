const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => "pong",
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("dapobudLocal", {
  getDapobud: () => ipcRenderer.invoke("get-dapobud"),
});

contextBridge.exposeInMainWorld("contact", {
  deleteContact: (value) => ipcRenderer.invoke("delete-contact", value),
  updateContact: (value) => ipcRenderer.invoke("update-contact", value),
  getContact: (value) => ipcRenderer.invoke("get-contact", value),
  getOneContact: (value) => ipcRenderer.invoke("get-one-contact", value),
  createContact: (value) => ipcRenderer.invoke("create-contact", value),
});
