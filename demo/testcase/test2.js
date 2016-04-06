/**
 * Created by yao on 4/3/16.
 */




//Blocking code example
var fs = require('fs');
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('Blocking code example: Program ended\n\n');



//NO-Blocking code example
var fs = require('fs');
fs.readFile('input.txt', function(err, data){

    if (err) return console.log(err);
    //or
    console.log(data.toString());

});

console.log('NO-Blocking code example: Program ended\n\n\n\n');





//Import events module
var events = require('events');
//create an eventEmitter object
var eventEmitter = new events.EventEmitter();


// Create an event handler as follows
var connectHandler = function connected(){
    console.log('connection  successful');

    //Fire the data received event
    eventEmitter.emit('data_received');

};

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);



// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function () {
   console.log('data_received successfully');
});


// Fire the connection event
eventEmitter.emit('connection');

console.log('Program Ended');





console.log('async function tests \n\n\n');


fs.readFile('input2.txt', function(err, data){
    if(err){
        console.log(err.stack);
        return;
    }

    console.log(data.toString());

});


console.log('Program Ended');







