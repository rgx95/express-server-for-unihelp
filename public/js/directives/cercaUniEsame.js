app.directive('cercaUniEsame', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/cercaUniEsame.html',
    controller: ['$scope', function($scope) {
      $scope.cerca = () => {
        window.alert('Ricerca Esame: \n\n"'+$scope.esame+'"')
      } 
    }]
  }
})