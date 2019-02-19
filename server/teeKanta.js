var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SALASANA",
  port: "3306"
});

con.connect(function(err) {
  if (err) { throw err; }
  console.log("Yhdistetty");

 con.query("CREATE DATABASE suosikkilevyt", function (err, result) {
    if (err) { throw err; }
    console.log("Kanta luotu");
  });
  
  con.query("USE suosikkilevyt", function (err, result) {
    if (err) { throw err; }
    console.log("Kanta valittu");
  });
  
  sql = "CREATE TABLE IF NOT EXISTS Suosikki (" +
		  "otsikko VARCHAR(90) NOT NULL, " +
		  "artisti VARCHAR(90) NOT NULL, " +
		  "merkinta VARCHAR(255) NOT NULL, " +
		  "aikaleima INT NOT NULL " +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8; ";
  con.query(sql, function (err, result) {
    if (err) { throw err; }
    console.log("Taulu luotu");
  });

});
