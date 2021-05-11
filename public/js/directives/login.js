app.directive('login', ['loginService', '$location', function(loginService, $location){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/login.html',
    link: function(scope, element, attrs) {

      scope.inline = false
      
      if("inline" in attrs) {
        scope.inline = true
      }      
  
      scope.submit = () => { 

        loginService(scope.user, scope.pass).then(function(response) {
          if (response.data.code == 200) {
            console.log(response.data)
            $location.url('profilo')
          } else {
            scope.errorMessage = response.data.message
          }
        }, function(response) { 
          console.log(response)
        });
        
        scope.user = ""
        scope.pass = ""
      }
    }
  }
}])