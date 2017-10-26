const mysql = require('mysql');
const state = {
	pool:null,
};


function Connect (done){
	state.pool = mysql.createPool(
		{
			connectionLimit:100,
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'job_log'
		});

	done();
}

function GetPool (){
	return state.pool;
}

module.exports = {
	connect: Connect,
	getPool: GetPool,
}

