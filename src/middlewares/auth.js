const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // obtener el token
    const token = authHeader.split(" ")[1];
    // comprobar el jwt
    try {
   //   const usuario = jwt.verify(token, process.env.SECRET_KEY);
      const usuario = jwt.verify(token, "vm$$123456");

      req.usuario = usuario;
      return next();
    } catch (error) {
      console.log("Token no valido");
      res.status(400).json({ msg: "Sesión expirada, vuelva a ingresar" });
    }
  } else {
    const data = [{ fecha_nombre: "No hay header", menu:"NO TIENE TOKEN"  }];

    res.status(400).json(data);
  }
};
