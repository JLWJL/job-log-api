const jwt = require('../../config/jwt');
const db = require('../../config/db');

/***
 * To check if the token passed is valid
 * @param req
 * @param res
 * @param next
 */
exports.validateToken = function (req, res, next) {
  let token = req.get('X-Authentication');

  jwt.verify(token, (err, decoded) => {
    if (decoded) {
      req.user = decoded;
      next();
    }
    else {
      res.status(401).send('Unauthorized');
    }
  });
};

/**
 * To check if the passed user id exists in the database
 * @param req
 * @param res
 * @param next
 */
exports.validateUserId = function (req, res, next) {
  if (req.user.userId) {
    let id = req.user.userId;
    let sql = 'SELECT * FROM user WHERE user_id = ?';
    db.getPool().query(sql, [id], (err, results, fields) => {
      if (err) {
        res.status(500).send({'message:': err});
      } else if (results.length < 1) {
        res.status(400).send({'message': 'User does not exist'});
      } else {
        next();
      }
    });
  }
  else {
    res.status(400).send({'message': 'User does not exist'});
  }
};

/**
 * Validate the ownership of a user for an job application
 * This middleware should be placed after 'validateToken' middleware
 * @param req
 * @param res
 * @param next
 */
exports.validateOwnerShip = function (req, res, next) {
  let appId = req.params.app_id;
  let userId = req.user.userId; //From previous middleware
  let sql = 'SELECT * FROM application where app_id = ? AND user_id=?';

  db.getPool().query(sql, [appId, userId], (err, results) => {
    if (err) {
      res.status(500).send({'message': err});
    }
    else if (results.length < 1) {
      res.status(401).send({'message': 'Unauthorised operation'});
    } else {
      next();
    }
  });
};