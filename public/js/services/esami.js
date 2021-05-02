app.factory('esami', ['$http', function($http) {
  return $http.get('/esami')
    .then(function(response) {
      return response      
    }, function(response) {
      return response
    })
}])