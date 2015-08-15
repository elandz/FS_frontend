app.controller('ProfileController', [ '$scope', '$state', '$http', 'UserService',function($scope, $state, $http, UserService) {
			
	
	$scope.password = "";
	$scope.rePassword = "";
	$scope.user = UserService.getLoggedInUser();
	$scope.token = UserService.getToken() ;
	
	
	

	$scope.updateUser = function(){
		
		$scope.token = UserService.getToken() ;
		
		if($scope.token ==""){
			return ;
		}
		
		UserService.updateMember($scope.token,$scope.user).success(function(response) {
			
									

		}).error(function(error) {

		})
	};
	
	$scope.updatePassword = function(){
		
		$scope.token = UserService.getToken() ;
		if($scope.token ==""){
			return ;
		}
		
		
		if($scope.password !=  $scope.rePassword ){
			
			alert("Password Does not match");
			return ;
		}
		
		var data = { "password": $scope.password, "passwordRepeat": $scope.rePassword } ; 
		
		UserService.updateMemberPassword($scope.token,data).success(function(response) {
			
									

		}).error(function(error) {

		})
		
	};



} ]);







