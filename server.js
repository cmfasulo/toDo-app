var express = require('express'); //import express package
var app = express(); //define app as an express app
var bodyParser = require('body-parser'); //allows for reading data in requests/responses
var routes = require('server/routes'); //import server routes

var PORT = process.env.PORT || 3000; //list all ports for deployment

app.use(bodyParser.json());

routes(app);

//display html in page
app.all('/*', function(req, res) {
  res.send('\
    <!DOCTYPE html>\
    <html>\
      <head>\
        <title>ToDo App</title>\
        <base href="/">\
      </head>\
      <body>\
        <div ui-view></div>\
        <script src="bundle.js"></script>\
      </body>\
    </html>\
  ');
});

//callback function to confirm server is listening on specified port
app.listen(PORT, function() {
  console.log('Server is up and running on PORT: ' + PORT);
});
