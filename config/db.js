const mysql = require('mysql');
const fs = require('fs');
const LOCAL_DB = require('./config').LOCAL_DB;

const state = {
  pool: null,
};

function connect (done) {
  console.log("DB host is: ", process.env.JAWSDB_URL);
  state.pool = mysql.createPool(process.env.JAWSDB_URL || LOCAL_DB);

  //Heroku addon DB can't execute multiple statements
  //Need to manual set up table
  if(process.env.JAWSDB_URL){
    done();
  }else{
    initialiseDB(done);
  }
}

/**
 * Initialise database if not exist.
 * @param done
 */
function initialiseDB (done) {
  fs.readFile(__dirname + '/db-init.sql', (err, data) => {
    if (err) {
      console.log('Read file error');
      done(err);
    }else{
      getPool().query(data.toString(), (err, results) => {
        if(err){
          console.log("Database initialisation error: ", err);
          done(err);
        }else{
          console.log("Database running successfully");
          done(null);
        }
      });
    }
  });
}

function getPool () {
  return state.pool;
}

module.exports = {
  connect: connect,
  getPool: getPool,
};

