angular.module("myApp")
	.constant("view1Mgmt", "뷰1관리")
	.constant("view2Mgmt", "뷰2관리")
	.constant("view3Mgmt", "뷰3관리")
	.constant("view4Mgmt", "뷰4관리")
	.constant("view5Mgmt", "뷰5관리")
	.controller("mainCtrl", function($scope, $log, view1Mgmt, view2Mgmt, view3Mgmt, view4Mgmt, view5Mgmt) {
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
