app.controller('AssistenzaController', ['$scope', 'sessExists', function($scope, sessExists) {  
  $scope.logged = false
  sessExists.then(function(response){
    if (response.status === 200) {
      console.log('logged ' + response.status)
      $scope.logged = true
    }
  }, function(reason){
    if (reason) {
      console.log(reason)
    }
  })
}]);