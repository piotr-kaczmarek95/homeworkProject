angular.module('homeworkProject.players', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
        when('/players', {
            templateUrl: 'players/players.html',
            controller: 'playersController'
        });
    }])

    .factory('checkAgeService', function () {

        return {

            checkAge: function (age) {

                if (age < 15) {

                    console.log("Zbyt mała wartość");
                    tooYoung = true;
                } else {

                    console.log("Wiek ok!");
                    tooYoung = false;
                }

                console.log(age);

                return tooYoung;
            }
        }

    })

    .factory('showAllEntriesService', ['localStorageService', function (localStorageService) {

        return {

            showAllEntries: function () {

                console.log(localStorageService.keys());

                let keys = localStorageService.keys();
                keys.forEach(item => {

                    console.log("Klucz: " + item + ", wartość: imię " + localStorageService.get(item).name + ", wiek " + localStorageService.get(item).age + ", wartość " + localStorageService.get(item).value);

                })
            }
        }
    }])

    .factory('importDataFromStorageService', ['localStorageService', function (localStorageService) {

        return {
    
            importDataFromStorage: function (playerData) {
    
                //kasowanie wpisów przekazanej tablicy
                playerData.length = 0;
    
                //aktualizacja danych na podstawie wpisów w localStorage
    
                let keys = localStorageService.keys();
    
                keys.forEach(item => {
    
                    playerData.push({
    
                        name: localStorageService.get(item).name,
                        surname: item,
                        age: localStorageService.get(item).age,
                        value: localStorageService.get(item).value
                    })
                })
            }
        }
    }])

    .factory('clearAllService', ['localStorageService', function (localStorageService){

        return {
    
            clearAll: function(playerData) {
    
                localStorageService.clearAll();
                playerData.length = 0;
                console.log("Wyczyszczono local storage");
            }
        }
    }])

    //tu trzeba też wrzucić localStorageService

    .controller('playersController', ['$scope', 'localStorageService', 'checkAgeService', 'showAllEntriesService', 'importDataFromStorageService', 'clearAllService', function ($scope, localStorageService, checkAgeService, showAllEntriesService, importDataFromStorageService, clearAllService) {

        $scope.showPicture = false;

        $scope.checkAge = function (age) {

            $scope.showAgeWarning = checkAgeService.checkAge(age);
        }

        $scope.text = "Dodaj lub edytuj zawodnika. Wielkość liter w wyszukiwarce nie ma znaczenia.";
        $scope.playerData = [];

        $scope.itemToStorage = function (name, surname, age, value) {

            localStorageService.set(surname, {
                name: name,
                age: age,
                value: value
            });

            $scope.importFromStorage(); //aktualizacja wyswietlenia 

            //wyczyszczenie pól input po dodaniu wpisu

            $scope.name = "";
            $scope.surname = "";
            $scope.value = "";
            $scope.age = "";

            $scope.playerForm.playerSurname.$dirty = false;
            $scope.playerForm.playerName.$dirty = false;
        }

        $scope.removeFromStorage = function (surname) {

            //usuwam wpis z local storage

            localStorageService.remove(surname);
            console.log("Usunięto: " + surname);

            //usuwam z wyswietlanej tablicy

            for (let i = 0; i < $scope.playerData.length; i++) {

                if ($scope.playerData[i].surname == surname) {

                    $scope.playerData.splice(i, 1);
                }
            }
        }

        $scope.showAllEntries = function () {

            showAllEntriesService.showAllEntries();
        }       

        $scope.importFromStorage = function () {          

            importDataFromStorageService.importDataFromStorage($scope.playerData);
        }

        $scope.clearAll = function () {

            clearAllService.clearAll($scope.playerData);

        }

        $scope.arrToDataset = function (arr) {

            let str = "";

            for (i = 0; i < arr.length; i++) {

                if (i == (arr.length - 1)) {

                    str = str + "'" + arr[i] + "'";
                    break;
                }

                str = str + "'" + arr[i] + "', ";
            }

            return "[" + str + "]";
        }

        $scope.printChart = function () {

            let keys = localStorageService.keys();
            let items = [];
            let values = [];

            $scope.showPicture = true;

            keys.forEach(item => {

                items.push(item);
                values.push(localStorageService.get(item).value);

            })

            // console.log(items);
            // console.log(values);

            let itemsDataset = $scope.arrToDataset(items);
            let valuesDataset = $scope.arrToDataset(values);

            let uri = "{type: 'bar', data: { labels:" + itemsDataset + ", datasets: [{ label: 'Values', data:" + valuesDataset + "}]}} ";
            let res = encodeURI(uri);
            document.getElementById("demo").src = "https://quickchart.io/chart?c=" + res;

        }

        $scope.searchPlayer = function (name) {

            if (name != undefined) {

                $scope.found = false;

                console.log("Jestem w funckji");

                for (let i = 0; i < $scope.playerData.length; i++) {


                    if (($scope.playerData[i].surname.toLowerCase()) == (name.toLowerCase())) {

                        console.log("Znalezione!");

                        $scope.found = true;
                        $scope.name = $scope.playerData[i].name;
                        $scope.surname = $scope.playerData[i].surname;
                        $scope.age = $scope.playerData[i].age;
                        $scope.value = $scope.playerData[i].value;
                        // $scope.foundPlayer = $scope.playerData[i];
                        break;
                    }
                }

                if (!($scope.found)) {
                    console.log("Nie znalazłem");
                    $scope.found = false;

                    $scope.notFoundMessage = "Nie znalazłem!";
                }
            }
        }

        $scope.importFromStorage(); //wywołanie, by zawartość wyświetliła się przy przeładowaniu widoku
        
    }]);