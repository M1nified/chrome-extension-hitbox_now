"use strict";
angular.module('popup').
controller('LoginCtrl',function($scope,AuthSrvc){
    $scope.submit = (form) => {
        $scope.waiting = true;
        AuthSrvc.login(form).then(()=>{
            $scope.waiting = false;
            $scope.updateBtn();
        });
    }
})