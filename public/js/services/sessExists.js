app.factory('sessExists',['$http', function($http){
  return $http.get(`/sessExists`)
  .then(function(response){
    return response
  }, function(response){
    return response
  })
}])