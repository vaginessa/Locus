Locus.Models.Video = Backbone.Model.extend({
	rootUrl: "api/videos",
	
	mediaHtml: function(options){
		if(!options){ options = {};}
		
		var url = "'" + this.get('url') + "'";
		if(options.form){
			var width = '100%'
			var	height = '100%'
		} else {
			var width = "50%"
			var height = "60%"
		}
			
		return "<video class='video-js vjs-default-skin' controls preload='auto' width=" + width +" height=" + height +"> <source src=" + url + " type='video/mp4'></video>"
	}
});