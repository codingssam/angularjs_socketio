var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var async = require("async");
var users = require("../mockData/users");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                user = users[i];
                break;
            }
        }
        done(null, user);
    });

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, username, password, done) {

        function findUser(callback) {
            var user;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === username) {
                    user = users[i];
                    break;
                }
            }

            if (user === undefined) {
                return callback(new Error("해당 email을 사용하는 계정이 없습니다..."));
            }

            callback(null, user);
        }

        function comparePassword(user, callback) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    if (result) {
                        callback(null, user);
                    } else {
                        callback(null, false);
                    }
                }
            });
        }

        async.waterfall([findUser, comparePassword], function(err, user) {
            if (err) {
                done(err);
            } else {
                delete user.password;
                done(null, user);
            }
        });
    }));
};

