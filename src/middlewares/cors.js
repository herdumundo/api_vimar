module.exports = (req, res, next) => {
  if (req.ip === "::ffff:192.168.125.20" /*|| req.ip === "::1"*/) {
    console.log(req.ip);
    next();
  } else {
    console.log(req.ip);

    return res.status(403).send("Forbidden"); //res.json({ msg: "IP NO PERMITIDA." });
    //res.status(403).send("Forbidden");
  }
};
