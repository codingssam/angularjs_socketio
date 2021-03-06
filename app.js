var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var passport = require("passport");
var logger = require("./config/winstonconfig");
var io = require("socket.io");

var sessionStore = new RedisStore({
  host: 'localhost',
  port: 6379,
  client: redis.createClient()
});

var app = express();
app.io = io();

var index = require("./routes");

require("./config/passportconfig")(passport);
require("./sockets")(app.io, cookieParser, sessionStore);

// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: sessionStore,
  name: "myapp.sid",
  secret: process.env.SESSION_SECRET,
  cookie: { "maxAge": parseInt(process.env.COOKIE_MAXAGE) },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      status: err.status,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    error: {}
  });
});

module.exports = app;