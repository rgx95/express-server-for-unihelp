app.directive('login', ['loginService', 'sessExists', '$location', function(loginService, sessExists, $location){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/login.html',
    link: function(scope, element, attrs) {  
      scope.submit = () => { 

        loginService(scope.user, scope.pass).then(function(response) {
          if (response.data.code == 200) {
            console.log(response.data)            
            scope.logged = response.data.logged
            scope.loggedUser = response.data.user
            
            location.href = '#!/profilo'; location.reload()
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