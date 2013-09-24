var fs = require('fs');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers" : "X-Requested-With, X-HTTP-Method-Override,  Content-Type, Accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type' : "application/JSON"
};