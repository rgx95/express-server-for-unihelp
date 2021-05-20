var app = angular.module('app', ["ui.router"])

app.controller('main', ['$scope', 'sessExists', '$http', function($scope, sessExists, $http) {
  sessExists.then(function(response){
    if (response.status === 200) {
      console.log(response.status)
      $scope.user = response.data.user.USERNAME
    }
  }, function(reason){
    if (reason) {
      console.log(reason)
    }
  })

  $scope.sessDestroy = function() {
    $http.get('/sessDestroy')
    .then(function(response) {
      console.log(response)
      if (response.status === 200) {
        delete $scope.user
        location.href = '/'; location.reload()        
      }
    }, function(reason) {
      console.log(reason)
    })
  }
}])



app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      
  // For any unmatched url, send to /home
  $urlRouterProvider.otherwise("/home")
  
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "./views/home.html",
        controller: "HomeController"
    })
    .state('esame', {
        url: "/esame",
        templateUrl: "views/esame.html"
    })      
    .state('chiSiamo', {
        url: "/chiSiamo",
        templateUrl: "views/chiSiamo.html"
    })
    .state('assistenza', {
      url: "/assistenza",
      templateUrl: "views/assistenza.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginController"
    })
    .state('profilo', {
      url: "/profilo",
      templateUrl: "views/profilo.html",
      controller: "ProfiloController"
    })
}]);