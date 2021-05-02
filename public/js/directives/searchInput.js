app.directive('searchInput', ['$http', function($http){
  return {
    restrict: 'E',
    scope: {
      data: '=', // array di dati
      placeholder: '='
    },
    templateUrl: './js/directives/searchInput.html',
    link: function(scope, element, attrs) {
      console.log(scope.placeholder)
      scope.focusSearch = () => { scope.showResults = true }
      scope.blurSearch = () => { scope.showResults = false }
    }
  }
}])