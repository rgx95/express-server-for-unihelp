app.controller('ProfiloController', ['$scope', 'sessExists', 'sessDestroy', 'modificaUtente', '$timeout', function($scope, sessExists, sessDestroy, modificaUtente, $timeout) {  
  
  /*$scope.modificaUniversita = (value) => {
    let returnValue = false
    let promessa = modificaUtente('universita', value)
    if (!promessa) {
      return returnValue
    }
    promessa.then(function(response){
      returnValue = response.status == 200
    }, function(reason) {
      console.log(reason)
    })
    return returnValue
  }*/

  $scope.clickHandler = function(field, value) {
    modificaUtente(field, value).then(function(response){
      console.log(response)
      if (response.status == 200) {        
        $scope.uni = value
        console.log($scope.uni) 
        $timeout(()=>{sessDestroy()}, 1000)
      }
    }, function(reason) {
      console.log(reason)
    })
  }

  

  sessExists.then(function(response){
    if (response.status === 200) {
      console.log(response.status)
      let userObject = new Object()
      Object.assign(userObject, response.data.user)

      $scope.userId = userObject.ID
      $scope.user = userObject.USERNAME
      $scope.pass = userObject.PASSWORD
      $scope.mail = userObject.MAIL
      
      $scope.uniId = userObject['UNIVERSITA.ID']      
      $scope.uni = userObject['UNIVERSITA.NOME']

      $scope.nome = userObject.NOME || 'xxxxx'
      $scope.cognome = userObject.COGNOME || 'xxxxx'    
      $scope.punti = userObject.PUNTI || 11    
      $scope.matricola = userObject.MATRICOLA || '000000'
    }

  }, function(reason){
    if (reason) {
      console.log(reason)
    }
  })

}])