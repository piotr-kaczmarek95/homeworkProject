'use strict';

//dopisanie LocalStorageModule - konieczne by działał angular-local-storage

// Declare app level module which depends on views, and core components
angular.module('homeworkProject', [
  'ngRoute',
  'homeworkProject.view1',
  'homeworkProject.view2',
  'homeworkProject.players',
  'homeworkProject.list',
  'LocalStorageModule',
  'ngMaterial',
  'ngMessages'

])
.config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function($locationProvider, $routeProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/players'});

  $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('pink');



}])

// jeśli url nie jest view1, view2 albo template to przekieruj do view 1

//trzeba dopisać konfigurację by działał angular-local-storage
.config(['localStorageServiceProvider', function(localStorageServiceProvider){

  localStorageServiceProvider.setPrefix('homework');

}]);