Locus.Models.Piece = Backbone.Model.extend({
	urlRoot: "api/pieces",
	
	media: function(){
		if(this.get('image')){
			return this.get('image');
		} else if(this.get('audio')){
			return this.get('audio');
		} else if(this.get('video')) {
			return this.get('video');
		}
	},
	
	mediaHtml: function(options){
		if(!options){
			options = {}
		}
		
		if(options.show){
			var width = "100%"
			var height = "60%"
		} else {
			var width = "65%"
			var height = "60%"
		}

		var m = this.get('media_type')
		if(m) {
			var url = "'" + this.media()['url'] + "'";
			if(m === 'image'){
				return "<img src="+ url + " width="+width+" height="+height+">"
			} else if (m === 'audio'){
				return '<audio controls> <source src =' + url + ' type="audio/mpeg"></audio>'
			} else {
				return "<video class='video-js vjs-default-skin' controls preload='auto' width=" + width +" height=" + height +"> <source src=" + url + " type='video/mp4'></video>"
				
			}
		}
	}
});
