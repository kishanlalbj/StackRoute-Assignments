angular.module('app').controller('control',control)
                      .controller('deleteControl',deleteControl)
                      .controller('addControl',addControl);

function addControl($scope,$http) {

}

function deleteControl ($scope,$http) {
  $scope.delete = function(id) {

  						$http({
  							method:'DELETE',
  							url:"http://localhost:8080/customers/"+id,
  						}).then(function success(response){
  							var xx = eval($scope.details);
  							for(var i=0;i<xx.length;i++)
  							{
  								if (xx[i].id===id) {
  									index = i;
  									break;
  								}
  							}
  							$scope.details.splice(index,1);
  						});
  			   	}
}

function control ($scope,$http) {
  $scope.viewAll = function () {
    $http.get('http://localhost:8080/customers/?&_limit=100').success(function (response) {
    $scope.details = response;
    });
 }

 $scope.submit = function(name,customer_id,gender,account_type,balance){

       var info={
           name:name,
           customer_id:customer_id,
           gender:gender,
           account_type:account_type,
           balance:balance,
           };

     $http({
         method : "POST",
         url : "http://localhost:8080/customers/",
         data:info
      }).then(function succes(response) {
     $scope.details = [response.data];

   });
 };

 $scope.searching = function (keyword) {
 	$http({
 		method : 'GET',
 		url : 'http://localhost:8080/customers/?name='+keyword+'&page=1&_limit=10',
 	}).then(function success(response) {
 		$scope.details = response.data;
 	});
 };
$scope.values = {};
 $scope.updated = function (details) {
   $scope.values = details;
 }

$scope.update = function () {
  $http.put("http://localhost:8080/customers/" + $scope.values.id, $scope.values)
          .then(function success(response) {
              $scope.detail = response.data;
          }, function error(response) {
              alert("update failure");
          });
}
}
