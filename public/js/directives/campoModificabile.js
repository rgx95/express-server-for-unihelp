app.directive('campoModificabile', ['modificaUtente', function(modificaUtente){
  return {
    restrict: 'E',
    scope: {
      fieldValue: '@',
      fieldName: '@',
      fieldType: '@?'
    },
    templateUrl: 'js/directives/campoModificabile.html',
    link: function(scope, element, attrs) {

      scope.editModeFlag = false

      scope.editMode = () => {
        scope.copyValue = scope.fieldValue
        if (scope.editModeFlag) {
          // conferma
          scope.editModeFlag = false
          if (scope.sendChanges(scope.fieldName, scope.fieldValue)) {
            scope.copyValue = scope.fieldValue
          } else {
            scope.fieldValue = scope.copyValue
          }
        } else {
          // apri edit mode
          scope.editModeFlag = true
        }
      }

      scope.annullaEditMode = () => {
        scope.fieldValue = scope.copyValue
        scope.editModeFlag = false
      }

      scope.sendChanges = (field, value) => {
        let returnValue = false
        let promessa = modificaUtente(field, value)

        if (!promessa) {
          return returnValue
        }

        promessa.then(function(response){
          returnValue = response.status == 200
        }, function(reason) {
          console.log(reason)
        })
        return returnValue
      }

    }
  }
}])