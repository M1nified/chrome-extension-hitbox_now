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
  updateFollowedChannelsObjects : function(){
    return new Promise((resolve,reject)=>{
      Storage.getFollowed().then(followed_channels=>{
        console.log(followed_channels)
        for(let followed_channel of followed_channels.following){
          $.getJSON("https://api.hitbox.tv/media/live/"+followed_channel.user_name,user_object=>{
            console.log(user_object);
            Storage.updateFollowedChannelsObjects(user_object.livestream[0]);
          })
        }
      })
    })
  }
}