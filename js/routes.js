angular.module('myApp')
    .config(['$routeProvider', function ($routeProvider) {

        // routes
        $routeProvider
            .when("/sma", {
                templateUrl: "sma/index.html",
            })
            .when("/sra", {
                templateUrl: "sra/index.html",
            })
            .when("/public", {
                templateUrl: "public/index.html",
            })
            // /complaints
            .when("/sma/complaints", {
                templateUrl: "sma/templates/public/complaint/index.html",
            })
            // /complaints
            .when("/sra/complaints", {
                templateUrl: "sra/templates/public/complaint/index.html",
            })
            // /history
            .when("/public/history",{
                templateUrl: "public/templates/public/complaint/index.html",
            })

            .when("/public/history/:complaintId",{
                templateUrl:"public/templates/public/complaint/show.html",
            })
            .when("/public/new-complaint",{
                templateUrl: "public/templates/public/complaint/new.html",
                controller:"ComplaintFormController"
            })
            .when("/sma/complaints/:complaintId", {
                templateUrl: "sma/templates/public/complaint/show.html",
                controller: showController,
            })
            .when("/sra/complaintspublic/:complaintId", {
                templateUrl: "sra/templates/public/complaint/show.html",
                controller: showControllerforsra,
            })
            // change home.html to global
            .when("/", {
                templateUrl: "sma/templates/public/home.html"
            })
            // sentToSra
            .when("/sma/allocations", {
                template: "Available Soon",
            });

        // controllers
        showController.$inject = ['$scope', 'Complaint', '$routeParams', '$http'];

        // retrieve complaints for sma from pucblic
        function showController($scope, Complaint, $routeParams, $http) {
            $scope.activeComplaint = {};
            $scope.isSubmitted = false;
            $scope.selection = false;
            Complaint.all().then(function (response) {
                for (index in response.data) {
                    if (response.data[index].complaintId == $routeParams.complaintId) {
                        $scope.activeComplaint = response.data[index];
                        (function () {
                            var uluru = { lat: $scope.activeComplaint.geometry.coordinates[0], lng: $scope.activeComplaint.geometry.coordinates[1] };
                            var map = new google.maps.Map(document.getElementById('map-canvas'), {
                                zoom: 14,
                                center: uluru,
                                mapTypeId: google.maps.MapTypeId.HYBRID
                            });
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: map
                            });

                            var infowindow = new google.maps.InfoWindow();
                            var service = new google.maps.places.PlacesService(map);
                            service.nearbySearch({
                                location: uluru,
                                radius: 2000,
                                type: ['school']
                            }, callback);

                            // circles
                            var cityCircle = new google.maps.Circle({
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.35,
                                map: map,
                                center: uluru,
                                radius: 400,
                            });

                            function callback(results, status) {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    for (var i = 0; i < results.length; i++) {
                                        var place = results[i];
                                        createMarker(place);
                                    }
                                    console.log(i + "nothing");
                                }
                            }

                            function createMarker(place) {
                                var marker = new google.maps.Marker({
                                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                                    map: map,
                                    position: place.geometry.location
                                });

                                google.maps.event.addListener(marker, 'click', function () {
                                    infowindow.setContent(place.name);
                                    infowindow.open(map, this);
                                });

                                var nearbyCircle = new google.maps.Circle({
                                    strokeColor: '#FFFF00',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                    fillColor: '#FFFF00',
                                    fillOpacity: 0.35,
                                    map: map,
                                    center: place.geometry.location,
                                    radius: 200
                                });
                                google.maps.event.addListener(marker, 'click', function () {
                                    infowindow.setContent(place.name);
                                    infowindow.open(map, this);
                                });
                            }
                        })();
                        break;
                    }
                }
            });

            $scope.selectsra = function () {
                console.log("clicked");
                $scope.selection = !($scope.selection);
            }

            $scope.sras = [];
            Complaint.alls()
                .then(function (response) {
                    $scope.sras = response.data;
                })
            $scope.send = function (x) {
                $scope.isSubmitted = !($scope.isSubmitted);
                console.log(x);
            }
        };

        // retrieve complaints for sra from sma with date
        showControllerforsra.$inject = ['$scope', 'Complaint', '$routeParams', '$http'];
        function showControllerforsra($scope, Complaint, $routeParams, $http) {
            $scope.activeComplaint = {};
            $scope.isSubmitted = false;
            $scope.selection = false;
            Complaint.get().then(function (response) {
                for (index in response.data) {
                    if (response.data[index].complaintId == $routeParams.complaintId) {
                        $scope.activeComplaint = response.data[index];
                        (function () {
                            var uluru = { lat: $scope.activeComplaint.geometry.coordinates[0], lng: $scope.activeComplaint.geometry.coordinates[1] };
                            var map = new google.maps.Map(document.getElementById('map-canvas'), {
                                zoom: 10,
                                center: uluru
                            });
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: map
                            });
                        }
                        )();
                        break;
                    }
                }
            });
        }
    }])
