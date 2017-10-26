const jwt = require("../../config/jwt");
const db = require("../../config/db");

exports.checkTokenStatus = function(req, res, next) {
  let token = req.get("X-Authentication");

  jwt.verify(token, (err, decoded) => {
    if (decoded) {
      req.user = decoded;
      next();
    }
    else {
      res.status(401).send("Unauthorized");
    }
  });
}

exports.checkUserStatus = function(req, res, next) {
  if (req.user.userId) {
    let id = req.user.userId;
    let sql = "SELECT * FROM user WHERE user_id = ?";
    db.getPool().query(sql, [id], (err, results, fields) => {
      if (err) {
        res.status(500).send({"message:": err});
      } else if (results.length < 1) {
        res.status(400).send({"message": "User does not exist"});
      } else {
        next();
      }
    });
  }
  else {
    res.status(400).send({"message": "User does not exist"});
  }
}