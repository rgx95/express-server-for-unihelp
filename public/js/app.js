var app = angular.module('app', ["ui.router"])

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



/*
app.config(function ($routeProvider) {
  $routeProvider

  .when('/aggiungiEsame', {
    controller: 'voidController',
    templateUrl: '/views/aggiungiEsame.html'
  })
  
  .when('/cambioPassword', {
    controller: 'voidController',
    templateUrl: 'views/cambioPassword.html'
  })
  
  .when('/confermaCorso', {
    controller: 'voidController',
    templateUrl: 'views/confermaCorso.html'
  })
  .when('/confermaEsame', {
    controller: 'voidController',
    templateUrl: 'views/confermaEsame.html'
  })
  .when('/confermaLogin', {
    controller: 'voidController',
    templateUrl: 'views/confermaLogin.html'
  })
  .when('/confermaRegistra', {
    controller: 'voidController',
    templateUrl: 'views/confermaRegistra.html'
  })
  .when('/corso', {
    controller: 'voidController',
    templateUrl: 'views/corso.html'
  })
  
  
  
  
  .when('/recensione', {
    controller: 'RecensioneController',
    templateUrl: 'views/recensione.html'
  })
  .when('/registra', {
    controller: 'RegistraController',
    templateUrl: 'views/registra.html'
  })
  .when('/ricerca', {
    controller: 'RicercaController',
    templateUrl: 'views/ricerca.html'
  })
  
})*/