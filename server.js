/*jslint node: true*/
'use strict';

var express = require('express'),
    app = express(),
    moment = require('moment'),
    server = app.listen(8000),
    io = require('socket.io').listen(server),
    exec = require('child_process').exec,
    gpio = require("gpio");

//Static folder
app.use(express.static('static'));

//Get root path
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//[12, 16, 18, 22]
//Pin 12
var gpio18 = gpio.export(18, {
    direction: 'out',
    interval: 200,
    ready: function () {
        console.log('Pin 18 Exported - ' + gpio18.value);
    }
});

//Pin 16
var gpio23 = gpio.export(23, {
    direction: 'out',
    interval: 200,
    ready: function () {
        console.log('Pin 16 Exported - ' + gpio23.value);
    }
});

//Pin 18
var gpio24 = gpio.export(24, {
    direction: 'out',
    interval: 200,
    ready: function () {
        console.log('Pin 24 Exported - ' + gpio24.value);
    }
});

//Pin 22
var gpio25 = gpio.export(25, {
    direction: 'out',
    interval: 200,
    ready: function () {
        console.log('Pin 25 Exported - ' + gpio25.value);
    }
});

//Socket Events
io.on('connection', function (socket) {
    
    //Emit Relays status
    //socket.emit('toggleOne', { value: gpio18.value });
    //socket.emit('toggleTwo', { value: gpio23.value });
    //socket.emit('toggleThree', { value: gpio24.value });
    //socket.emit('toggleFour', { value: gpio25.value });
    
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
            exec("uptime -s", function (error, stdout, stderr) {
                if (error !== null) {
                    socket.emit('uptimeError', { error: error });
                } else {
                    var uptime = moment(stdout).fromNow();

                    socket.emit('uptimeData', { value: uptime });
                }
            });
        }
        
        emitUptime();
        setInterval(emitUptime, 30000);
    });
    
    socket.on('toggleOne', function () {
        if (gpio18.value === 0) {
            gpio18.set(1);
        } else {
            gpio18.set(0);
        }
        
        socket.emit('toggleOne', { value: gpio18.value });
    });
    
    socket.on('toggleTwo', function () {
        if (gpio23.value === 0) {
            gpio23.set(1);
        } else {
            gpio23.set(0);
        }
        
        socket.emit('toggleTwo', { value: gpio23.value });
    });
    
    socket.on('toggleThree', function () {
        if (gpio24.value === 0) {
            gpio24.set(1);
        } else {
            gpio24.set(0);
        }
        
        socket.emit('toggleThree', { value: gpio24.value });
    });
    
    socket.on('toggleFour', function () {
        if (gpio25.value === 0) {
            gpio25.set(1);
        } else {
            gpio25.set(0);
        }
        
        socket.emit('toggleFour', { value: gpio25.value });
    });
});