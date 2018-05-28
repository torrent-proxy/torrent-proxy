"use strict";

let app = angular.module('TorrentWebApplication', ['ngRoute'])

.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl : 'assets/torrent.html',
            controller : 'TorrentSearchController',
            title : 'Torrent-proxy: Download'
        })
        .when('/about-us', {
            templateUrl : 'assets/about-us.html',
            title : 'Torrent-proxy: About Us'
        })
        .when('/donate', {
            templateUrl : 'assets/donate.html',
            title : 'Torrent-proxy: Donate'
        })
})

.controller('MainPageController', ($scope) => {
    $scope.currentPage = '#!';

    $scope.goToPage = (link) => {
        window.location.href = link;
        $scope.currentPage = link;
    }
})

.controller('TorrentSearchController', ($scope) => {
    let torrentLink = $scope.url;

    $scope.sendLink = () => {
        let torrentLink = $scope.url.value;
        console.log(torrentLink);
    }
})

.run(['$rootScope', '$route', ($rootScope, $route) => {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
}])
