const express = require("express");
const mysql = require('mysql2');

const router = express.Router();

const dbConf = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nuvertos'
  }

function connect() {
    let connection = mysql.createConnection(dbConf);
    connection.connect();
    return connection;
}

function disconnect(connection) {
    connection.end();
}

/// retrieves compounds from the database
router.get('/compounds', (req, res) => {
    let limit = req.query.limit || 0;
    let offset = req.query.offset || 0;
    let connection = connect();
    connection.query('SELECT COUNT(*) AS COUNT FROM compounds;', function (error, count, fields) {
        if (error) console.log(error);
        connection.query(`SELECT * FROM COMPOUNDS LIMIT ${offset}, ${limit};`,function(error, results) {
          if (error) console.log(error);
          res.json({count: count, data: results})  
          disconnect(connection);
        } )
    }
    );
})

/// retrieves a compound by its id
router.get('/details/:id', (req, res) => {
    let id = req.params.id;
    let connection = connect();
    connection.query(`SELECT * FROM compounds WHERE id = ${id};`, function (error, results, fields) {
        if (error) console.log(error);
        res.json(results)
        disconnect(connection);
    });
})

/// update the description
router.put('/description/:id', (req, res) => {
    let id = req.params.id;
    
    let connection = connect();
    connection.query(`UPDATE compounds SET CompounrDescription = ?, dateModified =CURRENT_TIMESTAMP WHERE id = ${id}`,[req.body.CompounrDescription], function(e, r) {
        if (e) console.log(e);
        res.json(r)
        disconnect(connection);
    })
})

//create a new compound
router.post('/compounds', (req, res) => {
    let connection = connect();
    connection.query(`INSERT INTO compounds (CompoundName, CompounrDescription, strImageSource, strImageAttribution,dateModified) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);`,
    [req.body.name, req.body.desc, req.body.img, req.body.attr],
    function(e, r) {
        if (e) console.log(e);
        res.json(r)
        disconnect(connection);
    })
})
//deleting a compound
router.delete('/compound/:id', (req, res) => {
    let id = req.params.id;
    let connection = connect();
    connection.query(`DELETE FROM compounds WHERE id = ${id}`,
    function(e, r) {
        if (e) console.log(e);
        res.json(r)
        disconnect(connection);
    })
})


module.exports = router;