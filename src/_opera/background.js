var notify = function(ls){
	//console.log("NOTE")
	var opt = {
		type:"image",
		iconUrl:"../img/icon_128_bordered_white.png",
		imageUrl:"http://edge.sf.hitbox.tv"+ls.media_thumbnail_large,
		title:ls.media_display_name || "",
		message:ls.category_name || "",
		isClickable:true
	}
	console.log(opt)
	chrome.notifications.create(ls.channel.channel_link,opt,function(){})
}