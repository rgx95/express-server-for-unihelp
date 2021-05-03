app.directive('searchInput', function(){
  return {
    restrict: 'E',
    scope: {
      data: '=', // array di dati
      placeholder: '=?',
      disabled: '=',
      next: '=',
      reset: '='
    },
    templateUrl: 'js/directives/searchInput.html',
    link: function(scope, element, attrs) {

      

      scope.focusSearch = () => { scope.showResults = true }
      scope.setAndBlur = (val) => {         
        scope.searchString = val
        scope.showResults = false

        scope.next = true
      }
      scope.cancelInput = () => {        
        scope.searchString = ""

        scope.next = false
      }
    }
  }
})