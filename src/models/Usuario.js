const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getConnection } = require("../database");

let Usuario = function (data) {
  this.data = data;
};

Usuario.verificarUsuario = async function (usuario, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await getConnection();
      let usuario = pool
        .request()
        .query(querys.ConsultarUsuario, (err, result) => {
          res.json(result.recordset);
        });

      if (usuario.length) {
        const token = jwt.sign(
          { nombre: nombreUsuario, isAdmin: false },
          "secretkey",
          { expiresIn: "24h" },
          (err, token) => {
            res.json({
              token
            });
          }
        );
        resolve({ token });
      } else {
        resolve({ msg: "Contraseña o usuario incorrectos" });
      }

      console.log(usuario);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = Usuario;
