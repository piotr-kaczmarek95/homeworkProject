'use strict';

angular.module('homeworkProject.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {

  $scope.text="Losowy fakt:";

//   var onRequestCompleted = function(response) {
//     $scope.quote = response.data;
//     console.log(response.data);

// }
// $http.get("https://api.github.com/users/piotr-kaczmarek95").
// $http.get("https://api.kanye.rest").
// $http.get('https://api.fungenerators.com').
//     then(onRequestCompleted);

// $http({
//   method: 'GET',
//   url: 'https://api.fungenerators.com'
// }).then(function successCallback(response) {
//   $scope.quote = response.data;
//   console.log(response.data);
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });

  $http({
    method: 'GET',
    url: 'http://numbersapi.com/random/trivia'
  }).then(function successCallback(response) {
    $scope.data = response.data;
    console.log(response.data);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });



}])


