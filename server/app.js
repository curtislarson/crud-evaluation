var bodyParser = require("body-parser");
var path = require("path");
var express = require("express");
var winston = require("winston");
var mongoose = require("mongoose");

var app = express();

var publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.use(bodyParser.json());

module.exports = app;

require("./routes")(app);

app.use(function(request, response) {
  response.sendFile(path.resolve("public/index.html"));
});

var port = process.env.PORT || 3000;
if (app.get("env") === "test") {
  app.set("mongoose", mongoose.connect("mongodb://localhost/test"));
  port = 3111;
}
else if (app.get("env") === "development") {
  app.set("mongoose", mongoose.connect("mongodb://localhost/test"));
}

var server = app.listen(port, () => {
  var addr = server.address();
  winston.info("Listening on at http://%s:%s", addr.address, addr.port);
});
