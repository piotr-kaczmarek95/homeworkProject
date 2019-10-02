angular.module('homeworkProject.players', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/players', {
                templateUrl: 'players/players.html',
                controller: 'playersController'
            });
    }])

    //tu trzeba też wrzucić localStorageService

    .controller('playersController', ['$scope', 'localStorageService', function ($scope, localStorageService) {

        // $scope.isEdited = false;
        $scope.showPicture = false;

        $scope.showEdit = function (player) {

            console.log(player);
            player.isEdited = !player.isEdited;

        }

        $scope.checkAge = function () {

            if ($scope.age < 15) {

                console.log("Zbyt mała wartość");
                $scope.showAgeWarning = true;
            } else {

                $scope.showAgeWarning = false;
            }

            console.log($scope.age);

        }


        $scope.text = "Add player to database";
        $scope.playerData = [];

        $scope.itemToStorage = function (name, surname, age, value) {

            localStorageService.set(surname, { name: name, age: age, value: value });

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

            //wyswietlenie zawartosci local storage w konsoli

            console.log(localStorageService.keys());

            let keys = localStorageService.keys();
            keys.forEach(item => {

                console.log("Klucz: " + item + ", wartość: imię " + localStorageService.get(item).name + " wiek " + localStorageService.get(item).age + " wartość " + localStorageService.get(item).value);

            })
        }

        $scope.importFromStorage = function () {

            //czyszczenie tymczasowego obiektu
            $scope.playerData.length = 0;

            //import kluczy

            let keys = localStorageService.keys();
            keys.forEach(item => {

                // console.log(item, typeof item);

                $scope.playerData.push({
                    name: localStorageService.get(item).name,
                    surname: item,
                    age: localStorageService.get(item).age,
                    value: localStorageService.get(item).value,
                    isEdited: false,
                    wrongEdit: false

                });

            })
        }

        $scope.clearAll = function () {

            localStorageService.clearAll();
            $scope.playerData.length = 0;
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

        $scope.updateValue = function (surname, newValue, newName, newAge) {

            // if ( (newName != undefined && newName.length <2) || ( newAge != undefined && newAge < 15) ||(newValue != undefined && newValue < 0) || (newName == undefined && newValue == undefined && newAge == undefined)){

            //     console.log("Błędne dane!");

            // }      

            for (let i = 0; i < $scope.playerData.length; i++) {

                if ($scope.playerData[i].surname == surname) {

                    if (newValue == undefined && newName == undefined && newAge == undefined) {

                        $scope.playerData[i].wrongEdit = true;
                        break;
                    }

                    // przepisz starą wartość, gdy nie podano żadnej nowej
                    if (newValue == undefined) newValue = $scope.playerData[i].value;
                    if (newName == undefined) newName = $scope.playerData[i].name;
                    if (newAge == undefined) newAge = $scope.playerData[i].age;

                    //  zabezpieczenia analogiczne jak przy dodawaniu zawodnika                    

                    if ((newName != undefined && newName.length < 2) || (newAge < 15) || (newValue < 0)) {

                        $scope.playerData[i].wrongEdit = true;
                        break;
                    }

                    $scope.playerData[i].isEdited = false;
                    $scope.playerData[i].wrongEdit = false;
                    localStorageService.set(surname, { name: newName, age: newAge, value: newValue });

                    $scope.importFromStorage(); //aktualizacja widoku

                    console.log("Po zmianie:" + localStorageService.get(surname).value);

                    break;
                }
            }
        }        

        $scope.searchPlayer = function (name) {

            if (name != undefined) {

                $scope.found = false;

                console.log("Jestem w funckji");

                for (let i = 0; i < $scope.playerData.length; i++) {


                    if (($scope.playerData[i].surname.toLowerCase()) == (name.toLowerCase())) {

                        console.log("Znalezione!");

                        $scope.found = true;
                        $scope.foundPlayer = $scope.playerData[i];
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

        // $scope.test = function () {

        //     localStorageService.set('property', {

        //         value: "oldVal",
        //         text: "dd"
        //     });
        //     localStorageService.bind($scope, 'property');
        //     console.log($scope);
        // }
    }]);
