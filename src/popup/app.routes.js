'use strict';
angular.module('popup').
config(['$routeProvider',
function routeConfig($routeProvider){
    $routeProvider.
    when('/AllStreams',{
        template : 'AllStreams/main.html',
        controller: 'AllStreamsCtrl'
    }).
    when('/Following',{
        template : 'Following/main.html',
        controller: 'FollowingCtrl'
    }).
    when('/Login',{
        template : 'Login/main.html',
        controller: 'LoginCtrl'
    }).
    when('/Settings',{
        template : 'Settings/main.html',
        controller: 'SettingsCtrl'
    }).
    when('/Streams',{
        template : 'Streams/main.html',
        controller: 'StreamsCtrl'
    }).
    otherwise({
        redirectTo:'/Following'
    })
}])