app.controller
(
    'HomeController',
    [
        '$scope',
        '$state',
        '$http',
        'UserService',
        function($scope, $state, $http, UserService)
        {
            // *********** METHODS START HERE ****************** ///
        	
        	
        	$scope.user = {} ;
        	$scope.email = "";
        	$scope.shippment = {} ;
        	
        	 $scope.registerPopup = function(){
        		 
        		 
        		 	if($scope.email == ""){
        		 		return ;
        		 	};
        		 	
        		 	var data = {} ;
                	data.email = $scope.email;
        		 	
        		    $scope.registerSuccessMsg = "";
                    $scope.registerErrMsg = "";
                    UserService.register(data)
                        .success
                    (
                        function(response,status)
                        {
                            $scope.registerSuccessMsg = "Successfully Registered";


                        }
                    )
                        .error
                    (
                        function(error,status)
                        {

                            if(status == "400"){
                            $scope.registerErrMsg = "Member already exists";
                            }
                            if(status == "0"){
                                $scope.registerErrMsg = "Member already exists";
                            }




                        }
                    );
        	 }
        	
        	
        	 $scope.loginPopup = function()
              
        	
        	
        	 {
        		 
        		
                 $scope.loginErrMessagePP = "";
                 UserService.login($scope.user)
                            .success
                            (
                                function(response,status)
                                {
                                    document.cookie = "token=" + response.uri + "";
                                    localStorage.setItem("user", JSON.stringify(response));
                                    mainScope.getLoggedInUser();
                                    setTimeout(function(){
                                    	 $state.go("app.createshipment");
                                    },200);
                                   

                                }
                             )
                             .error
                             (
                                 function(error,status)
                                 {

                                     if(status == "400"){
                                         $scope.loginErrMessagePP = "Sign-in failure";
                                     }

                                     if(status == "403"){
                                         $scope.loginErrMessagePP = "Auth Failure";
                                     }
                                     if(status == "0"){
                                         $scope.loginErrMessagePP = "Auth Failure";
                                     }

                                 }
                             );

             };
             
             $scope.goEvent = function(){
            	 
            	 $scope.token = UserService.getToken() ;
            	if($scope.token == ""){
            		//$('#target').toggle();
            		$('#target').modal('show');
            		
            	}else {
            		
            		if($scope.validateShippment()){
            			
            			sessionStorage.setItem("shippment",JSON.stringify($scope.shippment));
            			$state.go("app.createshipment");
            		}
            		
            		
            	}
            	 
             };
             
             $scope.validateShippment= function(){
            	
            	if( $scope.shippment.fromLocation == "" || $scope.shippment.fromLocation == undefined ){
            		return false ;
            	}
            	
            	if( $scope.shippment.toLocation == ""  || $scope.shippment.toLocation == undefined ){
            		return false ;
            	}
            	
            	if( $scope.shippment.compensation == "" || $scope.shippment.compensation == undefined ){
            		return false ;
            	}
            	
            	if($scope.shippment.dateStr == "" || $scope.shippment.dateStr == undefined ){
            		return false ;
            	}
            	
            	if($scope.shippment.item == "" || $scope.shippment.item == undefined ){
            		return false ;
            	}
            	
            	return true ;
            	 
            	 
             };
        	
        	
        	
            // *********** METHODS END HERE ********************** ///
        }
    ]
);












