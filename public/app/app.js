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
	.factory('socket', function() {
		var socket = io.connect();
		return {
			on: function(eventName, callback){
				socket.on(eventName, callback);
			},
			emit: function(eventName, data) {
				socket.emit(eventName, data);
			}
		};
	})
	.controller('topCtrl', function($scope, $log, socket) {
		socket.on("from server", function (data) {
			$log.debug(data);
			socket.emit("from client", { data: "test data" });
		});

	});