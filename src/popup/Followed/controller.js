angular.module('popup').
controller('FollowedCtrl',function($scope,HitboxSrvc){
    // HitboxSrvc.getLiveFollowed().then((result)=>{
    //     $scope.streams = result ? result.livestream : null || null;
    // })
    HitboxSrvc.getAllFollowed().then(allfollowed=>{
        $scope.streams = Object.keys(allfollowed).map(key => allfollowed[key]) || null;
        console.log($scope.streams);
    });
})