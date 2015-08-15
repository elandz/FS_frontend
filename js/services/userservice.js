app.factory
   (
        'UserService',
        [
            '$http',
            '$cookies',
            function($http,$cookies)
            {
                var urlBase = 'http://api.friendsend.it/api/1';
                
                var service = {};
                
                service.login = function(data)
                {
                    return $http({
                        url : urlBase+"/members/auth",
                        method : "POST",
                        data :data
                    });
                },
                service.loginTemp = function(user)
                {
                    return $http({
                        url : "Api/signup",
                        method : "POST",
                        data :user
                    });
                },
                service.register = function (user)
                {
                    return $http({
                        url : urlBase+"/members",
                        method : "POST",
                        data :user
                    });
                },
            
                service.getLoggedInUser = function ()
                {
                    var loggedInUser =  sessionStorage.getItem("user");
                    
                    if
                    (
                        loggedInUser != null &&
                        loggedInUser != undefined &&
                        loggedInUser  != ""
                    )
                    {
                        loggedInUser = JSON.parse(loggedInUser);
                    }
                    else
                    {
                        loggedInUser = "" ;
                    }
                    
                    return loggedInUser;
                },
                
                service.getToken = function ()
                {
                    if($cookies.token == undefined)
                    {
                        return "" ;
                    }
                    
                    var token =  $cookies.token;
                    return token ;
                },
                service.updateMember = function (uri,data)
                {
                    return $http({
                        url : urlBase+"/members/"+uri,
                        method : "PUT",
                        data :data
                    });
                },
                
                service.updateMemberPassword = function (uri,data)
                {
                    return $http({
                        url : urlBase+"/members/"+uri,
                        method : "PUT",
                        data :data
                    });
                }
                
                return service;
            }
        ]
    );