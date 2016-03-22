angular.module("myApp")
	.constant("view1Url", "http://localhost/views1")
	.controller("view1Ctrl", function($scope, $http, $resource, $log, view1Url, socket) {
		$scope.orders = [];
		$scope.newOrder = {};

		$scope.addOrder = function() {
			socket.emit('add-order', $scope.newOrder);
		};

		socket.on('notification', function(data) {
			$scope.$apply(function () {
				$scope.newCustomers.push(data.order);
			});
		});
	});