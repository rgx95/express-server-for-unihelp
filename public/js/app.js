var app = angular.module('app', ["ui.router"])

app.controller('main', ['$scope', 'sessExists', function($scope, sessExists) {
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