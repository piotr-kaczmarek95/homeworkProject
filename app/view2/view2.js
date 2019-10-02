'use strict';

angular.module('homeworkProject.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {

    $scope.text = "Losowy fakt:";
        
    //funkcje wykonywane w zależności od sukcesu pobrania danych

    const successCallback = function (response) {

      $scope.data = response.data;
      console.log(response.data);
    }

    const errorCallback = function () {

      console.log("Wystąpił błąd!");
    }

    $http({
      method: 'GET',
      url: 'http://numbersapi.com/random/trivia'
    }).then(successCallback, errorCallback); //nazwy funkcji - bez argumentow


  }])