const config = require ("./config.js");

var express = require('express');
var mysql = require('mysql');
const util = require('util');

var sConnection = config;

var app = express();
app.use(express.static('.'));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.get("/ListUtenti",function(req,res){
    connection= mysql.createConnection(sConnection)	;
	connection.connect(function(err){
		if (!err){
			var sQuery="SELECT * FROM Utente;";
			connection.query(sQuery,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
			})
		}
	})
});

app.put("/AddUtente",function(req,res){
  connection= mysql.createConnection(sConnection)	;
	connection.connect(function(err){
		if (!err){
      var sQuery="INSERT INTO Utente(Nome, Cognome, Email) VALUES ?, ?, ?, ?;";
      var data=[];
      data.push(req.query.Nome);
      data.push(req.query.Cognome);
      data.push(req.query.Email);
			connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
          res.sendStatus(500);
        else
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
      })
    }
  })
});

app.listen(3000);
