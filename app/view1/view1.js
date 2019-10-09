'use strict';

angular.module('homeworkProject.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$mdBottomSheet', '$mdMenu', function ($scope, $mdBottomSheet, $mdMenu) {

    $scope.showText = function () {

      console.log($scope.myDate);
    }

    $scope.showListBottomSheet = function () {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'view1/bottom.html',
        controller: 'View1Ctrl'
      })
    }

    $scope.openMenu = function (menu) {
      
      menu.open();

    }



  }]);