var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/health', (request, response) => {
  return response.json({ status: 'ok', service: 'auth-client', version: 1 });
});

app.listen(process.env.PORT || 8082);