angular.module("myApp")
	.constant("authUrl", "https://localhost/login")
	.config(function($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
	})
	.controller("authCtrl", function($scope, $http, $location, $log, authUrl) {
		$scope.authenticate = function(email, password) {
			var data = {
				email: email,
				password: password
			};
			$http.post(authUrl, data)
				.success(function(data) {
					$log.debug(authUrl + " => " + data);
					$location.path("/main");
				})
				.error(function(err) {
					$log.error(authUrl + " => " + err);
					$scope.authenticateError = err;
				});
		};
	});