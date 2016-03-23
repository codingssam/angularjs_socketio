angular.module("myApp", ["ngRoute", "ngResource"])
	.config(function($routeProvider) {
		$routeProvider.when("/login", {
			templateUrl: "app/views/login.html"
		});
		$routeProvider.when("/main", {
			templateUrl: "app/views/main.html"
		});
		$routeProvider.otherwise({
			redirectTo: "/login"
		});
	})
	.controller("topCtrl", function($scope, $log) {

	});