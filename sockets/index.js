var logger = require("../config/winstonconfig");
var TAG = "[socket.io]";

module.exports = function(io) {

  io.on("connection", function(socket) {
    logger.log("debug", "%s client connected...", TAG);
    socket.emit("from server", {data: "test data from server"});

    socket.on("from client", function(data) {
      logger.log("debug", "%s test data from client... ", TAG, data);
    });

    socket.on('add-order', function(order) {
      logger.log("debug", "%s add new order... ", TAG, order);
      io.emit('notification', {
        message: 'new order',
        order: order
      });
    });

    socket.on('disconnect', function() {
      logger.log("debug", "%s socket.io client disconnected", TAG);
    });
  });

};