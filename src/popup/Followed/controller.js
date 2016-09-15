angular.module('popup').
controller('FollowedCtrl',function($scope,HitboxSrvc){
    HitboxSrvc.getLiveFollowed().then((result)=>{
        $scope.streams = result ? result.livestream : null || null;
    })

    chrome.storage.onChanged.addListener((changes,areaName)=>{
        console.log(changes);
        if(areaName == "local"){
            if(typeof changes.livestream !== 'undefined'){
                $scope.streams = changes.livestream.newValue || [];
                // console.log($scope.streams);
                $scope.$apply();
            }
        }
    })
    // HitboxSrvc.getAllFollowed().then(allfollowed=>{
    //     $scope.streams = Object.keys(allfollowed).map(key => allfollowed[key]) || null;
    //     console.log($scope.streams);
    // });
})