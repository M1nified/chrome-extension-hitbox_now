"use strict";
angular.module('popup').
controller('LoginCtrl',function($scope,AuthSrvc){
    $scope.submit = AuthSrvc.login;
})