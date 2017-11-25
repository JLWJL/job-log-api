'use strict';

const User = require('../models/userModel');
const jwt = require('../../config/jwt');

function signUp (req, res, next) {

  User.signUp(req.body, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json(result);
    }
  });
}

function login (req, res, next) {
  User.login(req.body, (err, result) => {
    if (err) {
      next(err);
    }
    else {
      let token = jwt.sign(result);
      res.status(200).json({'id': result.user_id, 'token': token});
    }
  });
}

function logout (req, res, next) {
  let token = req.get('X-Authorization');
  jwt.invoke(token);

  res.status(200).json({'status': 200, 'message': 'Logged out'});
}

function listUsers (req, res, next) {
  User.listUsers((err, results) => {
    if (err) {
      next({
        'message': err.code,
        'status': 500,
      });
    }
    res.status(200).json(results);
  });
}

function singleUser (req, res, next) {
  let id = req.params.user_id;
  User.singleUser(id, (err, results) => {
    if (err) {
      next({
        'message': err.code,
        'status': 500,
      });
    } else {
      res.status(200).json(results[0]);
    }
  });
}

function authToken(req, res, next){
  console.log("body.token: ", req.body);
  jwt.verify(req.body.token, (err, decoded)=>{
    if (err){
      console.log("Verify error: ", err);
      res.status(401).json(err);
    }
    else{
      res.status(200).json("Valid token");
    }
  })
}

// function deleteUser(req, res, next){
// 	User.deleteUser(req.params.user_id, (err, result)=>{
// 		if(err){
// 			next(err);
// 		}else{
// 			res.status(200).json(result);
// 		}
// 	});
// }

module.exports = {
  signUp: signUp,
  login: login,
  logout: logout,
  listUsers: listUsers,
  singleUser: singleUser,
  authToken: authToken
};