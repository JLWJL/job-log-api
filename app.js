const express = require('./config/express');
const db = require('./config/db');
const port = process.env.PORT||3000;

const app = express();


app.use((req,res,next)=>{
	console.log("Invalid URL");
	res.json("Page not found");
});

db.connect((err)=>{
	if(err){
		console.log("Can't establish connection to the database");
	}else{
		app.listen(port, ()=>{
			console.log(`PORT ${port} listening`);
		})
	}
})


module.exports=app;