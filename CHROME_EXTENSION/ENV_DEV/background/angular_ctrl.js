hitboxApp.controller('FollowingCtrl',function($scope,thehitbox){
	thehitbox.getLiveFollowed().then(function(result){
		if(result && result.livestream){
			$scope.streams = result.livestream;
		}else{
			$scope.streams = null;
		}
	})
	chrome.storage.onChanged.addListener(function(changes,areaName){
		//console.log("CHANGE")
		if(areaName === "local"){
			if(changes && changes.livestream){
				console.log(changes.livestream.newValue)
				$scope.streams = changes.livestream.newValue;
				$scope.$apply();
			}
		}
	})
});
hitboxApp.controller('LoginCtrl',function($scope){
	$scope.submit = function(form){
		console.log({login:form.login,pass:form.pass,app:"desktop"})
		$.post('http://api.hitbox.tv/auth/token',{login:form.login,pass:form.pass,app:"desktop"},function(response){
			if(response && response.authToken){
				$.getJSON("http://api.hitbox.tv/user/"+form.login,function(userdata){
					if(userdata && userdata.user_id){
						chrome.storage.sync.set({auth_token:response.authToken,login:form.login,user_id:userdata.user_id},function(){
							document.location.href="popup.html"
						})
					}
				})
				
			}
		},"json")
	}
});
hitboxApp.controller('SettingsCtrl',function($scope,$timeout,thechrome){
	$scope.submit = function(form){
		
	}
	$scope.settings={};
	thechrome.storageSyncGet({settings:null}).then(function(settings){
		$scope.settings = settings.settings;
	})
	var timeout = null;
	var saveSettings = function(){
		chrome.storage.sync.set({settings:$scope.settings});
	}
	var debounceSaveSettings = function(newVal,oldVal){
		if(timeout){
			$timeout.cancel(timeout);
		}
		timeout = $timeout(saveSettings,700);
	}
	$scope.$watch('settings.notifications',debounceSaveSettings)
	$scope.$watch('settings.interval',debounceSaveSettings)
});
hitboxApp.controller('AllstreamsCtrl',function($scope,thehitbox){
	thehitbox.getAllStreams().then(function(result){
		if(result && result.livestream){
			$scope.streams = result.livestream;
		}else{
			$scope.streams = null;
		}
	})
});