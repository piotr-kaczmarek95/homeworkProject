'use strict';

angular.module('homeworkProject.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {

    $scope.text = "Losowy fakt";

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

    //do testowania elementu md-autocomplete

    // $scope.clubs = ['Wisla', 'Lech', 'Legia'];

    //tablica z pasującymi wpisami

    //text jest przezwiskiem kolejnego elementu tablicy, który jest sprawdzamy

    // $scope.matching = [];

    // $scope.showChosen = function () {

    //   $scope.matching = $scope.clubs.filter(function (clubName) {

    //     return clubName.toLowerCase().startsWith($scope.searchedClub.toLowerCase());

    //     //jesli prawda, to wrzucam do matching

    //   })

    //   console.log($scope.searchedClub);
    //   console.log($scope.matching);

    // }

    // function createFilterFor(query) {
    //   var lowercaseQuery = query.toLowerCase();

    //   return function filterFn(state) {
    //     return (state.value.indexOf(lowercaseQuery) === 0);
    //   };

  }])