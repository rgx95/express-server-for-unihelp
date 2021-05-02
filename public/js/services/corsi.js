app.factory('corsi', ['$http', function($http) {
  return $http.get('/corsi')
    .then(function(response) {
      return response      
    }, function(response) {
      return response
    })
}])