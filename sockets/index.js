var passportSocketIo = require("passport.socketio");
var logger = require("../config/winstonconfig");
var util = require("util");
var TAG = "[socket.io]";

module.exports = function(io, cookieParser, sessionStore) {

  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          "myapp.sid",
    secret:       process.env.SESSION_SECRET,
    store:        sessionStore,
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail
  }));

  function onAuthorizeSuccess(data, accept) {
    logger.log("debug", "%s onAuthorizeSuccess()... ", TAG);
    accept();
  }

  function onAuthorizeFail(data, message, error, accept) {
    if(error)
      accept(new Error(message));

    logger.log("error", "%s onAuthorizeFail()... : ", TAG, message);
    accept(null, false);
  }

  io.on("connection", function(socket) {
    logger.log("debug", "%s connection event... ", TAG, socket.request.user);
    socket.emit("from server", {
      user: util.inspect(socket.request.user),
      message: "test data from server... "
    });

    socket.on("from client", function(data) {
      logger.log("debug", "%s from client event... ", TAG, data);
    });

    socket.on('add-order', function(order) {
      logger.log("debug", "%s add-order event... ", TAG, order);
      io.emit('notification', {
        user: socket.request.user,
        message: 'new order',
        order: order
      });
    });

    socket.on('disconnect', function() {
      logger.log("debug", "%s disconnect event... ", TAG);
    });
  });

};