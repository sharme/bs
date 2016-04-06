/**
 * Created by yao on 4/3/16.
 */

// uninitiated Buffer of 10 octets
var buf = new Buffer(10);

// Buffer from a given array
var buf = new Buffer([10, 20, 30, 40, 50]);


// utf-8 is the default encoding,  encodings are ascii, utf8, utf161e, ucs2, base64, hex
var buf = new Buffer('Simply Easy Learning', 'utf-8');


// method to write into a Node buffer
// buf.write(string[, offset][, length][, encoding])


var buf1 = new Buffer(256);
len = buf1.write('Simply Easy Learning');
console.log('Octets written : ' + len);


//method to read data from a Node buffer
// buf1.toString([encoding][, start][, end])
var buf2 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
    buf2[i] = i + 97;
}
console.log( buf2.toString('ascii'));
// console.log( buf2.toString('ascii', 0.5));
// console.log( buf2.toString('utf8', 0.5));
// console.log( buf2.toString(undefined, 0.5));


// Convert Buffer to JSON
console.log('Buffer to JSON \n\n');

var buf3 = new Buffer('Simply Easy Learning');
var json = buf3.toJSON(buf3);
console.log(json);





// Concatenate Buffers
// Buffer.concat(list[, totallength])

console.log('\n\n');

var buffer1 = new Buffer('TutorialsPoint ');
var buffer2 = new Buffer('Simply Easy Learning ');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('buffer3 content: ' + buffer3.toString());













