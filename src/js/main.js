"use strict";

var app = angular.module('TorrentWebApplication', [])

.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true)
}])

.controller('MainPageController', function ($scope) {
    
})