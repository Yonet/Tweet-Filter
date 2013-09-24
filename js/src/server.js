var express = require('express');
var handler = require('./tweet-handlers.js');


var app = express();

var port = 8080;
var ip = "127.0.0.1";


var server = http.createServer(handler.handleRequest);
server.listen(port, ip);