const entriesRoutes = require("express").Router();
const { entriesController } = require("../controllers/entry.controller");


//ruta GET INDEX
//entriesRoutes.get("/user", entriesController.indexUsers);

//ruta GET ALL USERS
entriesRoutes.get("/entries", entriesController.getAllEntries);

//ruta GET POST BY TEXT
entriesRoutes.post("/searchPost", entriesController.getEntryByText);

//ruta POST (crear usuario)
entriesRoutes.get("/createEntry", entriesController.formCreateEntry);
entriesRoutes.post("/saveEntry", entriesController.postEntry);

//ruta PUT (actualizar al usuario)
entriesRoutes.get("/editEntry/:id", entriesController.formEditEntry);
entriesRoutes.post("/updateEntry", entriesController.putEntry);

//ruta DELETE (eliminar)
entriesRoutes.get("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = entriesRoutes;
