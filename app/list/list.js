angular.module('homeworkProject.list', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/list', {
                templateUrl: 'list/list.html',
                controller: 'playersController'
            });
    }])

    


