"use strict";

const db = require("../../config/db");

function getJobs(values, done) {
  let sql = "Select * FROM application where user_id = ?";
  db.getPool().query(sql, [values], (err, results, fields) => {
    if (err) {
      return done({
        "message": err,
        "status": 500,
      }, results);
    }
    return done(err, results);
  });
}

/*
* Just for development test purpose*/
function listJobs(done) {
  let sql = "Select * FROM application";
  db.getPool().query(sql, (err, results, fields) => {
    if (err) {
      return done({
        "message": err,
        "status": 500,
      }, results);
    }
    return done(err, results);
  });
}

function singleJob(values, done) {
  let id = db.getPool().escape(values);
  let sql = "SELECT * FROM application WHERE app_id =" + id;

  db.getPool().query(sql, (err, results, fields) => {
    if (err) {
      return done({
        "message": err,
        "status": 500,
      }, results);
    }
    return done(err, results);
  });
}

/**
 * Create new job application recrd
 * @param {Object} values Key-Value pair of form input data
 * @param {function} done
 */
function createJob(values, done) {

  let sql = "INSERT INTO application SET ?";

  //Empty expire counts as empty string which is invalid in DB column
  if (values.expire === "") values.expire = null;
  db.getPool().query(sql, [values], (err, results, fields) => {
    if (err) {
      return done({
        "message": err,
        "status": 500,
      }, results);
    }
    return done(err, results);
  });
}

function deleteJob(values, done) {
  let sql = "DELETE FROM application WHERE app_id = ?";

  db.getPool().query(sql, [values], (err, results, fields) => {
    if (err) {
      return done({
        "message": err,
        "status": 500,
      }, results);
    }
    return done(err, results);
  });
}

function updateJob(values, done) {
  let sql = "UPDATE application SET ? WHERE app_id = ?";
//Empty expire counts as empty string which is invalid in DB column
  values.body.expire = values.body.expire === "" ? null : values.body.expire;
  db.getPool().query(sql, [values.body, values.app_id], done);
}

module.exports = {
  listJobs: listJobs,
  getJobs: getJobs,
  singleJob: singleJob,
  createJob: createJob,
  deleteJob: deleteJob,
  updateJob: updateJob
};