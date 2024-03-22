const Router = require("express");
const cors = require("cors");

const ControlProductos = require("../controllers/products.controller");
const auth = require("../middlewares/auth");

/*const whitelist = require("../middlewares/cors");*/
// habilitando cors
const router = Router();
router.get("/menudiario", auth, ControlProductos.getMenuDiario);
router.get("/menudiarioSemanas", auth, ControlProductos.getMenuDiarioSemana);
router.post("/menuRegistro", auth, ControlProductos.crearRegistroMenuPersona);
router.post(
  "/menuRegistroConfirmado",
  auth,
  ControlProductos.crearConfirmacionRegistroMenuPersona
);
router.get(
  "/validacionConsultaBdMenu",
  ControlProductos.getValidacionHorasConsultasMenuDiario
);
router.get(
  "/menudiarioPersonasConfirmadas",
  auth,
  ControlProductos.getMenuDiarioConfirmados
);

module.exports = router;
