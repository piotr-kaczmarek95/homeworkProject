angular.module('homeworkProject.players', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
        when('/players', {
            templateUrl: 'players/players.html',
            controller: 'playersController',
            reloadOnSearch: false
        });
    }])

    .factory('playerDataServices', ['localStorageService', function (localStorageService) {

        return {

            showAllEntries: function () {

                console.log(localStorageService.keys());

                let keys = localStorageService.keys();
                keys.forEach(item => {

                    console.log("Klucz: " + item + ", wartość: imię " + localStorageService.get(item).name + ", wiek " + localStorageService.get(item).age + ", wartość " + localStorageService.get(item).value);

                })
            },

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
            },

            clearAll: function (playerData) {

                localStorageService.clearAll();
                playerData.length = 0;
                console.log("Wyczyszczono local storage");
            },

            removeFromStorage: function (surname, playerData) {

                localStorageService.remove(surname);
                console.log("Usunięto: " + surname);

                for (let i = 0; i < playerData.length; i++) {

                    if (playerData[i].surname == surname) {

                        playerData.splice(i, 1);
                    }
                }
            }
        }
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

    //tu trzeba też wrzucić localStorageService

    .controller('playersController', ['$scope', '$location', 'localStorageService', 'checkAgeService', 'playerDataServices', function ($scope, $location, localStorageService, checkAgeService, playerDataServices) {

        //pamiętaj, że view1 i view2 maja inny kontroler, dlatego nic sie nie pojawia

        $scope.location = $location;
        
        // console.log($scope.location);
        // console.log($scope.location.search());

        $scope.showPicture = false;

        if ($scope.location.search() != ""){

            $scope.searchedPlayer = $scope.location.search().searched;
        }

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

            playerDataServices.removeFromStorage(surname, $scope.playerData);
        }

        $scope.showAllEntries = function () {

            playerDataServices.showAllEntries();
        }

        $scope.importFromStorage = function () {

            playerDataServices.importDataFromStorage($scope.playerData);
        }

        $scope.clearAll = function () {

            playerDataServices.clearAll($scope.playerData);

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

            if (name != undefined && name!="") {     
                
                console.log(name)
               
                $location.search('searched', name);

                $scope.found = false;

                console.log("Jestem w funkcji szukającej");

                for (let i = 0; i < $scope.playerData.length; i++) {


                    if (($scope.playerData[i].surname.toLowerCase()) == (name.toLowerCase())) {

                        console.log("Znalezione!");

                        $scope.found = true;
                        $scope.name = $scope.playerData[i].name;
                        $scope.surname = $scope.playerData[i].surname;
                        $scope.age = $scope.playerData[i].age;
                        $scope.value = $scope.playerData[i].value;
                        break;
                    }
                }

                if (!($scope.found)) {
                    console.log("Nie znalazłem");
                    $scope.found = false;

                    $scope.notFoundMessage = "Nie znalazłem!";
                }

                // $location.search('searched', name);
                console.log("Po search");
                console.log($scope.found);
                // console.log($location.search()); //teraz jest getterem 
            }
        }

        $scope.removeHint = function () {

            $location.search('searched', null); //kasowanie podaniem nulla
            $scope.searchedPlayer = "";
        }

        $scope.importFromStorage(); //wywołanie, by zawartość wyświetliła się przy przeładowaniu widoku

    }]);