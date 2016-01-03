var user_id = null;
var hitboxApp = angular.module("hitboxApp",['ngRoute']);
hitboxApp.service('thechrome',function($rootScope,$q){
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

hitboxApp.service('thehitbox',function($rootScope,$q){
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
			$http.get("http://api.hitbox.tv/media").success(function(response){
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

hitboxApp.controller('PopupCtrl',function($scope,thechrome,$location){
	$scope.isActive = function(dir){
		if(dir == $location.path()){
			return true;
		}
		return false;
	}
	$scope.logout = function(){
		chrome.storage.sync.clear(function(){
			document.location.href=""
		})
	}
	$scope.updateBtn = function(ev){
		//console.log(ev)
		chrome.runtime.sendMessage({query: "update"}, function(response) {console.log("DONE")});
		//console.log($("#updateBtn-img")[0])
		$("#updateBtn-img").stop()
		$({deg:0}).animate({deg:-360},{
			duration:1000,
			step:function(now){
				$("#updateBtn-img").css({
					transform:'rotate('+now+'deg)'
				})
			}
		});
		if($location.path()!="/following"){
			document.location.reload();
		}
	}
	
	thechrome.storageSyncGet({auth_token:null,user_id:null,login:null}).then(function(result){
		if(result.auth_token === null || result.user_id === null){
			document.location.href="#/login"
		}
		$scope.auth_token = result.auth_token;
		$scope.user_id = result.user_id;
		$scope.login = result.login;
		user_id = result.user_id;
	})
});