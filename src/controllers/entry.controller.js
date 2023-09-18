const Entry = require("../models/entries.model");
const entriesController = {};

//TODO: INDEX USER
// entriesController.indexUsers = (req, res) => {
//   res.render("user", { titleuser: "Usuarios" });
// };
//TODO: GETALL
entriesController.getAllEntries = async (req, res) => {
  const entries = await Entry.findAll();

  res.render("Entry", { titleUser: "Posts", results: entries });
};

//TODO: POST: PAGINA DE INICIO
entriesController.formCreateEntry = (req, res) => {
  res.render("createEntry", { titleCreateUser: "Nuevo Post" });
};

//PARA CREAR AL USUARIO
entriesController.postEntry = async (req, res) => {
  const { entrySubject, entryBody, pictureLink } = req.body;
  console.log(req.body);
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

//TODO: PUT PAGINA PARA EDITAR USUARIO
entriesController.formEditEntry = async (req, res) => {
  const { id } = req.params;
  const user = await Entry.findOne({ where: { id: id } });
  console.log(user);
  res.render("editUser", {
    titleEditUser: "Editar Usuario",
    user: user,
  });
};

entriesController.putEntry = async (req, res) => {
  const { firstName, email, id } = req.body;
  //validación de que no mande el dato del nombre para actualizar
  if (!firstName || !email) {
    return res.status(404).send({
      message:
        "Es necesario que el parametro firstName o LastName tenga información para actualizar",
    });
  }
  const updateEntry = Entry.update(
    {
      firstName: firstName,
      email: email,
    },
    { where: { id: id } }
  );
  return res.redirect("/entries");
  //res.send({ message: "Usuario editado con exito" });
};

//TODO:DELETE

entriesController.deleteEntry = (req, res) => {
  const { id } = req.params;
  const deleteEntry = Entry.destroy({ where: { id: id } });
  //validacion para saber si ya existe o no en la bd
  if (deleteEntry) {
    return res.redirect("/entries");
    // res
    //   .status(200)
    //   .send({ message: "Usuario eliminado de la base de datos" });
  } else {
    // return res
    //   .status(400)
    //   .send({ message: "Usuario no existe en la base de datos" })
  }
};

module.exports = { entriesController };
