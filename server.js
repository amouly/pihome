/*jslint node: true*/
'use strict';

var express = require('express'),
    app = express(),
    server = app.listen(8000),
    io = require('socket.io').listen(server),
    exec = require('child_process').exec;

//Static folder
app.use(express.static('static'));

//Get root path
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    
    //Read Temperature event
    socket.on('readTemp', function (data) {
        
        function emitTemp() {
            //Execute System cmd
            exec("vcgencmd measure_temp", function (error, stdout, stderr) {
                if (error !== null) {
                    socket.emit('tempError', { error: error });
                } else {
                    var temp = stdout.slice(5, 11);

                    socket.emit('tempData', { value: temp });
                }
            });
        }
        
        emitTemp();
        setInterval(emitTemp, 5000);
    });
    
    //Read uptime
    socket.on('readUptime', function () {
        
        function emitUptime() {
            //Execute System cmd
            exec("uptime | tail -n 1 | awk '{print $3}'", function (error, stdout, stderr) {
                if (error !== null) {
                    socket.emit('uptimeError', { error: error });
                } else {
                    var uptime = stdout.slice(0, 4);

                    socket.emit('uptimeData', { value: uptime });
                }
            });
        }
        
        emitUptime();
        setInterval(emitUptime, 30000);
    });
});

//Get system temperature
app.get('/temperature', function (req, res) {
    
    //Execute System cmd
    exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
        if (error !== null) {
            res.send('exec error: ' + error);
        } else {
            var temp = parseFloat(stdout) / 1000;
            
            res.send('Temperature: ' + temp);
        }
    });
});
