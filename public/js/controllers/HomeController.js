app.controller('HomeController', ['$scope', 'getData', function($scope, getData) {

  $scope.next = [false, false, false]

  $scope.resetSearch = () => {
    $scope.next.fill(false);

    $scope.reset = true
  }
   
  getData('universita').then(function(response) {
    console.log(response.status)
    $scope.universita = response.data      
  }, function(response) {
    console.log(response.status)
  });

  getData('corsi').then(function(response) {
    console.log(response.status)
    $scope.corsi = response.data      
  }, function(response) {
    console.log(response.status)
  });

  getData('esami').then(function(response) {
    console.log(response.status)
    $scope.esami = response.data      
  }, function(response) {
    console.log(response.status)
  });


}])