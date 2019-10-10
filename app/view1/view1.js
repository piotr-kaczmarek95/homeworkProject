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

      let todayDate= new Date();
      console.log(todayDate);


      let birthDate = $scope.myDate;

      let diff = todayDate.getTime() - birthDate.getTime();

      let diffYears = Math.floor((diff / (365*1000*3600*24)));
      

      console.log(diffYears);


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