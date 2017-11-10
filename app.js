const express = require('./config/express');
const db = require('./config/db');
const port = process.env.PORT || 3000;

const app = express();

db.connect((err) => {
  if (err) {
    console.log("Error during DB connection: ", err);
  } else {
    app.listen(port, () => {
      console.log(`PORT ${port} listening`);
    });
  }
});

module.exports = app;