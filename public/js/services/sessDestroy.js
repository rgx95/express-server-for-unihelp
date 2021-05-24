app.factory('sessDestroy', ['$http', '$timeout', function($http, $timeout){
  return function() {
    return $http.get('/sessDestroy')
    .then(function(response) {
      console.log(response)
      if (response.status === 200) {         
          location.href = '/'; location.reload()    
      }
    }, function(reason) {
      console.log(reason)
    })
  }
}])