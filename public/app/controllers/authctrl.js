angular.module("myApp")
	.constant("authUrl", "https://localhost/login")
  .constant("TAG", "[angularjs-authCtrl] ")
	.config(function($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
	})
	.controller("authCtrl", function($scope, $http, $location, $log, authUrl, TAG) {
		$scope.authenticate = function(email, password) {
			var data = {
				email: email,
				password: password
			};
			$http.post(authUrl, data)
				.success(function(data) {
					$log.debug(TAG + authUrl + " => " + data.message);
					$location.path("/main");
				})
				.error(function(err) {
					$log.error(TAG + authUrl + " => " + err.message);
					$scope.authenticateError = err;
				});
		};
	});