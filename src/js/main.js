"use strict";

let app = angular.module('TorrentWebApplication', ['ngRoute'])

.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl : 'assets/torrent.html'
        })
        .when('/about-us', {
            templateUrl : 'assets/about-us.html'
        })
        .when('/donate', {
            templateUrl : 'assets/donate.html'
        })
})

.controller('MainPageController', ($scope) => {
    $scope.currentPage = '#!';

    $scope.goToPage = (link) => {
        window.location.href = link;
        $scope.currentPage = link;
        console.log($scope.currentPage);
    }
})

.controller('TorrentSearchController', ($scope) => {
    let torrentLink = $scope.url;

    $scope.sendLink = () => {
        let torrentLink = $scope.url.value;
        console.log(torrentLink);
    }
});

