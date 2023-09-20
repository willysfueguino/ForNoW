const { sequelize } = require("../database/database");
const Entry = require("../models/entries.model");
const entriesController = {};

entriesController.getEntryByText = async (req, res) => {
  const queryText = req.body.queryText;
  console.log("query");

  try {
    const entries = await Entry.findOne({
      where: {entrySubject:queryText }
    });
    // console.log(entries);
    if (entries != null) {
      res.status(201).send({ title: "Posts", results: entries });  
    } else {
      res.render("index", { title: "No results found", results: entries });  
    }
  } catch (error) {
    console.log("err: " + error);
  } 
  
}

//Controller listar todas las entradas
entriesController.getAllEntries = async (req, res) => {
  const entries = await Entry.findAll();

  res.render("Entry", { title: "Posts", results: entries });
};

//Controller form creacion de entradas
entriesController.formCreateEntry = (req, res) => {
  res.render("createEntry", { titleCreateUser: "Nuevo Post" });
};

//Controller para crear entradas
entriesController.postEntry = async (req, res) => {
  const { entrySubject, entryBody, pictureLink } = req.body;
  // console.log(req.body);
  //validacion para los datos del body
  if (!entrySubject || !entryBody)
    return res.status(400).send({
      message: "Por favor ingresar los datos del nombre y apellido del usuario",
    });
  //manejamos el error con trycatch
  try {
    const entry = {
      entrySubject: entrySubject,
      entryBody: entryBody,
      pictureLink: pictureLink
    };
    if (!entry) {
      return res
        .status(409)
        .send({ message: "Usuario ya existe en la base de datos" });
    } else {
      const newEntry = await Entry.create(entry);
      return res.redirect("/entries");
      //res.send({ message: "Usuario creado con exito" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//Controllers para editar entradas
entriesController.formEditEntry = async (req, res) => {
  const { id } = req.params;
  const entry = await Entry.findOne({ where: { id: id } });
  console.log(entry);
  res.render("editEntry", {
    titleEditEntry: "Editar Post",
    entry: entry,
  });
};

entriesController.putEntry = async (req, res) => {
  const { entryBody, entrySubject, pictureLink, id } = req.body;
  //validación de que mande datos para actualizar
  if (!entryBody || !entrySubject) {
    return res.status(404).send({
      message:
        "Es necesario que el cuerpo del post o el titulo tenga información para actualizar",
    });
  }
  const updateEntry = Entry.update(
    {
      entryBody: entryBody,
      entrySubject: entrySubject,
      pictureLink: pictureLink,
    },
    { where: { id: id } }
  );
  return res.redirect("/entries");
  //res.send({ message: "Usuario editado con exito" });
};

//Controller para borrar entradas
entriesController.deleteEntry = async (req, res) => {
  const { id } = req.params;
  const deleteEntry = await Entry.update({isDeleted: true},{ where: { id: id }});
  //validacion para saber si ya existe o no en la bd
  if (deleteEntry) {
    return res.redirect("/entries");
    // res
    //   .status(200)
    //   .send({ message: "Usuario eliminado de la base de datos" });
  } else {
    return res
      .status(400)
      .send({ message: "Usuario no existe en la base de datos" })
  }
};

module.exports = { entriesController };
