angular.module("myApp")
	.constant("view1Mgmt", "뷰1관리")
	.constant("view2Mgmt", "뷰2관리")
	.constant("view3Mgmt", "뷰3관리")
	.constant("view4Mgmt", "뷰4관리")
	.constant("view5Mgmt", "뷰5관리")
	.factory("socket", function() {

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ')
					c = c.substring(1);
				if (c.indexOf(name) == 0)
					return c.substring(name.length, c.length);
			}
			return "";
		}

		var socket = io.connect("//" + window.location.host, {
			query: "session_id=" + getCookie("myapp.sid")
		});

		return {
			on: function(eventName, callback){
				socket.on(eventName, callback);
			},
			emit: function(eventName, data) {
				socket.emit(eventName, data);
			}
		};
	})
	.controller("mainCtrl", function($scope, $log, socket, view1Mgmt, view2Mgmt, view3Mgmt, view4Mgmt, view5Mgmt) {

		socket.on("from server", function (data) {
			$log.debug("[socket.io] from server event => ");
			$log.debug("[socket.io] data.user: " + data.user);
			$log.debug("[socket.io] data.message: " + data.message);
			socket.emit("from client", { message: "test data" });
		});

		$scope.screens = [view1Mgmt, view2Mgmt, view3Mgmt, view4Mgmt, view5Mgmt];
		$scope.currentScreen = $scope.screens[0];

		$scope.getScreen = function() {
			switch ($scope.currentScreen) {
			case view1Mgmt:
				return "app/views/view1.html";
			case view2Mgmt:
				return "app/views/view2.html";
			case view3Mgmt:
				return "app/views/view3.html";
			case view4Mgmt:
				return "app/views/view4.html";
			case view5Mgmt:
				return "app/views/view5.html";
			default:
				return "app/views/view1.html";
			}
		};

		$scope.setScreen = function(index) {
			$scope.currentScreen = $scope.screens[index];
		};

	});
