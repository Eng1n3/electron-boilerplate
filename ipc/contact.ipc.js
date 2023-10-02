exports.contactIpcWindow = (mainWindow) => {};

exports.contactIpc = async (ipcMain, prisma) => {
  ipcMain.handle("delete-contact", async (event, value) => {
    const result = await prisma.contact.delete({
      where: { id: value.id },
    });
    return {
      statusCode: 200,
      message: "Success delete data contact",
      data: result,
    };
  });

  ipcMain.handle("update-contact", async (event, value) => {
    const result = await prisma.contact.update({
      where: { id: value.id },
      data: { email: value.email, name: value.name },
    });
    return {
      statusCode: 200,
      message: "Success update data contact",
      data: result,
    };
  });

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
