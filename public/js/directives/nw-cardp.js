(function () {
    'use strict';

    angular.module("myApp")
        .directive("nwCardp", function () {
            return {
                restrict: "E",
                templateUrl: "public/templates/directives/nw-cardp.html",
                controller: ['$scope', 'Complaint', function ($scope, Complaint) {
                    $scope.complaints = [];
                    Complaint.all()
                        .then(function (response) {
                            console.log(response.data);
                            $scope.complaints = response.data;
                        });
                }]
            }
        })
})();