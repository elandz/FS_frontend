app.controller
(
    'LoginController',
    [
        '$scope',
        '$state',
        '$http',
        'UserService',
        function($scope, $state, $http, UserService)
        {
            $scope.user = {};
             
            // *********** METHODS START HERE ****************** ///
             
            $scope.login = function() {
            	
            	console.log('scpe.login called for Logic Controller');
                 
                UserService.login($scope.user)
                           .success
                           (
                               function(response)
                               {
                                   document.cookie = "token=" + response.user.token + "";
                                   $state.go("app.dashboard");
                               }
                           )
                           .error
                           (
                               function(error)
                               {
                                   // Handle Error Case here ...
                               }
                           );
            };
            
            // *********** METHODS END HERE ********************** ///
        }
    ]
);
