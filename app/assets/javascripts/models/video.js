Locus.Models.Video = Backbone.Model.extend({
	rootUrl: "api/videos",
	
	mediaHtml: function(options){
		if(!options){
			options = {};
		}
		
		var url = "'" + this.get('url') + "'";
		var width = "95%"
		var height = "95%"
			
		return "<video class='video-js vjs-default-skin' controls preload='auto' width=" + width +" height=" + height +"> <source src=" + url + " type='video/mp4'></video>"
	}
});