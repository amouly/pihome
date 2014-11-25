/*globals io, console, jQuery*/
(function ($) {
    'use strict';

    var socket = io.connect('http://rp.mouly.com.ar/');

    //Requests to System
    socket.emit('readTemp', { my: 'data' });
    socket.emit('readUptime');

    //On temp sent
    socket.on('tempData', function (temp) {
        //Show data
        $('#temp-value').html(temp.value);
    });
    
    //On uptime sent
    socket.on('uptimeData', function (uptime) {
        //Show data
        $('#uptime-value').html(uptime.value);
    });

}(jQuery));