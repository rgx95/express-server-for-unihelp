app.factory('loginService',['$http', function($http){
  return function(user, pass) {
    return $http.get(`/login?user=${user}&pass=${pass}`)
    .then(function(response){
      return response
    }, function(response){
      return response
    })
  } 
}])