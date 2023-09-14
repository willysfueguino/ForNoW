//inicializamos el servidor
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const { TestConnection, port } = require("./database/database");
const indexRouter = require("./routes/index.routes");
const entriesRoutes = require("./routes/entries.routes");

const app = express();

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// app.use(helmet());

//motor de vistas de ejs
app.set("view engine", "ejs");
// app.locals.url_for = function (path) {
//   return path;
// };
//establecemos la ruta de la carpeta estatica para los archivos css y js publicos
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(process.cwd(), "/images")))

//establecemos la carpeta views para que encuentre dinamicamente
app.set("views", path.join(__dirname, "./views"));
// console.log(__dirname, "views");
TestConnection();

app.use(indexRouter);
app.use(entriesRoutes);

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
