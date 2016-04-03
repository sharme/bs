/**
 * Created by yao on 4/2/16.
 */

//require module
var http = require('http');


//create server
http.createServer(function(request, response){

    //Send the http header
    //HTTP status: 200, OK
    //Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    //SEND THE RESPNSE BDDY AS 'HELLO WORLD'
    response.end('Welcome to my first application: Hello world!\n');

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');






//REPL    Read    Eval     Print     Loop

// ctrl + c - terminate the current command.
//
//     ctrl + c twice - terminate the Node REPL.
//
//     ctrl + d - terminate the Node REPL.
//
//     Up/Down Keys - see command history and modify previous commands.
//
//     tab Keys - list of current commands.
//
//     .help - list of all commands.
//
//     .break - exit from multiline expression.
//
//     .clear - exit from multiline expression
//
//     .save filename - save current Node REPL session to a file.
//
//     .load filename - load file content in current Node REPL session.




// upgrade npm
// $ sudo npm install npm -g



// list all your dependencies on npm
// npm ls         --- locally
// npm ls -g      --- globally


// uninstall dependency
// npm uninstall express


// update dependency
// npm update express



// search dependency
// npm search express





//how to create a package.json, npm init will walk you through
//     npm init


//npm adduser to register yourself with npm repository site using a valid email address.
//      npm adduser



//http://www.tutorialspoint.com/nodejs/nodejs_npm.htm     more info please referring to this tutorial.







