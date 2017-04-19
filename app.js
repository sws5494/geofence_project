var express = require('express');
var app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'user'
});
conn.connect();

app.locals.pretty = true;
app.set('view engine', 'jade');

app.get(['/index'], function(req, res) {
    var sql = 'SELECT * FROM topic';
    conn.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.render('view', {
                rows: rows
            });
        }
    });
});

app.get(['/data'], function(req, res){
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, rows, fields) {
      if (err) {
          console.log(err);
      } else {
          res.send(rows);
      }
  });
});

app.post(['/data'], function(req, res){
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, rows, fields) {
      if (err) {
          console.log(err);
      } else {
          res.send(rows);
      }
  });
});

app.post(['/data_insert'], function(req, res){
  var querystring = req.query.identifier;
  console.log(querystring);
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  var params = [querystring, "", ""];
  conn.query(sql, params, function(err, rows, fields) {
      if (err) {
          console.log(err);
      } else {
          console.log("OK");
      }
  });
});

app.listen(3000, function() {
    console.log('Connected 3000 port!');
});
