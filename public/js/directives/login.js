app.directive('login', ['loginService', function(loginService){
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
          console.log('logged in')
          window.alert('successful login')  
        }, function(response) {
          console.log('something went wrong')
        });

        login.reset()
      }
    }
  }
}])