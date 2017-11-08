const mysql = require('mysql');
const state = {
  pool: null,
};

function connect (done) {
  state.pool = mysql.createPool(
    {
      connectionLimit: 100,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'job_log',
    });

  done();
}

function getPool () {
  return state.pool;
}

module.exports = {
  connect: connect,
  getPool: getPool,
};

