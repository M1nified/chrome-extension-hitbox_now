angular.module('popup').
controller('FollowedCtrl',function($scope,HitboxSrvc){
    HitboxSrvc.getLiveFollowed().then((result)=>{
        $scope.streams = result ? result.livestream : null || null;
    })
})