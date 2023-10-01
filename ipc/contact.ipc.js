exports.contactIpc = async (ipcMain, BrowserWindow, prisma) => {
  ipcMain.on("create-contact", async (event, contact) => {
    console.log(contact)
    await prisma.contact.create({ data: contact });
  });
};
