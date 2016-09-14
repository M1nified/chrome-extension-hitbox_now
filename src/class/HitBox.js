"use strict";
var HitBox = {
  getFollowed : function(){
    return new Promise((resolve,reject) => {
      return Storage.get_login().then(user_name => {
        $.getJSON("https://api.hitbox.tv/following/user?user_name="+user_name,followed_channels => {
          // console.log(followed_channels);
          resolve(followed_channels);//resolve with original response
        })
      });
    })
  },
  updateFollowed : function(){
    return HitBox.getFollowed().then(followed_channels => {
      Storage.updateFollowed(followed_channels);
    })
  },
  updateFollowedLives : function(){
    return new Promise((resolve,reject)=>{
      return Storage.get_user_id().then(user_id=>{
        $.getJSON("https://api.hitbox.tv/media/live/list?follower_id="+user_id,live_list=>{
          return Storage.setFollowedLives(live_list).then(()=>{
            resolve(live_list);
          });
        });
      });
    });
  }
}