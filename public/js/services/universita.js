app.factory('universita', ['$http', function($http) {
  return $http.get('/universita')
    .then(function(response) {
      return response      
    }, function(response) {
      return response
    })
}])