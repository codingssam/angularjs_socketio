var express = require("express");
var router = express.Router();
var passport = require("passport");
var fs = require("fs");
var path = require("path");
var logger = require("../config/winstonconfig");
var TAG = "[express]";

router.get("/", function(req, res, next) {
	if (req.secure) {
		var filePath = path.join(__dirname, "..", "public/app/index.html");
		var reader = fs.createReadStream(filePath);
		reader.pipe(res);
	} else {
		var err = new Error("SSL/TLS Upgrade Required");
		err.status = 426;
		next(err);
	}
});

router.post("/login", function(req, res, next) {
	logger.log("debug", "%s req.secure: ", TAG, req.secure);
	logger.log("debug", "%s req.method: %s req.url: %s ", TAG, req.method, req.url);
	logger.log("debug", "%s req.body: ", TAG, req.body);
	if (req.secure) {
		passport.authenticate("local-login", function(err, user) {
			if (err) {
				next(err);
			} else if (!user) {
				var err = new Error("password를 확인하시기 바랍니다.");
				err.status = 401;
				next(err);
			} else {
				req.logIn(user, function(err) {
					if (err) {
						console.log(err);
						next(err);
					} else {
						logger.log("debug", "%s req.login()... ", TAG, req.user);
						res.json({
							"message": "Login Success"
						});
					}
				});
			}
		})(req, res, next);
	} else {
		var err = new Error("SSL/TLS Upgrade Required");
		err.status = 426;
		next(err);
	}
});

router.post("/logout", function(req, res, next) {
	if (req.secure) {
		req.logout();
		logger.log("debug", "%s req.secure: ", TAG, req.secure);
		logger.log("debug", "%s req.method: %s req.url: %s ", TAG, req.method, req.url);
		logger.log("debug", "%s req.user: ", TAG, req.user);
		res.json({
			"message": "Logout Success"
		});
	} else {
		var err = new Error("SSL/TLS Upgrade Required");
		err.status = 426;
		next(err);
	}
});

module.exports = router;
