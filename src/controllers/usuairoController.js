const Usuario = require("../models/Usuario");

exports.validarUsuario = async (req, res) => {
  try {
    let respuesta = await Usuario.verificarUsuario(
      req.params.usuario,
      req.params.pass
    );
    if (respuesta.token) {
      return res.send(respuesta);
    } else {
      return res.status(403).send(respuesta);
    }
  } catch (error) {
    console.log(error);
  }
};
