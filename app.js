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
app.set('view engine', 'ejs');

app.get('/index', function(req, res) {
    var sql = 'SELECT * FROM request';
    conn.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            var length1 = rows.length;
            res.render('view', {
                rows: rows,
                length: length1
            });
        }
    });
});

app.get(['/data'], function(req, res) {
    var sql = 'SELECT * FROM request';
    conn.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.get(['/map'], function(req, res) {
    var identifier = req.query.identifier;
    var lat = req.query.lat;
    var lon = req.query.lon;
    res.render('map', {
        identifier: identifier,
        lat: lat,
        lon: lon
    });
});

app.get(['/myWorker'], function(req, res) {


});

app.get(['/data_geofence'], function(req, res) {
    var sql = 'SELECT * FROM geofence';
    conn.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.get(['/data_user'], function(req, res) {
    var sql = 'SELECT * FROM user';
    conn.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.get(['/user_loc'], function(req, res) {
    var phonenum = req.query.phonenum;
    var lat = req.query.lat;
    var lon = req.query.lon;
    console.log("user_loc");
    console.log(phonenum);
    console.log(lat);
    console.log(lon);
    phonenum = phonenum.trim();
    var sql = 'UPDATE user SET lat=?, lon=? WHERE phonenum=?';
    var params = [lat, lon, phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/user_loc2'], function(req, res) {
    var phonenum = req.query.phonenum;
    var lat = req.query.lat;
    var lon = req.query.lon;
    console.log("user_loc");
    console.log(phonenum);
    console.log(lat);
    console.log(lon);
    phonenum = phonenum.trim();
    var sql = 'UPDATE user SET lat=?, lon=? WHERE phonenum=?';
    var params = [lat, lon, phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.get(['/user_gps'], function(req, res) {
    var phonenum = req.query.phonenum;
    var gps = req.query.gps;
    console.log("user_gps");
    console.log(phonenum);
    console.log(gps);
    phonenum = phonenum.trim();
    var sql = 'UPDATE user SET gps=? WHERE phonenum=?';
    var params = [gps, phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.get(['/user_install'], function(req, res) {
    var phonenum = req.query.phonenum;
    var myTime = req.query.myTime;
    console.log(phonenum);
    console.log(myTime);
    phonenum = phonenum.trim();
    var sql = 'UPDATE user SET installYN=? WHERE phonenum=?';
    var params = [myTime, phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.get(['/user_state'], function(req, res) {
    var phonenum = req.query.phonenum;
    var state = req.query.state;
    console.log(phonenum);
    console.log(state);
    phonenum = phonenum.trim();
    var sql = 'UPDATE user SET state=? WHERE phonenum=?';
    var params = [state, phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.get(['/request_allow'], function(req, res) {
    var identifier = req.query.identifier;
    var notify = req.query.notify;
    console.log("ID="+identifier);
    console.log("널="+notify);
    var sql = 'UPDATE request SET notify=? WHERE identifier=?';
    var params = [notify, identifier];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/request_allow'], function(req, res) {
    var identifier = req.query.identifier;
    var notify = req.query.notify;
    var allow = req.query.allow;
    console.log(identifier);
    console.log(notify);
    console.log(allow);
    var sql = 'UPDATE request SET allow=?, notify=? WHERE id=?';
    var params = [allow, notify, identifier];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/user'], function(req, res) {
    var name = req.query.name;
    var phonenum = req.query.phonenum;
    console.log(name);
    console.log(phonenum);
    var sql = 'INSERT INTO user (name, phonenum) VALUES(?, ?)';
    var params = [name, phonenum];

    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/user_delete'], function(req, res) {
    var phonenum = req.query.phonenum;
    console.log("여기="+phonenum);
    var sql = 'DELETE from user WHERE phonenum=?';
    var params = [phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/user_delete2'], function(req, res) {
    var phonenum = req.query.phonenum;
    console.log("여기="+phonenum);
    var sql = 'DELETE from request WHERE identifier=?';
    var params = [phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.post(['/user_delete3'], function(req, res) {
    var phonenum = req.query.phonenum;
    console.log("여기="+phonenum);
    var sql = 'DELETE from geofence WHERE identifier=?';
    var params = [phonenum];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});

app.get(['/geofence'], function(req, res) {
    var identifier = req.query.identifier;
    var onoff = req.query.onoff;
    var time = req.query.time;
    var time2 = req.query.time2;
    identifier = identifier.trim();
    console.log(identifier);
    console.log(onoff);
    console.log(time);
    console.log(time2);
    time = time + " " + time2;
    var sql = 'INSERT INTO geofence (identifier, onoff, time) VALUES(?, ?, ?)';
    var params = [identifier, onoff, time];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});
/*
app.post(['/geofence'], function(req, res) {
    var identifier = req.query.identifier;
    var onoff = req.query.onoff;
    var time = req.query.time;
    var time2 = req.query.time2;
    console.log(identifier);
    console.log(onoff);
    console.log(time);
    console.log(time2);
    time = time + " " + time2;
    var sql = 'INSERT INTO geofence (identifier, onoff, time) VALUES(?, ?, ?)';
    var params = [identifier, onoff, time];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send("OK");
        }
    });
});
*/
app.get(['/request'], function(req, res) {
    conn.connect();
    var identifier = req.query.identifier;
    var startday = req.query.startday;
    var starttime = req.query.starttime;
    var endday = req.query.endday;
    var endtime = req.query.endtime;
    var reason = req.query.reason;
    var time = req.query.time;
    var time2 = req.query.time2;
    time = time + " " + time2;
    identifier = identifier.trim();
    console.log(identifier);
    console.log(startday);
    console.log(starttime);
    console.log(endday);
    console.log(endtime);
    console.log(reason);
    console.log(time);
    var sql = 'INSERT INTO request (identifier, startday, starttime, endday, endtime, reason, time) VALUES(?, ?, ?, ?, ?, ?, ?)';
    var params = [identifier, startday, starttime, endday, endtime, reason, time];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("OK");

        }
    });
    conn.end();
});
/*
app.post(['/request'], function(req, res) {
    var identifier = req.query.identifier;
    var startday = req.query.startday;
    var starttime = req.query.starttime;
    var endday = req.query.endday;
    var endtime = req.query.endtime;
    var reason = req.query.reason;
    var time = req.query.time;
    var time2 = req.query.time2;
    time = time + " " + time2;
    console.log(identifier);
    console.log(startday);
    console.log(starttime);
    console.log(endday);
    console.log(endtime);
    console.log(reason);
    console.log(time);
    var sql = 'INSERT INTO request (identifier, startday, starttime, endday, endtime, reason, time) VALUES(?, ?, ?, ?, ?, ?, ?)';
    var params = [identifier, startday, starttime, endday, endtime, reason, time];
    conn.query(sql, params, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("OK");
        }
    });
});
*/
app.listen(3000, function() {
    console.log('Connected 3000 port!');
});
