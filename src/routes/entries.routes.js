const entriesRoutes = require("express").Router();
const { entriesController } = require("../controllers/entry.controller");


//ruta GET INDEX
//entriesRoutes.get("/user", entriesController.indexUsers);

//ruta GET ALL USERS
entriesRoutes.get("/user", entriesController.getAllUsers);

//ruta GET USER BY ID
// entriesRoutes.get("/user/:id", entriesController.getUserById);

//ruta POST (crear usuario)
entriesRoutes.get("/createUser", entriesController.formCreateUser);
entriesRoutes.post("/saveUser", entriesController.postUser);

//ruta PUT (actualizar al usuario)
entriesRoutes.get("/editUser/:id", entriesController.formEditUser);
entriesRoutes.post("/updateUser", entriesController.putUser);

//ruta DELETE (eliminar)
entriesRoutes.get("/deleteUser/:id", entriesController.deleteUser);

module.exports = entriesRoutes;
