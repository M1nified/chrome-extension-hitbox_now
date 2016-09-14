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
  getFollowedChannelsObjects : function(){
    return new Promise((resolve,reject)=>{
      chrome.storage.local.get("followed_channels_objects",data=>{
        resolve(data.followed_channels_objects);
      })
    })
  },
  ufco_queue : [],
  ufco_queue_running : false,
  updateFollowedChannelsObjects : function(user_object){
    Storage.ufco_queue.push(user_object);
    Storage.ufcoQueueRun();
  },
  ufcoQueueRun : function(){
    if(Storage.ufco_queue_running === true || Storage.ufco_queue.length === 0) return;
    Storage.ufco_queue_running = true;
    return Storage.getFollowedChannelsObjects().then(followed_channels_objects=>{
      followed_channels_objects = followed_channels_objects || {};
      for(let i = 0; i<100; i++){
        let uo = Storage.ufco_queue.pop();
        if(!uo) break;
        followed_channels_objects[uo.media_display_name] = uo;
      }
      chrome.storage.local.set({followed_channels_objects},()=>{
        Storage.ufco_queue_running = false;
        Storage.ufcoQueueRun();
      });
    })
  }
}