const sql = require("mssql");

const dbSettings = {
  user: "sa",
  password:"Paraguay2017",
  server: "172.16.1.202",
  database: "grupomaehara",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
 
exports.conectarBD = function () {
  try {
    const pool = sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
};
