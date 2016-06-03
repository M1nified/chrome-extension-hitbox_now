"use strict";
angular.module('popup').
controller('SettingsCtrl',function($scope,$timeout,ChromeSrvc){
  $scope.settings = {
    notification : null,
    interval : null
  };
  ChromeSrvc.storageSyncGet('settings').
  then((settings)=>{
    $scope.settings = settings && Object.keys(settings).length > 0 ? settings.settings : $scope.settings;
  })
  let timeout = null;
  let saveSettings = function(){
    ChromeSrvc.storageSyncSet({settings:$scope.settings});
  }
  let debounceSaveSettings = function(newVal,oldVal){
    console.log(oldVal,newVal)
    timeout && $timeout.cancel(timeout);
    timeout = $timeout(saveSettings,700);
  }
  $scope.$watch('settings.notifications',debounceSaveSettings);
  $scope.$watch('settings.interval',debounceSaveSettings);
})