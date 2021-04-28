var app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  })  
  .when('/aggiungiEsame', {
    controller: 'aggiungiEsameController',
    templateUrl: 'views/aggiungiEsame.html'
  })
  .when('/assistenza', {
    controller: 'assistenzaController',
    templateUrl: 'views/assistenza.html'
  })
  .when('/cambioPassword', {
    controller: 'cambioPasswordController',
    templateUrl: 'views/cambioPassword.html'
  })
  .when('/chiSiamo', {
    controller: 'chiSiamoController',
    templateUrl: 'views/chiSiamo.html'
  })
  .when('/confermaCorso', {
    controller: 'confermaCorsoController',
    templateUrl: 'views/confermaCorso.html'
  })
  .when('/confermaEsame', {
    controller: 'confermaEsameController',
    templateUrl: 'views/confermaEsame.html'
  })
  .when('/confermaLogin', {
    controller: 'confermaLoginController',
    templateUrl: 'views/confermaLogin.html'
  })
  .when('/confermaRegistra', {
    controller: 'confermaRegistraController',
    templateUrl: 'views/confermaRegistra.html'
  })
  .when('/corso', {
    controller: 'corsoController',
    templateUrl: 'views/corso.html'
  })
  .when('/esame', {
    controller: 'esameController',
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