module.exports = function (io) {
    'use strict';
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'fm@youtumi',
        database: 'kb'
    });
    connection.connect();
    var date = new Date();
    io.on('connection', function (socket) {
        socket.broadcast.emit('user connected');


        socket.on('message', function (from, to, msg) {

            for(var val in io.sockets){
                console.log("socket:" + val);
            }

            io.sockets[from] = socket;
            console.log('Received message from', from, 'to', to, 'msg',  JSON.stringify(msg));
            if(io.sockets[to]) {
                io.sockets[to].emit('broadcast', {
                    payload: msg,
                    source: from
                });
                io.sockets[from].emit('broadcast', {
                    payload: msg,
                    source: from
                });
                console.log('broadcast complete');
            } else {
                io.sockets[from].emit('broadcast', {
                    payload: msg,
                    source: from
                });
                // insert message to table and notify receiver
                var sql = 'insert into kb_messages(m_sender, m_msg, m_to, m_status, m_created_time) values(?,?,?,?,?);';
                var values = [from, msg, to, 1, date];
                sql = mysql.format(sql,values);
                console.log(sql);
                connection.query(sql, function(err, result) {
                    console.log("notify to: " + to + ", result: " + result);
                });
            }
        });

        socket.on('remove', function (to) {
            io.sockets.remove(to);
            console.log('Base remove socket', to, 'index', io.sockets[to]);
            for(var val in io.sockets){
                console.log("socket:" + val);
            }
        });

        socket.on('disconnect', function (to) {
            console.log('socket disconnect', to);

        });

    });
    

};

