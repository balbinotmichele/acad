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

//#region utenti
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

app.get("/GetUtente",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Utente WHERE Email = ?;";
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
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
      var sQuery="INSERT INTO Utente(Nome, Cognome, Email) VALUES (?, ?, ?);";
      var data=[];
      data.push(req.query.Nome);
      data.push(req.query.Cognome);
      data.push(req.query.Email);
			connection.query(sQuery,data,function(err,rows,fileds){
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        else {
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
        }
      })
    }
    else
      console.error("Error connecting the database...")
  })
});
//#endregion

//#region counters
app.get("/OreEsperimenti", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(SUM((DurataBin * NumeroBin)/3600), 0) OreEsperimenti from Test T, Esperimento E, Utente U WHERE T.CodEsperimento = E.CodEsperimento AND T.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});

app.get("/NumeroTest", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(COUNT(*), 0) NumeroTest from Test T, Utente U WHERE T.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});

app.get("/NumeroEsperimenti", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(COUNT(*), 0) NumeroEsperimenti from Esperimento E, Utente U WHERE E.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});

app.get("/NumeroSessioni", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(COUNT(*), 0) NumeroSessioni from Sessione S, Utente U WHERE S.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});
//#endregion

//#region sessions
app.get("/GetSessioni",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Sessione WHERE Email = ?;";
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});
//#endregion

//#region experiments
app.get("/GetEsperimenti",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Esperimento WHERE Email = ?;";
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
      })
    }
  })
});
//#endregion

app.listen(3000);
