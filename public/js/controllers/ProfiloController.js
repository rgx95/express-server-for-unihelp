app.controller('ProfiloController', ['$scope', 'sessExists', function($scope, sessExists) {
  
  sessExists.then(function(response){
    if (response.status === 200) {
      console.log(response.status)
      let userObject = new Object()
      Object.assign(userObject, response.data.user)

      $scope.userId = userObject.ID
      $scope.user = userObject.USERNAME
      $scope.pass = userObject.PASSWORD
      $scope.mail = userObject.MAIL

      $scope.corsoId = userObject['CORSO.ID']
      $scope.facId = userObject['FACOLTA.ID']
      $scope.uniId = userObject['UNIVERSITA.ID']
      $scope.corso = userObject['CORSO.NOME']
      $scope.fac = userObject['FACOLTA.NOME']
      $scope.uni = userObject['UNIVERSITA.NOME']

      $scope.nome = userObject.NOME || 'xxxxx'
      $scope.cognome = userObject.COGNOME || 'xxxxx'    
      $scope.punti = userObject.PUNTI || 11    
      $scope.matricola = userObject.MATRICOLA || '000000'

      console.log($scope)
    }

  }, function(reason){
    if (reason) {
      console.log(reason)
    }
  })

}])