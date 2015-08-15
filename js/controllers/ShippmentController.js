app.controller('ShippmentController', [ '$scope', '$state', 'ShipmentService',function($scope, $state, ShipmentService) {
			
	
	$scope.shippment = {} ;
	
	
	$scope.init =function(){
		$scope.shippment = sessionStorage.getItem("shippment");
		if($scope.shippment != undefined || $scope.shippment != "" ){
			$scope.shippment = JSON.parse($scope.shippment);
		}
	};
	
	$scope.saveShippment = function(){
		
		
		
		if( $scope.validateShippment ){
			ShipmentService.saveShipment($scope.shippment)
              .success
              (
                  function(response,status,header,config)
                  {
                	  alert("Shipment Created !!");
                	  $scope.shippment = {} ;
                     

                  }
               )
               .error
               (
                   function(error,status)
                   {

                       if(status == "400"){
                           $scope.loginErrMessage = "Sign-in failure";
                       }

                       if(status == "403"){
                           $scope.loginErrMessage = "Auth Failure";
                       }
                       if(status == "0"){
                           $scope.loginErrMessage = "Auth Failure";
                       }

                   }
               )
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
	

} ]);







