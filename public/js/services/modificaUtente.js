app.factory('modificaUtente', ['$http', function($http) {
  return function(field, value){
      $http.put(`/update?field=${field}&value=${value}`)
      .then(function(response){
        return response
      }, function(reason) {
        return reason
      })
  }
}])