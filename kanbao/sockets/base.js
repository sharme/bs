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
            
            io.sockets[from] = socket;

            console.log('Received message from', from, 'msg', JSON.stringify(msg));
            // console.log('broadcasting message');
            // console.log('payload is', msg);
            // io.sockets[to].emit('broadcast', {
            //     payload: msg,
            //     source: from
            // });

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
    });

    // io.clients(function(error, clients){
    //     if(error) throw error;
    //     console.log(clients);
    // })

};

