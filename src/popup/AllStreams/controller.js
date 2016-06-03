"use strict";
angular.module('popup').
controller('AllStreamsCtrl',function($scope,HitboxSrvc){
	HitboxSrvc.getAllStreams().then((result)=>{
		$scope.streams = result ? result.livestream : null || null;
	})
});