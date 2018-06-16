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
      var sQuery="select IFNULL(SUM((DurataBin * NumeroBin)/3600), 0) OreEsperimenti from Test T, Esperimento E, Utente U WHERE T.CodEsperimento = E.CodEsperimento AND T.Email = U.Email AND U.Email = ?"
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
      var sQuery="select IFNULL(COUNT(*), 0) NumeroTest from Test T, Utente U WHERE T.Email = U.Email AND U.Email = ?"
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
      var sQuery="select IFNULL(COUNT(*), 0) NumeroSessioni from Sessione S, Utente U WHERE S.Email = U.Email AND U.Email = ?"
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
      var sQuery="SELECT * FROM Sessione WHERE Email = ?;";
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

app.put('/AddSessione', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
    if(!err) {
      var sQuery="INSERT INTO Sessione(DataCreazione, Email) VALUES(?,?)";
      var data = [];
      data.push(req.query.DataCreazione);
      data.push(req.query.Email);
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

app.get("/GetEsperimentoByNome",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Esperimento WHERE NomeEsperimento = ?;";
      var data=[];
      data.push(req.query.NomeEsperimento);
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
      var sQuery="UPDATE Esperimento SET NomeEsperimento = ?, NumeroBin = ?, DurataBin = ?, PrimaScelta = ?, Latenza = ?, Transizioni = ?, Forma = ?, MostraPosizioni = ? WHERE Email = ? AND CodEsperimento = ?;";
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
      data.push(req.query.CodEsperimento);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Esperimento(NomeEsperimento, NumeroBin, DurataBin, PrimaScelta, Latenza, Transizioni, Forma, MostraPosizioni, Email) VALUES(?,?,?,?,?,?,?,?,?)";
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
      var sQuery="SELECT * FROM Posizione WHERE Email = ? AND CodEsperimento = ?;";
      var data=[];
      data.push(req.query.Email);
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
      var sQuery="UPDATE Posizione SET NomePosizione = ? WHERE Email = ? AND CodEsperimento = ? AND CodPosizione = ?;";
      var data = [];
      data.push(req.query.NomePosizione);
      data.push(req.query.Email);
      data.push(req.query.CodEsperimento);
      data.push(req.query.CodPosizione);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Posizione(NomePosizione, Email, CodEsperimento) VALUES(?,?,?)"
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

//#region orientation
app.get("/GetOrientamentiByEsperimento",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Orientamento WHERE Email = ? AND CodEsperimento = ?;";
      var data=[];
      data.push(req.query.Email);
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
      var sQuery="UPDATE Orientamento SET NomeOrientamento = ? WHERE Email = ? AND CodEsperimento = ? AND CodOrientamento = ?;";
      var data = [];
      data.push(req.query.NomeOrientamento);
      data.push(req.query.Email);
      data.push(req.query.CodEsperimento);
      data.push(req.query.CodOrientamento);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Orientamento(NomeOrientamento, Email, CodEsperimento) VALUES(?,?,?)"
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

//#region stimuli
app.get("/GetStimoliByEsperimento",function(req,res){
  connection= mysql.createConnection(sConnection)	;
  connection.connect(function(err){
    if (!err){
      var sQuery="SELECT * FROM Stimolo WHERE Email = ? AND CodEsperimento = ?;";
      var data=[];
      data.push(req.query.Email);
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
      var sQuery="UPDATE Stimolo SET NomeStimolo = ? WHERE Email = ? AND CodEsperimento = ? AND CodStimolo = ?;";
      var data = [];
      data.push(req.query.NomeStimolo);
      data.push(req.query.Email);
      data.push(req.query.CodEsperimento);
      data.push(req.query.CodStimolo);

      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
        {
          res.sendStatus(500);
        }
        else if (rows.affectedRows==0)
        {
          var sQuery2="INSERT INTO Stimolo(NomeStimolo, Email, CodEsperimento) VALUES(?,?,?)"
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
app.delete('/ClearPOS', function(req, res) {
	connection = mysql.createConnection(sConnection);
    connection.connect(function(err){
    if(!err) {
      var sQuery = "DELETE FROM Posizione WHERE CodEsperimento = ?";
      var data=[];
      data.push(req.query.CodEsperimento);
      connection.query(sQuery, data, function(err, rows, fields) {
        if (err)
          res.sendStatus(500);
        else   {
          // res.status(200).send({status: 200, Message: "Del OK" });
          var sQuery = "DELETE FROM Orientamento WHERE CodEsperimento = ?";
          connection.query(sQuery, data, function(err, rows, fields) {
            if (err)
              res.sendStatus(500);
            else   {
              // res.status(200).send({status: 200, Message: "Del OK" });
              var sQuery = "DELETE FROM Stimolo WHERE CodEsperimento = ?";
              connection.query(sQuery, data, function(err, rows, fields) {
                if (err)
                  res.sendStatus(500);
                else if (rows.affectedRows == 0){
                  res.sendStatus(401);
                }
                else   {
                  res.status(200).send({status: 200, Message: "Del OK" });
                }
              });
            }
          });
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
app.listen(3000);
