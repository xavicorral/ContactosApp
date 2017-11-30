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

.controller('ContactosCtrl', function($scope, $ionicPopup, ContactosService) {

  var vm = this;
  var contactos;


    $scope.$on('$ionicView.beforeEnter',function () {
        vm.contactos = ContactosService.all();
        console.log('indx: ' + ContactosService.getIndexContactos());
    });


    vm.borrarContacto = function (contactoId) {
        console.log('borrando contacto ID: ' + contactoId);

        var confirmPopup = $ionicPopup.confirm({
            title: 'Borrar Contacto',
            template: 'Seguro que deseas borrar el contacto?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                ContactosService.delete(contactoId);
                vm.contactos =  ContactosService.all();
            } else {
                console.log('You are not sure');
            }
        });
    }

})

.controller('ContactoFichaCtrl', function($scope, $stateParams, ContactosService) {

  var contactoId = $stateParams.contactoId;
  $scope.contacto = ContactosService.get(contactoId);

})

.controller('NuevoContactoCtrl', function($scope, $state, ContactosService, CameraService, $ionicLoading, $ionicHistory) {

    var vm = this;

    var nuevoContacto = {};

    $scope.$on('$ionicView.enter',function () {
        vm.nombre = '';
        vm.apellido = '';
        vm.comentarios = '';
        vm.imagen = '';
        vm.photoTaken = false;
    });

    vm.altaContacto = function () {

        nuevoContacto.nombre = vm.nombre;
        nuevoContacto.apellido = vm.apellido;
        nuevoContacto.comentarios = vm.comentarios;
        nuevoContacto.photoTaken = vm.photoTaken;
        nuevoContacto.imagen = vm.imagen;

        console.log('dando de alta contacto..');
        console.log(nuevoContacto);

        ContactosService.add(nuevoContacto);

        $ionicLoading.show({
            template: 'Guardando contacto...',
            duration: 3000
        }).then(function(){
            console.log("The loading indicator is now displayed");
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.contactos');
        });

    }


    vm.takePhoto = function () {
        var photoPromise = CameraService.getPicture();

        photoPromise.then(
            function (data) {
                console.log('Photo taken!');
                vm.photoTaken = true;
                vm.imagen = data;
            },
            function (error) {
                console.log('algo ha ido mal');
                console.log(error);
            }

        );
    }

})
;
