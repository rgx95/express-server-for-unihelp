app.directive('login', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: './js/directives/login.html',
    link: function(scope, element, attrs) {

      scope.inline = false
      
      if("inline" in attrs) {
        scope.inline = true
      }      
  
      scope.submit = () => {

        /*$http.get(`?user=${scope.user}&pass=${scope.pass}`) 
        .success(function(data) { 
          window.alert('successful login')
        }) 
        .error(function(err) { 
          scope.userError = true			
          scope.passError = true
          scope.pass = null
          scope.user = null
        }); */

        window.alert('successful login')

        login.reset()
      }
    }
  }
})