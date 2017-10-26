"use strict";

const User = require("../models/userModel");
const jwt = require("../../config/jwt");

function SignUp(req, res, next) {

  User.signUp(req.body, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.status(201).json(result);
    }
  });
}

function Login(req, res, next) {
  User.login(req.body, (err, result) => {
    if (err) {
      next(err);
    }
    else {
      let token = jwt.sign(result);
      res.status(200).json({"id": result.user_id, "token": token});
    }
  });
}

function Logout(req, res, next) {
  let token = req.get("X-Authorization");
  jwt.invoke(token);

  res.status(200).json({"status": 200, "message": "Logged out"});
}

function listUsers(req, res, next) {
  User.listUsers((err, results) => {
    if (err) {
      next({
        "message": err.code,
        "status": 500,
      });
    }
    res.status(200).json(results);
  });
}

function singleUser(req, res, next) {
  let id = req.params.user_id;
  User.singleUser(id, (err, results) => {
    if (err) {
      next({
        "message": err.code,
        "status": 500,
      });
    } else {
      res.status(200).json(results[0]);
    }
  });
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
  SignUp: SignUp,
  Login: Login,
  Logout: Logout,
  ListUsers: listUsers,
  SingleUser: singleUser,
  // DeleteUser: deleteUser,
};