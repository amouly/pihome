/*globals require, console*/
var http = require('http'),
    fs = require('fs'),
    exec = require('child_process').exec;

// Create HTTP Server
var server = http.createServer(function (request, response) {
    'use strict';
    
    // Read template file
    fs.readFile('index.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        response.write(data);
        response.end();
    });
});

function readTemp() {
    'use strict';

    var temp;

    exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            temp = parseFloat(stdout) / 1000;
        }
    });
}

// Listen on port
server.listen(8000);
