angular.module('popup').
service('ChromeSrvc',function($rootScope,$q){
	return{
		storageSyncGet:function(query){
			var deferred = $q.defer();
			chrome.storage.sync.get(query,function(data){
				if(data){
					deferred.resolve(data);
				}else{
					deferred.reject();
				}
			})
			return deferred.promise;
		},
		storageSyncSet:function(query){
			chrome.storage.sync.set(query,function(data){

			})
		}
	}
});

angular.module('popup').
service('HitboxSrvc',function($rootScope,$q,$http){
	return{
		getLiveFollowed:function(){
			var deferred = $q.defer();
			chrome.storage.local.get({livestream:null},function(response){
				console.log(response)
				if(response){
					deferred.resolve(response);
				}
				else{
					deferred.reject();
				}
			})
			return deferred.promise;
		},
		getAllStreams:function(){
			var deferred = $q.defer();
			$http.get("http://api.hitbox.tv/media/live/list").success(function(response){
				console.log(response)
				if(response){
					deferred.resolve(response);
				}
				else{
					deferred.reject();
				}
			}).error(function(){
				deferred.reject();
			})
			return deferred.promise;
		}
	}
});