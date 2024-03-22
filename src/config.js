require("dotenv").config();

/*const datos = {
  port: process.env.port || 4000, // SI EXISTE LA VARIABLE PORT ENTONCES TOMA EL PUERTO DE ESA VARIABLE O SINO USA EL 4000
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbServer: process.env.DB_SERVER || "",
  dbDatabase: process.env.DB_DATABASE || "",
  SP_ANIMAL: process.env.SP_ANIMAL || "",
  SECRET_TOKEN: process.env.SECRET_KEY
};*/

const config = {
  port: 8000, // SI EXISTE LA VARIABLE PORT ENTONCES TOMA EL PUERTO DE ESA VARIABLE O SINO USA EL 4000
  dbUser: "sa",
  dbPassword:  "Paraguay2017",
  dbServer: "172.16.1.202",
  dbDatabase:  "grupomaehara",
   SECRET_TOKEN: "vm$$123456"
}
module.exports = config;
