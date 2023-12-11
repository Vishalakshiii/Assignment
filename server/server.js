const Sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");
const compounds = require("./componds");
const PORT = 8000;
const app = express();
const sequelize = new Sequelize(
 'compound',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
app.use(cors());

app.use(express.json());

app.use('/api', compounds);

const db = {};

db.Sequelize = Sequelize;
db.tutorials = require("./model.js")(sequelize, Sequelize);

module.exports = db;

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.use(function(err, req, res, next) {
    res.status(500);
    res.send("Unable to connect")
});

app.listen(PORT, ()=>{
    console.log('server running on port', PORT)
})




