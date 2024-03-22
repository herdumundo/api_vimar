const express = require("express");
const config = require("./config");
const productsRoutes = require("./routes/products.routes");
const VimarRoutes = require("./routes/vimar.routes");
const app = express();
//Settings
app.set("port", config.port);
//app.listen(8000);
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productsRoutes);
app.use(VimarRoutes);

//app.use("/api", productsRoutes);

module.exports = app;
