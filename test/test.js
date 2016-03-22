var bcrypt = require("bcrypt");

var password = "1111";

bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
     console.log(hash);
  });
});