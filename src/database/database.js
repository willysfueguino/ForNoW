//IMPORTACION DE DEPENDENCIAS
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

//CONFIGURACION DE VARIABLES DE ENTORNO
dotenv.config({ path: "../.env" });

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const port = process.env.PORT;
//INICIALIZACION DE BASE DE DATOS
const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: "postgres",
  port: dbport
});
//SE DEFINE FUNCION DE PRUEBA DE CONEXION DE BASE DE DATOS
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
