const { v4: uuidv4 } = require("uuid");

exports.contactIpc = async (ipcMain, contactDb) => {
  ipcMain.handle("delete-contact", async (event, value) => {
    const result = await contactDb.run(
      `UPDATE SET contact deletedAt = now() where id = ?`,
      value.id
    );
    return {
      statusCode: 200,
      message: "Success delete data contact",
      data: result,
    };
  });

  ipcMain.handle("update-contact", async (event, value) => {
    const result = await contactDb.run(
      `UPDATE SET contact email = ?, name = ? WHERE id = ?`,
      [value.email, value.name, value.id]
    );
    return {
      statusCode: 200,
      message: "Success update data contact",
      data: result,
    };
  });

  ipcMain.handle("create-contact", async (event, value) => {
    const result = await contactDb.run(
      `INSERT INTO contact (id, email, name) VALUES (?, ?, ?)`,
      [uuidv4(), value.email, value.name]
    );
    return {
      statusCode: 200,
      message: "Success create data contact",
      data: result,
    };
  });

  ipcMain.handle("get-contact", async (event, value) => {
    const [contacts] = await contactDb.all(`SELECT * FROM contact`);
    return {
      statusCode: 200,
      message: "Success get data contact",
      data: contacts,
    };
  });

  ipcMain.handle("get-one-contact", async (event, value) => {
    const contact = await prisma.contact.findUnique({
      where: { id: value },
    });

    return {
      statusCode: 200,
      message: "Success get data contact",
      data: contact,
    };
  });
};
