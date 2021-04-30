var app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  })  
  .when('/aggiungiEsame', {
    controller: 'voidController',
    templateUrl: 'views/aggiungiEsame.html'
  })
  .when('/assistenza', {
    controller: 'voidController',
    templateUrl: 'views/assistenza.html'
  })
  .when('/cambioPassword', {
    controller: 'voidController',
    templateUrl: 'views/cambioPassword.html'
  })
  .when('/chiSiamo', {
    controller: 'voidController',
    templateUrl: 'views/chiSiamo.html'
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
  .when('/esame', {
    controller: 'voidController',
    templateUrl: 'views/esame.html'
  })
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'views/login.html'
  })
  .when('/profilo', {
    controller: 'ProfiloController',
    templateUrl: 'views/profilo.html'
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
  .otherwise({
    redirectTo: '/'
  })
})