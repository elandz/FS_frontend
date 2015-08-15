'use strict';
var mainScope="";
/* Main Controllers */

app.controller
(
    'AppCtrl',
    [
        '$scope',
        '$state',
        '$translate',
        'UserService',
        '$rootScope',
        
        function($scope, $state, $translate, UserService,$rootScope)
        {
            mainScope = $scope;
            
            $scope.loggedInUser = "" ;
            $scope.user = {};
            $scope.loginErrMessage = "";
            $scope.registerSuccessMsg = "";
            $scope.registerErrMsg = "";
            $scope.register = {};

            
            $scope.app = { name : 'My Angular App', version : '1.0' };
            
            $scope.getLoggedInUser = function(){
                $scope.loggedInUser =  localStorage.getItem("user");
                
                if( $scope.loggedInUser != null &&
                    $scope.loggedInUser != undefined &&
                    $scope.loggedInUser  != ""
                )
                {
                    $scope.loggedInUser = JSON.parse($scope.loggedInUser);
                }
                else
                {
                    $scope.loggedInUser = "" ;
                }
            };
            
        	$scope.getLoginState = function(name) 
			{
			
				var currentState = name;
				if(currentState != "app.home" && currentState != "app.media" &&
						currentState != "app.contact" && currentState != "app.faq" &&
						currentState != "app.sending"
				){
					
				
					var token =  UserService.getToken();
					if(token == undefined || token == ""){
						$state.go("app.home");
					}
				}
				
			};
            
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 

            	
            	
            	$scope.getLoginState(toState.name);
            });
        
            $scope.logout = function()
            {
                $scope.loggedInUser = "" ;
                $scope.deleteCookie("token");
                localStorage.removeItem("user");
                $state.go("app.home");
            };

            $scope.register  = function()
            {
            	
            	var data = {} ;
            	data.email = $scope.register.email;
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

            };
            
            $scope.login = function()
            {

                $scope.loginErrMessage = "";
                UserService.login($scope.user)
                           .success
                           (
                               function(response,status,header,config)
                               {
                                   document.cookie = "token=" + response.uri + "";
                                   localStorage.setItem("user", JSON.stringify(response));
                                   $scope.getLoggedInUser();
                                   setTimeout(function(){
                                	   $state.go("app.profile");
                                   },200);
                                  

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
                            );
                

                
                

            };
            
            $scope.deleteCookie = function(name)
            {
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            };
        
            $scope.selectLanguage = function(lang){
                
                $translate.use(lang);
            };
            
            $scope.getLoggedInUser();
            
            $scope.loadIndex   = function() { $state.go("app.index"); };
            $scope.loadMedia   = function() { $state.go("app.media"); };
            $scope.loadContact = function() { $state.go("app.contact"); };
            $scope.loadFaq     = function() { $state.go("app.faq"); };
            $scope.loadSending = function() { $state.go("app.sending"); };
            
            
            $scope.loadProfile = function() { $state.go("app.profile"); };
            $scope.loadNewShipment = function() { $state.go("app.newhipment"); };
            $scope.loadCreateShipment = function() { $state.go("app.createshipment"); };
            $scope.loadCreateRoute = function() { $state.go("app.createroute"); };
            
            
            $translate.use('en');
            
        }
    ]
)
.run(function ($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        jQuery('html, body').animate({ scrollTop: 0 }, 50);
    });
});











