const jwt = require("../../config/jwt");
const db = require("../../config/db");

/***
 * To check if the token passed is valid
 * @param req
 * @param res
 * @param next
 */
exports.validateToken = function(req, res, next) {
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
};

/**
 * To check if the passed user id exists in the database
 * @param req
 * @param res
 * @param next
 */
exports.validateUserId = function(req, res, next) {
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
};