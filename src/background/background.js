var user_id = null;
var user_login = null;
var user_auth_token = null;
var notifications = true;
var livestreamOld = null;
var settings = {
	interval:300000,notifications:true
};
chrome.storage.onChanged.addListener(function(changes,areaName){
	if(areaName == "sync"){
		// console.log(changes);
		if(changes.auth_token){
			user_auth_token = changes.auth_token.newValue || null;
		}
		if(changes.login){
			user_login = changes.login.newValue || null;
		}
		if(changes.user_id){
			user_id = changes.user_id.newValue || null;
		}
		if(changes.settings){
			updateSettings(changes.settings.newValue);
		}else{
			updateSettings(null);
		}
		restartWatcher();
		alertAboutStreams(null,null)
	}
})
$(document).ready(function(){
	// console.log("READY")
	chrome.storage.sync.get({auth_token:null,login:null,user_id:null,settings:null},function(data){
		if(data){
			user_id = data.user_id;
			user_login = data.login;
			user_auth_token = data.auth_token;
		}
		updateSettings(data.settings);
		restartWatcher();
	})
})
var updateSettings = function(sett){
	var rewind = false;
	if(sett){
		settings = sett;
		if(!settings.hasOwnProperty('interval')){
			settings.interval=300000;
			rewind = true;
		}
		if(!settings.hasOwnProperty('notifications')){
			settings.notifications=true;
			rewind = true;
		}
	}else{
		settings = {interval:300000,notifications:true};
	}
	//console.log("SETTINGS UPDATED")
	if(!sett || rewind){
		chrome.storage.sync.set({settings:settings});
	}
}
var watcherInterval = null;
var restartWatcher = function(){
	console.log("RESTART WATCHER")
	clearTimeout(watcherInterval);
	// console.log(user_id)
	// console.log(user_login)
	// console.log(user_auth_token)
	if(user_id && user_login && user_auth_token){
		update();
		watcherInterval = setInterval(update,parseInt(settings.interval));
	}
}
var update = function(){
	HitBox.updateFollowedLives().then(response=>{
		console.log(response);
		alertAboutStreams(response.livestream,livestreamOld);
		livestreamOld = [];
		for(let ls of response.livestream){
			livestreamOld[ls.media_display_name] = ls;
		}
	}).catch(()=>{
		alertAboutStreams();
	});
}
var alertAboutStreams = function(livestream,lsold){
	if(livestream && livestream.length>0){
		chrome.browserAction.setBadgeText({text:livestream.length.toString()})
		if(settings.notifications){
			// console.log(livestream)
			if(lsold){
				for(var i in livestream){
					if(!lsold[livestream[i].media_display_name]){
						notify(livestream[i]);
					}
				}
			}else{
				//console.log("GO")
				for(var i in livestream){
					notify(livestream[i]);
				}
			}
		}
	}else{
		chrome.browserAction.setBadgeText({text:""})
	}
}
chrome.notifications.onClicked.addListener(function(notificationId){
	window.open(notificationId)
})
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		// console.log(request)
    if (request.query == "update"){
      restartWatcher();
      sendResponse(true)
  }
  });
