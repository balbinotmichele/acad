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
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
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
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  });
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
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
        else {
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
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
      var sQuery="SELECT IFNULL(SUM((DurataBin * NumeroBin)/3600), 0) OreEsperimenti from Test T, Sessione S, Esperimento E, Utente U WHERE T.CodSessione = S.CodSessione AND S.CodEsperimento = E.CodEsperimento AND E.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/NumeroTest", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(COUNT(*), 0) NumeroTest from Test T, Sessione S, Esperimento E, Utente U WHERE T.CodSessione = S.CodSessione AND S.CodEsperimento = E.CodEsperimento AND E.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
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
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/NumeroSessioni", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="select IFNULL(COUNT(*), 0) NumeroSessioni from Sessione S, Esperimento E, Utente U WHERE S.CodEsperimento = E.CodEsperimento AND E.Email = U.Email AND U.Email = ?"
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
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
      var sQuery="SELECT * FROM Sessione S, Esperimento E WHERE S.CodEsperimento = E.CodEsperimento AND E.Email = ?;";
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetSessioneByNome",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Sessione S, Esperimento E WHERE S.CodEsperimento = E.CodEsperimento AND NomeSessione = ? AND Email = ?;";
      var data=[];
      data.push(req.query.NomeSessione);
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/AddSessione', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="INSERT INTO Sessione(DataCreazione, NomeSessione, CodEsperimento) VALUES(?, ?, ?)";
      var data = [];
      data.push(req.query.DataCreazione);
      data.push(req.query.NomeSessione);
      data.push(req.query.CodEsperimento);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data:    req.query
          });
          // connection.end(function(err) {
          //   console.log('Chiuso')
          // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.delete('/DeleteSessione', function(req, res) {
	connection = mysql.createConnection(sConnection);
    connection.connect(function(err){
    if(!err) {
      var sQuery = "DELETE FROM Sessione WHERE CodSessione = ?";
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
          res.sendStatus(500);
        else   {
          res.status(200).send({status: 200, Message: "Del OK" });
				}
      });
    }
    else {
      console.log("Error connecting database ... ");
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region indie var
app.get("/GetVariabiliBySessione", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery=" SELECT * FROM VariabileIndipendente WHERE CodSessione = ?"
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/AddVariabile', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="INSERT INTO VariabileIndipendente(NomeVariabile, TipoVariabile, CodSessione) VALUES(?, ?, ?)";
      var data = [];
      data.push(req.query.NomeVariabile);
      data.push(req.query.TipoVariabile);
      data.push(req.query.CodSessione);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data:    req.query
          });
          // connection.end(function(err) {
          //   console.log('Chiuso')
          // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region depended
app.get("/GetDipendatoByTest", function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery=" SELECT * FROM Dipendato WHERE CodSoggetto = ? AND CodSessione = ?"
      var data=[];
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddDipendato', function(req, res){
  connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Dipendato SET Valore = ? WHERE CodSoggetto = ? AND CodSessione = ? AND CodVariabile = ?;";
      var data = [];
      data.push(req.query.Valore);
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      data.push(req.query.CodVariabile);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
              var sQuery="INSERT INTO Dipendato(CodSoggetto, CodSessione, CodVariabile, Valore) VALUES(?, ?, ?, ?)";
              var data = [];
              data.push(req.query.CodSoggetto);
              data.push(req.query.CodSessione);
              data.push(req.query.CodVariabile);
              data.push(req.query.Valore);
              connection.query(sQuery, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region tests
app.get("/GetTestSessione",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Test WHERE CodSessione = ? AND CodSoggetto = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetAllTestSessione",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Test WHERE CodSessione = ?";
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddTest', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="INSERT INTO Test(CodSoggetto, CodSessione, DataEsperimento, DataInserimento, Latenza, Transizioni, PrimaScelta) VALUES(?,?,?,?,?,?,?)";
      var data = [];
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      data.push(req.query.DataEsperimento);
      data.push(req.query.DataInserimento);
      data.push(req.query.Latenza);
      data.push(req.query.Transizioni);
      data.push(req.query.PrimaScelta);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
          // connection.end(function(err) {
          //   console.log('Chiuso')
          // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.delete('/DeleteTestSoggetto', function(req, res) {
	connection = mysql.createConnection(sConnection);
    connection.connect(function(err){
    if(!err) {
      var sQuery = "DELETE FROM Test WHERE CodSoggetto = ? AND CodSessione = ?";
      var data=[];
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
          res.sendStatus(500);
        else   {
          res.status(200).send({status: 200, Message: "Del OK" });
				}
      });
    }
    else {
      console.log("Error connecting database ... ");
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region subjects
app.get("/GetSoggettiBySessione",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT So.CodSoggetto, So.NomeSoggetto, So.Descrizione  FROM Test T, Sessione S, Soggetto So WHERE T.CodSessione = S.CodSessione AND T.CodSoggetto = So.CodSoggetto AND T.CodSessione = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetSoggettiByUtente",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Soggetto S WHERE Email = ?;";
      var data=[];
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetSoggettoByNome",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Soggetto S WHERE NomeSoggetto = ? AND Email = ?;";
      var data=[];
      data.push(req.query.NomeSoggetto);
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetSoggettiTestati",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT S.CodSoggetto FROM Soggetto S, Test T, Sessione Se WHERE T.CodSoggetto = S.CodSoggetto AND T.CodSessione = Se.CodSessione AND Se.CodSessione = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddSoggetto', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Soggetto SET NomeSoggetto = ?, Descrizione = ? WHERE CodSoggetto = ?";
      var data = [];
      data.push(req.query.NomeSoggetto);
      data.push(req.query.Descrizione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Soggetto(NomeSoggetto, Descrizione, Email) VALUES(?,?,?)";
          var data = [];
          data.push(req.query.NomeSoggetto);
          data.push(req.query.Descrizione);
          data.push(req.query.Email);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
              // connection.end(function(err) {
              //   console.log('Chiuso')
              // });
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
              //   console.log('Chiuso')
              // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
          //   console.log('Chiuso')
          // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.delete('/DeleteSoggetto', function(req, res) {
	connection = mysql.createConnection(sConnection);
    connection.connect(function(err){
    if(!err) {
      var sQuery = "DELETE FROM Soggetto WHERE CodSoggetto = ?";
      var data=[];
      data.push(req.query.CodSoggetto);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
          res.sendStatus(500);
        else   {
          res.status(200).send({status: 200, Message: "Del OK" });
				}
      });
    }
    else {
      console.log("Error connecting database ... ");
      res.sendStatus(500);
    }
  });
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
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetEsperimentiUsati",function(req,res){
  connection= mysql.createConnection(sConnection)	;
	connection.connect(function(err){
		if (!err){
			var sQuery="select * from esperimento e where (Select codsessione from sessione s where (select codsessione from test where test.CodSessione = s.CodSessione and e.CodEsperimento = s.CodEsperimento))";
			connection.query(sQuery,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
		}
  })
});

app.get("/GetEsperimentoByNome",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Esperimento WHERE NomeEsperimento = ? AND Email = ?;";
      var data=[];
      data.push(req.query.NomeEsperimento);
      data.push(req.query.Email);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetEsperimentoByCodice",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Esperimento WHERE CodEsperimento = ?;";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.get("/GetEsperimentoBySessione",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT NomeEsperimento FROM Sessione S, Esperimento E WHERE S.CodEsperimento = E.CodEsperimento AND CodSessione = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddEsperimento', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Esperimento SET NomeEsperimento = ?, NumeroBin = ?, DurataBin = ?, PrimaScelta = ?, Latenza = ?, Transizioni = ?, Forma = ?, MostraPosizioni = ? WHERE CodEsperimento = ?;";
      var data = [];
      data.push(req.query.NomeEsperimento);
      data.push(req.query.NumeroBin);
      data.push(req.query.DurataBin);
      data.push(req.query.PrimaScelta);
      data.push(req.query.Latenza);
      data.push(req.query.Transizioni);
      data.push(req.query.Forma);
      data.push(req.query.MostraPosizioni);
      data.push(req.query.CodEsperimento);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Esperimento(NomeEsperimento, NumeroBin, DurataBin, PrimaScelta, Latenza, Transizioni, Forma, MostraPosizioni, Email) VALUES(?,?,?,?,?,?,?,?,?)";
          var data = [];
          data.push(req.query.NomeEsperimento);
          data.push(req.query.NumeroBin);
          data.push(req.query.DurataBin);
          data.push(req.query.PrimaScelta);
          data.push(req.query.Latenza);
          data.push(req.query.Transizioni);
          data.push(req.query.Forma);
          data.push(req.query.MostraPosizioni);
          data.push(req.query.Email);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
              // connection.end(function(err) {
              //   console.log('Chiuso')
              // });
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
              //   console.log('Chiuso')
              // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
          //   console.log('Chiuso')
          // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});

app.delete('/DeleteEsperimento', function(req, res) {
	connection = mysql.createConnection(sConnection);
    connection.connect(function(err){
    if(!err) {
      var sQuery = "DELETE FROM Esperimento WHERE CodEsperimento = ?";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
          res.sendStatus(500);
        else   {
          res.status(200).send({status: 200, Message: "Del OK" });
				}
      });
    }
    else {
      console.log("Error connecting database ... ");
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region positions
app.get("/GetPosizioniByEsperimento",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Posizione WHERE CodEsperimento = ?;";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddPosizioneToEsperimento', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Posizione SET NomePosizione = ? WHERE CodPosizione = ?;";
      var data = [];
      data.push(req.query.NomePosizione);
      data.push(req.query.CodPosizione);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Posizione(NomePosizione, CodEsperimento) VALUES(?,?)"
          var data = [];
          data.push(req.query.NomePosizione);
          data.push(req.query.CodEsperimento);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region positioned
app.get("/GetPosizionatoByTest",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Posizionato WHERE CodSessione = ? AND CodSoggetto = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddPosizionato', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery2="INSERT INTO Posizionato(CodSoggetto, CodSessione, CodPosizione, Tempo) VALUES(?,?,?,?)"
      var data = [];
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      data.push(req.query.CodPosizione);
      data.push(req.query.Tempo);
      connection.query(sQuery2, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region orientation
app.get("/GetOrientamentiByEsperimento",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Orientamento WHERE CodEsperimento = ?;";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddOrientamentoToEsperimento', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Orientamento SET NomeOrientamento = ? WHERE CodOrientamento = ?;";
      var data = [];
      data.push(req.query.NomeOrientamento);
      data.push(req.query.CodOrientamento);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Orientamento(NomeOrientamento, CodEsperimento) VALUES(?,?)"
          var data = [];
          data.push(req.query.NomeOrientamento);
          data.push(req.query.CodEsperimento);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region oriented
app.get("/GetOrientatoByTest",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Orientato WHERE CodSessione = ? AND CodSoggetto = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddOrientato', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery2="INSERT INTO Orientato(CodSoggetto, CodSessione, CodOrientamento, Tempo) VALUES(?,?,?,?)"
      var data = [];
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      data.push(req.query.CodOrientamento);
      data.push(req.query.Tempo);
      connection.query(sQuery2, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else
          res.status(200).send({
            status:  200,
            Message: "Ins OK",
            data: 	 req.query
          });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region stimuli
app.get("/GetStimoliByEsperimento",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Stimolo WHERE CodEsperimento = ?;";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddStimoloToEsperimento', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Stimolo SET NomeStimolo = ? WHERE CodStimolo = ?;";
      var data = [];
      data.push(req.query.NomeStimolo);
      data.push(req.query.CodStimolo);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Stimolo(NomeStimolo, CodEsperimento) VALUES(?,?)"
          var data = [];
          data.push(req.query.NomeStimolo);
          data.push(req.query.CodEsperimento);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region stimulated
app.get("/GetStimolatoByTest",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Stimolato WHERE CodSessione = ? AND CodSoggetto = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddStimolato', function(req, res){
  connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      // var sQuery="UPDATE Stimolato SET CodStimolo = ? WHERE CodSoggetto = ? AND CodSessione = ? AND CodPosizione = ?;";
      // var data = [];
      // data.push(req.query.CodStimolo);
      // data.push(req.query.CodSoggetto);
      // data.push(req.query.CodSessione);
      // data.push(req.query.CodPosizione);
      // connection.query(sQuery, data, function(err, rows, fields) {
      //   if (err)
      //   {
      //     res.sendStatus(500);
      //   }
      //   else if (rows.affectedRows==0)
      //   {
          var sQuery2="INSERT INTO Stimolato(CodSoggetto, CodSessione, CodPosizione, CodStimolo, Tempo) VALUES(?,?,?,?,?)"
          var data = [];
          data.push(req.query.CodSoggetto);
          data.push(req.query.CodSessione);
          data.push(req.query.CodPosizione);
          data.push(req.query.CodStimolo);
          data.push(req.query.Tempo);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      //     });
      //   }
      //   else
      //   {
      //     res.status(200).send({
      //       status:  200,
      //       Message: "Mod OK",
      //       data:    req.query
      //     });
      //     // connection.end(function(err) {
      //   //   console.log('Chiuso')
      //   // });
      //   }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region bins
app.get("/GetBinByTest",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Bin WHERE CodSessione = ? AND CodSoggetto = ?;";
      var data=[];
      data.push(req.query.CodSessione);
      data.push(req.query.CodSoggetto);
      connection.query(sQuery,data,function(err,rows,fileds){
        if (err)
            res.sendStatus(500);
        else
            res.setHeader('Access-Control-Allow-Origin','*');
        res.json(rows);
        // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
      })
    }
  })
});

app.put('/EditAddBin', function(req, res){
  connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="UPDATE Bin SET Note = ? WHERE CodSoggetto = ? AND CodSessione = ? AND NumBin = ?;";
      var data = [];
      data.push(req.query.Note);
      data.push(req.query.CodSoggetto);
      data.push(req.query.CodSessione);
      data.push(req.query.NumBin);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Bin(CodSoggetto, CodSessione, NumBin, Note) VALUES(?,?,?,?)"
          var data = [];
          data.push(req.query.CodSoggetto);
          data.push(req.query.CodSessione);
          data.push(req.query.NumBin);
          data.push(req.query.Note);
          connection.query(sQuery2, data, function(err, rows, fields) {
            if (err)
            {
              res.sendStatus(500);
            }
            else
              res.status(200).send({
                status:  200,
                Message: "Ins OK",
                data: 	 req.query
              });
              // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
          });
        }
        else
        {
          res.status(200).send({
            status:  200,
            Message: "Mod OK",
            data:    req.query
          });
          // connection.end(function(err) {
        //   console.log('Chiuso')
        // });
        }
      });
    }
    else {
      res.sendStatus(500);
    }
  });
});
//#endregion

//#region clear POS
// app.delete('/ClearPOS', function(req, res) {
// 	connection = mysql.createConnection(sConnection);
//     connection.connect(function(err){
//     if(!err) {
//       var sQuery = "DELETE FROM Posizione WHERE CodEsperimento = ?";
//       var data=[];
//       data.push(req.query.CodEsperimento);
//       connection.query(sQuery, data, function(err, rows, fields) {
//         if (err)
//           res.sendStatus(500);
//         else   {
//           // res.status(200).send({status: 200, Message: "Del OK" });
//           var sQuery = "DELETE FROM Orientamento WHERE CodEsperimento = ?";
//           connection.query(sQuery, data, function(err, rows, fields) {
//             if (err)
//               res.sendStatus(500);
//             else   {
//               // res.status(200).send({status: 200, Message: "Del OK" });
//               var sQuery = "DELETE FROM Stimolo WHERE CodEsperimento = ?";
//               connection.query(sQuery, data, function(err, rows, fields) {
//                 if (err)
//                   res.sendStatus(500);
//                 else   {
//                   res.status(200).send({status: 200, Message: "Del OK" });
//                 }
//               });
//             }
//           });
// 				}
//       });
//     }
//     else {
//       console.log("Error connecting database ... ");
//       res.sendStatus(500);
//     }
//   });
// });
//#endregion
app.listen(3000);
