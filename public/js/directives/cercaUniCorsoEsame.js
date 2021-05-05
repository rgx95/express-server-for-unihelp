app.directive('cercaUniCorsoEsame', ['getData', function(getData) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/cercaUniCorsoEsame.html',
    link: function(scope, element, attrs) {

      scope.universita = {placeholder: 'Cerca Università...', filled: false}
      scope.corsi = {placeholder: 'Cerca Corso di Laurea...', filled: false}
      scope.esami = {placeholder: 'Cerca Esame di...', filled: false}

      scope.setAndBlur = (x, val) => {
        scope[x].searchString = val
        scope[x].showResults = false
        scope[x].filled = true
      }

      scope.focusSearch = (x) => {
        scope[x].showResults = true
      }

      scope.resetSearch = () => {
        scope.universita.searchString = ""
        scope.corsi.searchString = ""
        scope.esami.searchString = ""
        scope.universita.filled = false
        scope.corsi.filled = false
        scope.esami.filled = false
      }

      getData('universita').then(function(response) {
        console.log(response.status)
        scope.universita.data = response.data        
        console.log(scope.universita.data)
      }, function(response) {
        console.log(response.status)
      });
    
      getData('corsi').then(function(response) {
        console.log(response.status)
        scope.corsi.data = response.data       
      }, function(response) {
        console.log(response.status)
      });
    
      getData('esami').then(function(response) {
        console.log(response.status)
        scope.esami.data = response.data      
      }, function(response) {
        console.log(response.status)
      });

      scope.submitCerca = () => {
        let tmp = 'Ricerca:\n' + scope.universita.searchString
        tmp += '\n' + scope.corsi.searchString
        tmp += '\n' + scope.esami.searchString
        window.alert(tmp)
      }


    }
  }
}])