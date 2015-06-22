/*jslint node: true*/
'use strict';

var express = require('express'),
    app = express(),
    moment = require('moment'),
    server = app.listen(8000),
    io = require('socket.io').listen(server),
    exec = require('child_process').exec,
    gpio = require('gpio');

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

/*
    Read CPU Temperature and pass to Callback
*/
var readCpuTemp = function (callback) {
    exec("vcgencmd measure_temp", function (error, stdout, stderr) {
        if (error !== null) {
            callback('error', { value: error });
        } else {
            var temp = stdout.slice(5, 11);

            callback('cpuTemp', { value: temp });
        }
    });
};

/*
    Read System Uptime and pass to Callback
*/
var readSysUptime = function (callback) {
    exec("uptime -s", function (error, stdout, stderr) {
        if (error !== null) {
            callback('error', { value: error });
        } else {
            var uptime = moment(stdout).fromNow();

            callback('sysUptime', { value: uptime });
        }
    });
};


var statusNs = io.of('/status');

//Emit for all the clients
function emitCpuTemp() {
    readCpuTemp(statusNs.emit);
}

setInterval(emitCpuTemp, 30000);

//Current Socket Events
statusNs.on('connection', function (socket) {


    //readCpuTemp(socket.emit);

    /*socket.on('toggleOne', function () {
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
    });*/


});
