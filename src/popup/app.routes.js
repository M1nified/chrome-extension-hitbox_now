angular.module('popup').
config(['$routeProvider',
    function routeConfig($routeProvider){
        $routeProvider.
        when('/AllStreams',{
            templateUrl : 'AllStreams/main.html',
            controller: 'AllStreamsCtrl'
        }).
        when('/Followed',{
            templateUrl : 'Followed/main.html',
            controller: 'FollowedCtrl'
        }).
        when('/Login',{
            templateUrl : 'Login/main.html',
            controller: 'LoginCtrl'
        }).
        when('/Settings',{
            templateUrl : 'Settings/main.html',
            controller: 'SettingsCtrl'
        }).
        when('/Streams',{
            templateUrl : 'Streams/main.html',
            controller: 'StreamsCtrl'
        }).
        otherwise({
            redirectTo:'/Followed'
        })
    }
]);