process.env.NODE_ENV  = process.env.NODE_ENV || 'development'

var express = require('express');
var http = require('http');
//var mongoose = require('./config/mongoose');
var config = require('./config/config');
//var db = mongoose();
var app = express();
var port = config.server['port'];
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./config/express')(app,io, express);
server.listen(port);
console.log('runnign listen port '+port);
