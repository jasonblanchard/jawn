var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static(path.resolve(__dirname + '/../client/build')));

app.get('/health', (request, response) => {
  return response.json({ status: 'ok', service: 'auth-client', version: 1 });
});

app.get('/*', (request, response) => {
  return response.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.listen(process.env.PORT || 8082);