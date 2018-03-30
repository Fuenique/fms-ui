angular.module("myApp")
.directive("nwCard", function(){
    return {
        restrict: "E",
        templateUrl: "sma/templates/directives/nw-card.html",
        controller: function($scope, Complaint){
            $scope.complaints = [];
            Complaint.all()
            .then(function(response){
                $scope.complaints = response.data;
            });
            
        }
    }
})