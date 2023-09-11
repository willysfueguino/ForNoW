const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const port = process.env.PORT;

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: "postgres",
  port: 3333
});

async function TestConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("No se pudo conectar Error:", error);
  }
}

module.exports = { TestConnection, port, sequelize };
