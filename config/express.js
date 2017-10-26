'use strict';
const config = require('./config');

const express = require('express');
const bodyPaser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MW = require('../api/routes/middlewares');

const jobRoutes = require('../api/routes/jobRoutes')
const userRoutes = require('../api/routes/userRoutes');

module.exports = function(){
	const app = express();
	console.log("app is ", app);

	//
	// Middlewares
	//

	app.all('*',(req, res, next)=> {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	  res.header("Access-Control-Allow-Headers","Content-Type, X-Authentication");
	  next();
	});

	app.use(bodyPaser.urlencoded({extended:true}));
	app.use(bodyPaser.json());
	app.use(session(config.sess));


	//
	// Routes
	//
	app.use('/job', jobRoutes)
	app.use('/user', userRoutes)


	//
	// Error handling
	//
	app.use((err,req,res,next)=>{
		console.log("Error handled: ", err)
		res.status(err.status||400).send(err.message);
	});


	return app;
}