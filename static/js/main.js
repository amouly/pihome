/*globals io, console, jQuery*/
(function ($) {
    'use strict';

    var socket = io.connect('http://home.mouly.io/status');
    
    function parseStatus(value) {
        if (value === 1) {
            return "On";
        } else {
            return "Off";
        }
    }

    // On temp sent
    socket.on('cpuTemp', function (temp) {
        //Show data
        $('#temp-value').html(temp.value);
    });

    // On uptime sent
    socket.on('sysUptime', function (uptime) {
        //Show data
        $('#uptime-value').html(uptime.value);
    });


    // Button and Pin ONE
    $('#toggle-one').on('click', function () {
        console.log("Click Toggle One");

        socket.emit('toggleOne');
    });

    // ON Toggle Status
    socket.on('toggleOne', function (status) {
        //Show data
        $('#toggle-one-status').html(parseStatus(status.value));
    });

    // Button and Pin TWO
    $('#toggle-two').on('click', function () {
        console.log("Click Toggle Two");

        socket.emit('toggleTwo');
    });

    // ON Toggle Status
    socket.on('toggleTwo', function (status) {
        //Show data
        $('#toggle-two-status').html(parseStatus(status.value));
    });

    // Button and Pin THREE
    $('#toggle-three').on('click', function () {
        console.log("Click Toggle Three");

        socket.emit('toggleThree');
    });

    // ON Toggle Status
    socket.on('toggleThree', function (status) {
        //Show data
        $('#toggle-three-status').html(parseStatus(status.value));
    });

    // Button and Pin FOUR
    $('#toggle-four').on('click', function () {
        console.log("Click Toggle Four");

        socket.emit('toggleFour');
    });

    // ON Toggle Status
    socket.on('toggleFour', function (status) {
        //Show data
        $('#toggle-four-status').html(parseStatus(status.value));
    });

}(jQuery));
