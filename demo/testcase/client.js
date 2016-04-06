/**
 * Created by yao on 4/3/16.
 */


var http = require('http');

//Options to be used by request
var options = {
    host: '127.0.0.1',
    port: '8081',
    path: '/index.html'
};

// Callback function is used to deal with response
var callback = function (response) {
  // Continuously update stream with data
    var body = '';
    response.on('data', function(data) {
        body += data;
    });

    response.on('end', function () {
        // Data received completely
        console.log("end " + body);
    });


}

// Make a request to the server
var req = http.request(options, callback);

req.end();




