"use strict";

let app = angular.module('TorrentWebApplication', [])

.directive('torrent', () => {
    return {
        scope : {
        },
        restrict : 'AEC',
        replace : true,
        controller : 'TorrentSearchController',
        templateUrl : 'assets/torrent.html'
    }
})

.directive('about-us', () => {
    return {
        scope : {
        },
        restrict : 'AE',
        replace : true,
        controller : 'TorrentSearchController',
        templateUrl : 'assets/about-us.html'
    }
})

.directive('donate', () => {
    return {
        scope : {
        },
        restrict : 'AE',
        replace : true,
        controller : 'TorrentSearchController',
        templateUrl : 'assets/donate.html'
    }
})

.config(["$locationProvider", ($locationProvider) => {
    $locationProvider.html5Mode(true)
}])

.controller('MainPageController', ($scope) => {
    $scope.currentPage = "";

    let curPage = $scope.currentPage;

    $scope.onFirstLoad = () => {
        curPage = "torrent";
    };

    $scope.setPage = (nextPage) => {
        curPage = nextPage;
        console.log(curPage);
    };
})

.controller('TorrentSearchController', ($scope) => {
    let torrentLink = $scope.url;

    $scope.sendLink = () => {
        let torrentLink = $scope.url.value;
        console.log(torrentLink);
    }
});

//http://localhost:8811/rnd2/magnet:?xt=urn:btih:36e7b4f8352da088bca8a6716ce19c531883a045&dn=rutor.info_Savoy+Brown+-+Witchy+Feelin'+(2017)+MP3+от+Vanila&tr=udp://opentor.org:2710&tr=udp://opentor.org:2710&tr=http://retracker.local/announce