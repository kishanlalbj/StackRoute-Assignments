var application=angular.module('myapp',[]);
application.controller('ctrl',function($scope){
	$scope.first=1;
	$scope.second=2;
	$scope.updateValue=function(){
		$scope.calculation=+$scope.first + +$scope.second;
	};

	$scope.getlist=function(){
		return $scope.showlist ? "part1.html" : "part2.html";
	}


});
