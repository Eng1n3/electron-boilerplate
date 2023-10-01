exports.contactIpcWindow = (mainWindow) => {};

exports.contactIpc = async (ipcMain, prisma) => {
  ipcMain.handle("create-contact", async (event, value) => {
    const result = await prisma.contact.create({
      data: value,
    });
    return {
      statusCode: 200,
      message: "Success create data contact",
      data: result,
    };
  });

  ipcMain.handle("get-contact", async (event, value) => {
    const contact = await prisma.contact.findMany();
    return {
      statusCode: 200,
      message: "Success get data contact",
      data: contact,
    };
  });
};
