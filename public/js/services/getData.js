app.factory('getData', ['$http', function($http) {
  return function(path) {
    return $http.get(path)
    .then(function(response) {
      return response      
    }, function(response) {
      return response
    })
  }
    
}])