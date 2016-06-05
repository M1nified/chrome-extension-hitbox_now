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
angular.module('popup').
service('AuthSrvc',function($http,$location){
	return {
		login : function(form){
			return $http({
				method:'POST',
				url:'http://api.hitbox.tv/auth/token',
				data:{
					login:form.login,
					pass:form.pass,
					app:"desktop"
				},
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				responseType:"json"
			}).
			then((response)=>{
				let data = response ? response.data : response;
				if(data && data.authToken){
					return $http.get("http://api.hitbox.tv/user/"+form.login).
					then((userdata)=>{
						userdata = userdata ? userdata.data : null;
						if(userdata && userdata.user_id){
							chrome.storage.sync.set({
								auth_token:data.auth_token,
								login:form.login,
								user_id:userdata.user_id
							},()=>{
								$location.path('/Followed')
							})
						}
					})
				}
			})
		}
	}
})