app.controller('HomeController', ['$scope', 'universita', 'corsi', 'esami', function($scope, universita, corsi, esami) {
   
  universita.then(function(response) {
    console.log(response.status)
    $scope.universita = response.data      
  }, function(response) {
    console.log(response.status)
  });

  corsi.then(function(response) {
    console.log(response.status)
    $scope.corsi = response.data      
  }, function(response) {
    console.log(response.status)
  });

  esami.then(function(response) {
    console.log(response.status)
    $scope.esami = response.data      
  }, function(response) {
    console.log(response.status)
  });


}])