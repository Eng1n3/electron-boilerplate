const { join } = require("path");
const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(process.cwd(), "databases", "contact.sqlite"),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
