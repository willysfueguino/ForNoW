const User = require("../models/entries.model");
const controllerUsers = {};

//TODO: INDEX USER
// controllerUsers.indexUsers = (req, res) => {
//   res.render("user", { titleuser: "Usuarios" });
// };
//TODO: GETALL
controllerUsers.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.render("user", { titleUser: "Usuarios", results: users });
};

//TODO: GET
// controllerUsers.getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ where: { id: id } });
//     if (!user) {
//       return res.status(400).send({
//         message: "Usuario no encontrado en la base de datos",
//       });
//     } else {
//       return res.send(user);
//     }
//   } catch (error) {}
// };

//TODO: POST: PAGINA DE INICIO
controllerUsers.formCreateUser = (req, res) => {
  res.render("createUser", { titleCreateUser: "Nuevo Usuario" });
};

//PARA CREAR AL USUARIO
controllerUsers.postUser = async (req, res) => {
  const { firstName, email } = req.body;

  //validacion para los datos del body
  if (!firstName || !email)
    return res.status(400).send({
      message: "Por favor ingresar los datos del nombre y apellido del usuario",
    });
  //manejamos el error con trycatch
  try {
    const user = {
      firstName: firstName,
      email: email,
    };
    if (!user) {
      return res
        .status(409)
        .send({ message: "Usuario ya existe en la base de datos" });
    } else {
      const newUser = await User.create(user);
      return res.redirect("/user");
      //res.send({ message: "Usuario creado con exito" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//TODO: PUT PAGINA PARA EDITAR USUARIO
controllerUsers.formEditUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } });
  console.log(user);
  res.render("editUser", {
    titleEditUser: "Editar Usuario",
    user: user,
  });
};

controllerUsers.putUser = async (req, res) => {
  const { firstName, email, id } = req.body;
  //validación de que no mande el dato del nombre para actualizar
  if (!firstName || !email) {
    return res.status(404).send({
      message:
        "Es necesario que el parametro firstName o LastName tenga información para actualizar",
    });
  }
  const updateUser = User.update(
    {
      firstName: firstName,
      email: email,
    },
    { where: { id: id } }
  );
  return res.redirect("/user");
  //res.send({ message: "Usuario editado con exito" });
};

//TODO:DELETE

controllerUsers.deleteUser = (req, res) => {
  const { id } = req.params;
  const deleteUser = User.destroy({ where: { id: id } });
  //validacion para saber si ya existe o no en la bd
  if (deleteUser) {
    return res.redirect("/user");
    // res
    //   .status(200)
    //   .send({ message: "Usuario eliminado de la base de datos" });
  } else {
    // return res
    //   .status(400)
    //   .send({ message: "Usuario no existe en la base de datos" })
  }
};

module.exports = { controllerUsers };
