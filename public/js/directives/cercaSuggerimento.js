app.directive('cercaSuggerimento', ['getData', '$timeout', function(getData, $timeout) {
  return {
    restrict: 'E',
    scope: {
      info: '@',
      value: '=?',
      selectedId: '=?',
      filled: '=?',
      placeholder: '@?',
      disabled: '=?',
      requestPath: '=?',
      symbol: '@' //acceptable values for symbol 'menu-right', 'trash'
    },
    templateUrl: 'js/directives/cercaSuggerimento.html',
    controller: ['$scope', function($scope) {

      $scope[$scope.info] = new Object()
      $scope.object = $scope[$scope.info]

      $scope.loadSuggestions = function() {
        console.log($scope.requestPath || $scope.info)
        $scope.attendiRisultati = true
        return getData($scope.requestPath || $scope.info).then(function(response) {
          //console.log(response.status)
          $scope.object.data = response.data              
          $scope.attendiRisultati = false    
          //console.log($scope.object.data)
        }, function(response) {
          console.log(response.status)          
          $scope.attendiRisultati = false
        });
      }            

      $scope.setAndBlur = (id, val) => {
        $scope.object.searchId = id
        $scope.object.searchString = val
        $scope.object.showResults = false
        $scope.filled = true
        $scope.value = val
        $scope.selectedId = id
        //caricaEsami(id)
      }

      $scope.resetSearch = () => {
        $scope.object.searchString = ""
        $scope.filled = false
        $scope.selectedId = null
        $scope.value = ""
      }

      $scope.blurSearch = () => {
        $timeout(()=>{$scope.object.showResults = false}, 300)        
      }

      $scope.focusSearch = () => {
        $scope.loadSuggestions()
        $scope.object.showResults = true
      }

      // test
      $scope.submitCerca = () => {
        let tmp = 'Ricerca:\n' + $scope.object.searchString
        window.alert(tmp)
      }


    }]
  }
}])