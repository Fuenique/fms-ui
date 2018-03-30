(function () {
    'use strict';

    angular.module("myApp")
        .controller("MapViewController", ['$scope', function ($scope, $parent) {
            $scope.zoom = 18;
            var mapOptions = {
                zoom: $scope.zoom,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            $scope.map = new google.maps.Map(
                document.getElementById('map-canvas'), mapOptions
            );

            $scope.initGeolocation = (function () {
                if (navigator && navigator.geolocation) {

                    var input = document.getElementById('pac-input');
                    var autocomplete = new google.maps.places.Autocomplete(input);

                    navigator.geolocation.getCurrentPosition(function (position) {
                        $scope.$parent.coordinates = [position.coords.latitude, position.coords.longitude];
                        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                        var place = autocomplete.getPlace();
                        if (place) {
                            pos = place.geometry.location;
                        }

                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: pos,
                            title: "Accessing location.",
                            draggable: true
                        });
                        google.maps.event.addListener(marker, "drag", function () {
                            $scope.$apply(function () {
                                $scope.zoom = $scope.map.getZoom();
                                $scope.$parent.coordinates = [marker.getPosition().lat(), marker.getPosition().lng()];
                            });
                        });
                        $scope.map.setCenter(pos);
                    }, errorCallback, { enableHighAccuracy: true, timeout: 60000, maximumAge: 600000 });
                } else {
                    alert("No Maps!");
                }
                var errorCallback = function () {
                    alert("Location is not supported!");
                }
            })();
        }]);
})();