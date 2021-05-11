app.directive('cercaUniCorsoEsame', ['getData', '$timeout', function(getData, $timeout) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/cercaUniCorsoEsame.html',
    link: function(scope, element, attrs) {

      scope.universita = {placeholder: 'Cerca Università...', filled: false}
      scope.esami = {placeholder: 'Cerca Esame...', filled: false}

      scope.setAndBlurUniversita = (id, val) => {
        scope.universita.searchId = id
        scope.universita.searchString = val
        scope.universita.showResults = false
        scope.universita.filled = true
        caricaEsami(id)
      }

      scope.blurSearch = (x) => {
        $timeout(()=>{scope[x].showResults = false}, 300)        
      }

      scope.setAndBlurEsame = (id, val) => {
        scope.esami.searchId = id
        scope.esami.searchString = val
        scope.esami.showResults = false
        scope.esami.filled = true
      }

      scope.focusSearch = (x) => {
        scope[x].showResults = true
      }

      scope.resetSearch = () => {
        scope.universita.searchString = ""
        scope.esami.searchString = ""
        scope.universita.filled = false
        scope.esami.filled = false
      }

      getData('universita').then(function(response) {
        console.log(response.status)
        scope.universita.data = response.data        
        console.log(scope.universita.data)
      }, function(response) {
        console.log(response.status)
      });

      function caricaEsami(uniId) {    
        getData(`universita/${uniId}/esami`).then(function(response) {
          console.log(response.status)
          scope.esami.data = response.data      
        }, function(response) {
          console.log(response.status)
        });
      }

      // test
      scope.submitCerca = () => {
        let tmp = 'Ricerca:\n' + scope.universita.searchString
        tmp += '\n' + scope.esami.searchString
        window.alert(tmp)
      }


    }
  }
}])