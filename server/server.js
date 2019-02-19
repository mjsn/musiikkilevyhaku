const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());


const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SALASANA',
    database: 'suosikkilevyt'
});
 
mc.connect();
 
app.get('/', function (req, res) {
    return res.send({ error: false })
});

app.get('/suosikit', function (req, res) {
res.header("Content-Type", "application/json; charset=utf-8");

    mc.query('SELECT * FROM Suosikki', function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
    });
});

app.get('/suosikit/:aikaleima', function (req, res) {
res.header("Content-Type", "application/json; charset=utf-8");

    var aikaleima = req.params.aikaleima;
  
    mc.query('SELECT * FROM Suosikki WHERE aikaleima>=?', aikaleima, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
    });
    
    console.log("Suosikit tulostettu");
 
});

app.post('/suosikit/lisaa', function (req, res) {
    res.header("Content-Type", "application/json; charset=utf-8");
    
    if (!req.body) {
        return res.status(400).send({ error:true, message: 'Ei lisättävää' });
    } else {
    
        var result = "";
        for(var suosikki in req.body) {
        if(req.body.hasOwnProperty(suosikki)){
                mc.query("INSERT INTO Suosikki (otsikko, artisti, merkinta, aikaleima) VALUES (?, ?, ?, ?)", [req.body[suosikki].otsikko, req.body[suosikki].artisti, req.body[suosikki].merkinta, req.body[suosikki].aikaleima], function (error, results, fields) {
                result = result + results;
                if (error) throw error;
                });
        }
        }
        
        console.log("Suosikit vastaanotettu");
        return res.status(200).send({ error: false, data: result, message: 'Lisätty' });
    }

});

app.listen(8080, function () {
    console.log('Node päällä portissa 8080');
});
