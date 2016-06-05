angular.module('popup').
controller('PopupCtrl',function($scope,$location,ChromeSrvc){
  $scope.isActive = function(dir){
    return dir === $location.path();
  };
  $scope.logout = function(){
    chrome.storage.sync.clear(()=>{
      document.location.href = "";
    })
  };
  $scope.updateBtn = function(evt){
    chrome.runtime.sendMessage({
      query:"update"
    },(response)=>{
      
    });
    $("#updateBtn-img").stop();
    $({deg:0}).animate({deg:-360},{
      duration:1000,
      step:function(now){
        $("#updateBtn-img").css({
          transform:'rotate('+now+'deg)'
        })
      }
    });
    $location.path()!=='/followed' && document.location.reload();
    
    ChromeSrvc.storageSyncGet({
      auth_token:null,user_id:null,login:null
    }).then((result)=>{
      result.auth_token === null || result.user_id === null && (document.location.herf = '#/Login');
      $scope.auth_token = result.auth_token;
      $scope.user_id = result.user_id;
      $scope.login = result.login;
      user_id = result.user_id;
    })
  };
})