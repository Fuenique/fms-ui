(function () {
    'use strict';

    angular.module("myApp")
        .directive("nwCardo", function () {
            return {
                restrict: "E",
                templateUrl: "sra/templates/directives/nw-cardo.html",
                controller: ['$scope', 'Complaint', function ($scope, Complaint) {
                    $scope.complaintspublic = [];
                    Complaint.get()
                        .then(function (response) {
                            console.log(response.data);
                            $scope.complaintspublic = response.data;
                        });
                }]
            }
        })
})();