app.directive('login', ['loginService', 'sessExists', function(loginService, sessExists){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/directives/login.html',
    link: function(scope, element, attrs) {  
      scope.session = false

      sessExists.then(function(response){
        if (response.status === 200) {
          scope.session = response.data.user
        }    
      }, function(reason){
        if (reason) {
          console.log(reason)
        }
      })

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