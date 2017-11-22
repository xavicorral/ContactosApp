angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContactosCtrl', function($scope, ContactosService) {

  $scope.contactos = ContactosService.all();

})

.controller('ContactoFichaCtrl', function($scope, $stateParams, ContactosService) {

  var contactoId = $stateParams.contactoId;
  $scope.contacto = ContactosService.get(contactoId);

})

.controller('NuevoContactoCtrl', function($scope, ContactosService, $ionicLoading, $state) {

    var vm = this;

    var nuevoContacto = {};

    $scope.altaContacto = function () {
        nuevoContacto.nombre = vm.nombre;
        nuevoContacto.apellidos = vm.apellidos;
        nuevoContacto.comentarios = vm.comentarios;

        console.log('dando de alta contacto..');
        console.log(nuevoContacto);

        ContactosService.add(nuevoContacto);

        $ionicLoading.show({
            template: 'Guardando contacto...',
            duration: 3000
        }).then(function(){
            console.log("The loading indicator is now displayed");
            $state.go('app.contactos');

        });

    }

})
;
