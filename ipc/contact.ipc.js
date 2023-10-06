const { Op } = require("sequelize");

exports.contactIpc = async (ipcMain, Contact, ContactImage) => {
  ipcMain.handle("delete-contact", async (event, value) => {
    await Contact.update(
      { deletedAt: new Date() },
      {
        where: {
          id: value.id,
        },
      }
    );
    return {
      statusCode: 200,
      message: "Success delete data contact",
    };
  });

  ipcMain.handle("update-contact", async (event, value) => {
    await Contact.update(
      {
        name: value.name,
        email: value.email,
        gender: value.gender,
        phoneNumber: value.phoneNumber,
      },
      {
        where: {
          id: value.id,
        },
      }
    );
    return {
      statusCode: 200,
      message: "Success update data contact",
    };
  });

  ipcMain.handle("create-contact", async (event, value) => {
    const contactImage = ContactImage.build({
      filename: "test",
      originalName: "testi",
      mimeType: "image/jpeg",
    });
    await contactImage.save();
    const contact = Contact.build({
      name: value.name,
      email: value.email,
      gender: value.gender,
      phoneNumber: value.phoneNumber,
      imageId: contactImage.id,
    });
    await contact.save();
    return {
      statusCode: 200,
      message: "Success create data contact",
    };
  });

  ipcMain.handle("get-contact", async (event, value) => {
    const { count, rows } = await Contact.findAndCountAll({
      where: { deletedAt: { [Op.is]: null } },
    });
    const result = rows?.map((res) => res.dataValues);
    return {
      statusCode: 200,
      message: "Success get data contact",
      data: { data: result, count },
    };
  });

  ipcMain.handle("get-one-contact", async (event, value) => {
    const contacts = await Contact.findOne({
      where: { id: value.id, deletedAt: { [Op.is]: null } },
    });
    return {
      statusCode: 200,
      message: "Success get data contact",
      data: contacts?.dataValues ?? {},
    };
  });
};
