const Conexion = require("../database/conection");
const querys = require("../database/querys");
const querysVimar = require("../database/querysVimarRRHH");
const sql2 = require("mssql");
var jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

exports.AutenticacionLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(CryptoJS.MD5(password).toString());
    const pool = await Conexion.conectarBD();

    const result = await pool
      .request()
      .input("usuario", username)
      .input("password", CryptoJS.MD5(password).toString())
      .query(querys.ConsultarUsuario);

    ////////////////////////////////////////////////////////////
    if (result.rowsAffected > 0) {
      jwt.sign(
        { datos: result.recordset },
        "vm$$123456",
       // { expiresIn: "24h" },
        (err, token) => {
          res.json({
            token
          });
        }
      );
    } else {
      return res.json({ msg: "Validacion incorrecta" });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

exports.getLotes = async (req, res) => {
  try {
    const pool = await Conexion.conectarBD();

    pool.request().query(querys.getAllLotes, (err, result) => {
      if (result.recordset.length) {
        return res.json({ msg: result.recordset });
      } else {
        return res.json({ msg: "NO SE ENCONTRARON RESULTADOS" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLotesVisualizacion = async (req, res) => {
  try {
    const pool = await Conexion.conectarBD();

    pool.request().query(querys.getVisualizacionRegistrosPTC, (err, result) => {
      if (result.recordset.length) {
        return res.json(result.recordset);
      } else {
        return res.json({ msg: "NO SE ENCONTRARON RESULTADOS" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMenuDiario = async (req, res) => {
  try {
    const pool = await Conexion.conectarBD();

    pool.request().query(querys.getMenuDiario, (err, result) => {
      if (result.recordset.length) {
        pool.close();
        return res.json(result.recordset);
      } else {
        return res.json({ msg: "NO SE ENCONTRARON RESULTADOS" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMenuDiarioSemana = async (req, res) => {
  try {
    const pool = await Conexion.conectarBD();

    pool.request().query(querysVimar.getmenuSemana, (err, result) => {
      if (result.recordset.length) {
        pool.close();
        return res.json(result.recordset);
      } else {
        return res.json({ msg: "NO SE ENCONTRARON RESULTADOS" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getValidacionHorasConsultasMenuDiario = async (req, res) => {
  try {
    return res.json({ desde: 5, hasta: 10 });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.crearRegistroMenuPersona = async (req, res) => {
  const { id_usuario, id_menu } = req.body;

  if (id_usuario == null || id_usuario == "") {
    return res.json({
      mensaje: "INGRESE CODIGO DEL PERSONAL.",
      tipo_mensaje: 20
    });
  }
  if (id_menu == null || id_menu == "") {
    return res.json({
      mensaje: "NO SE HA REGISTRADO EL MENU DEL DIA.",
      tipo_mensaje: 20
    });
  }
  try {
    const output_value = await Conexion.conectarBD();
    await output_value
      .request()
      .input("id_usuario", sql2.Int, id_usuario)
      .input("id_menu", sql2.Int, id_menu)

      .output("mensaje", sql2.VarChar)
      .output("tipo_mensaje", sql2.Int)
      .execute("pa_rrhh_registros2", function (err, respuesta) {
        if (err) {
          res.json({
            mensaje: err.originalError.info.message,
            tipo_mensaje: 50
          });
          return;
        } else {
          res.json(respuesta.output);
          console.log(respuesta);
          return;
        }
      });
    Conexion.conectarBD();
  } catch (error) {
    res.json({ res: error.message });
  }
};


exports.crearConfirmacionRegistroMenuPersona = async (req, res) => {
  const { id_usuario } = req.body;

  if (id_usuario == null || id_usuario == "") {
    return res.json({
      mensaje: "INGRESE CODIGO DEL PERSONAL.",
      tipo_mensaje: 30
    });
  }
  try {
    const output_value = await Conexion.conectarBD();
    await output_value
      .request()
      .input("id_usuario", sql2.Int, id_usuario)

      .output("mensaje", sql2.VarChar)
      .output("tipo_mensaje", sql2.Int)
      .execute("pa_rrhh_registros_confirmados2", function (err, respuesta) {
        if (err) {
          res.json({
            mensaje: err.originalError.info.message,
            tipo_mensaje: 60
          });
          return;
        } else {
          res.json(respuesta.output);
          console.log(respuesta);
          return;
        }
      });
    Conexion.conectarBD();
  } catch (error) {
    res.json({ res: error.message });
  }
};



exports.getMenuDiarioConfirmados = async (req, res) => {
  try {
    const pool = await Conexion.conectarBD();

    pool.request().query(querys.getMenuDiarioConfirmados, (err, result) => {
      if (result.recordset.length) {
        pool.close();
        return res.json(result.recordset);
      } else {
        return res.json({ msg: "NO SE ENCONTRARON RESULTADOS" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

