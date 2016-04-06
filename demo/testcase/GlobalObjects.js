/**
 * Created by yao on 4/3/16.
 */

// __filename   the resolved absolute path of this code file.

console.log('Object: __filename = '  + __filename);



// __dirname represents the name of the directory that the currently executing script resides in

console.log('Object: __dirname = ' + __dirname);


// setTimeout(cb, ms)      used to run callback cb after at least ms milliseconds
function printHello(){
    console.log('setTimeout callback 2 seconds: Hello World!');
}
// Now call above function after 2 seconds
var t = setTimeout(printHello, 2000);


// clearTimeout(t)     used to stop a timer that was previously created with setTimeout()
clearTimeout(t);



// setInterval(cb, ms)  used to run callback cb repeatedly after at least ms milliseconds
function printHelloRepeats() {
    console.log("setInterval: Hello World!");
}

var intervalTime = setInterval(printHelloRepeats, 3000);

setTimeout(function () {
   clearInterval(intervalTime)
}, 10000);

