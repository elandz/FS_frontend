app.factory
   (
        'ShipmentService',
        [
            '$http',
            '$cookies',
            function($http,$cookies)
            {
                var urlBase = 'http://api.friendsend.it/api/1';
                
                var service = {};
                
                service.saveShipment = function(data)
                {
                    return $http({
                        url : urlBase+"/shipments",
                        method : "POST",
                        data :data
                    });
                }
                
                return service;
            }
        ]
    );/**
 * 
 */