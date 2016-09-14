"use strict";
var Storage = {
  get_login : function(){
    return new Promise(function(resolve,reject){
      chrome.storage.sync.get({login:null,user_name:null},function(data){
        let ret = data.login || data.user_name;
        if(ret){
          resolve(ret);
        }else{
          reject("User not logged in.");
        }
      })
    });
  },
  // get_user_name : Storage.get_login,
  get_user_id : function(){
    return new Promise((resolve,reject)=>{
      chrome.storage.sync.get("user_id",data=>{
        resolve(data.user_id);
      })
    })
  },
  getFollowed : function(){
    return new Promise((resolve,reject)=>{
      chrome.storage.local.get("followed_channels",data=>{
        resolve(data.followed_channels);
      })
    })
  },
  updateFollowed : function(followed_channels){
    chrome.storage.local.set({followed_channels});
  },
  getFollowedLives : function(){
    return new Promise((resolve,reject)=>{
      chrome.storage.local.get("followed_channels_objects",data=>{
        resolve(data.followed_channels_objects);
      })
    })
  },
  setFollowedLives : function(live_list){
    return new Promise((resolve,reject)=>{
      chrome.storage.local.set({livestream:live_list.livestream},()=>{
        resolve();
      });
    });
  }
}