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
                controller:showController,
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
