require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static(path.resolve(__dirname + '/../client/build')));

app.get('/health', (request, response) => {
  return response.json({ status: 'ok', service: 'auth-client', version: 1 });
});

app.get('/*', (request, response, next) => {
  fs.readFile(path.resolve(__dirname + '/../client/build/index.html'), 'utf8', (error, file) => {
    if (error) {
      return next(error);
    }
    // TODO: Templatize this
    const hydratedHtml = file.replace("{%env%}", `
    var homepagePath='${process.env.HOMEPAGE_PATH}';
    var authApiPath = '${process.env.AUTH_API_PATH}';
    `);
    return response.send(hydratedHtml);
  });

  // return response.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.use((err, request, response, next) => {
  console.log(err);

  response.status(500)
  response.json({ error: "Something went wrong" });
});

app.listen(process.env.PORT || 8082);