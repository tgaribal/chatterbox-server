var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
app.use(express.static('./client'));


var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};



app.options('/classes/messages', function (req, res) {  
  console.log('Serving req type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end();
});






app.get('/classes/messages', function (req, res) {  
  var body = '';
  fs.open('./server/messages.JSON', 'r+', function() {
    fs.readFile('./server/messages.JSON', (err, data) => {
      results = JSON.parse(data.toString());
      console.log('Serving req type ' + req.method + ' for url ' + req.url);
    });
  });
  res.writeHead(200, headers);
  res.end();
});





app.post('./messages.JSON', function (req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    fs.readFile('./server/messages.JSON', function (err, data) {
      var json = JSON.parse(data);
      json.push(JSON.parse(body));
      fs.writeFile('./server/messages.JSON', JSON.stringify(json));
    });
  });
  res.writeHead(201, headers);
  res.end();
});

app.listen(3000, '127.0.0.1', function () {
  console.log('Example app listening on port 3000!');
});