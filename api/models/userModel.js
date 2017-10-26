"use strict";

const db = require("../../config/db");
const bcrypt = require("bcrypt");

function signUp(values, done) {
  let first_name = values.firstName;
  let last_name = values.lastName;
  let email = values.email;
  let password = values.password;

  //Encrypt password with Bcrypt
  bcrypt.genSalt(2).then(
      (salt) => {
        bcrypt.hash(password, salt).then(
            (hash) => {
              let passwordHash = hash;
              let sql = "INSERT INTO user (user_id, email, first_name, last_name, password) values(UUID_SHORT(),?,?,?,?)";

              db.getPool().query(sql, [email, first_name, last_name, passwordHash],
                      (err, results, fields) => {
                        if (err) {
                          return done({
                            "message": err,
                            "status": 500,
                          }, results);
                        }
                        return done(err, results);
                      });
            }
        );
      }
  ).catch((err) => {
    console.log("Bcrypt hashing password error ", err);
    done({
      "message": err,
      "status": 500,
    }, null);
  });
}

function login(values, done) {
  let email = values.email,
      password = values.password;

  if (!email || !password) {
    done({"status":400, "message": "Invalid credentials"});

  } else {
    db.getPool().query("SELECT * FROM user WHERE email=?", [email],
        (err, results, fields) => {
          if (err) {
            done({"message": "Database Error", "status": 500}, null);

          }
          else if (results.length < 1) {
            done({"message": "User not found", "status": 400}, null);

          }
          else {
            bcrypt.compare(password, results[0].password).then(
                (res) => {

                  //Password not matched and return error messgae
                  if (!res) {
                    done({"message": "Wrong password", "status": 400}, null);
                  }
                  //Matched and return user data for session
                  else {
                    done(null, results[0]);
                  }
                }
            ).catch(
                (err) => {
                  done({"message": err, "status": 500});
                });
          }
        }
    );
  }
}

function singleUser(values, done) {
  let id = db.getPool().escape(values);
  let sql = "SELECT * FROM user WHERE user_id =" + id;

  db.getPool().query(sql, done);
}

function listUsers(done) {
  let sql = "Select * FROM user";
  db.getPool().query(sql, done);
}

// function deleteUser(values, done){
// 	let sql = "DELETE FROM user WHERE app_id = ?";

// 	db.getPool().query(sql,[values], (err,results,fields)=>{
// 		if(err){
// 			return done({
// 				"message": err.code,
// 				"status":500
// 			}, results);
// 		}
// 		return done(err, results);
// 	})
// }

module.exports = {
  signUp: signUp,
  login: login,
  listUsers: listUsers,
  singleUser: singleUser,
  // deleteUser: deleteJob
};