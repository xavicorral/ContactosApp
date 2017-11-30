// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'contactos.services'])

.run(function($ionicPlatform, ContactosService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if ( typeof window.localStorage['indexContactos'] == 'undefined') {
        window.localStorage['indexContactos'] = 1;
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.contactos', {
    url: '/contactos',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactos.html',
        controller: 'ContactosCtrl',
          controllerAs: 'vm'
      }
    }
  })

  .state('app.contacto', {
    url: '/contactoFicha/:contactoId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/contacto.html',
        controller: 'ContactoFichaCtrl'

      }
    }
  })

  .state('app.nuevoContacto', {
      url: '/nuevoContacto',
      views: {
          'menuContent': {
              templateUrl: 'templates/nuevoContacto.html',
              controller: 'NuevoContactoCtrl',
              controllerAs: 'vm'
          }
      }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/contactos');
});
