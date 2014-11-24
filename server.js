/*globals require*/
var http = require('http'),
    fs = require('fs');

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

// Listen on port
server.listen(8000);