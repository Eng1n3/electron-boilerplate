const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../connections/sqlite.connections");

const ContactImage = sequelize.define("contacts_images", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

const Contact = sequelize.define("contacts", {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ContactImageId: {
    type: DataTypes.STRING,
    field: "imageId",
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

ContactImage.hasOne(Contact);
Contact.belongsTo(ContactImage, {
  foreignKey: "imageId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Success connect database contact')
  } catch (error) {
    throw error;
  }
})();

module.exports = { Contact, ContactImage, sequelize };
