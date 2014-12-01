Locus.Models.Piece = Backbone.Model.extend({
	rootUrl: "api/pieces",
	
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
			options = {};
		}

		var m = this.get('media_type')
		if(m){
			var url = "'" + this.media()['url'] + "'";
			if(m === 'image'){
				if(options.show){
					var width = "95%"
					var height = "95%"
					return "<img src="+ url + " width="+width+" height="+height+">"
				} else {
					var width = "50%"
					var height = "60%"
					return "<img src="+ url + " width="+width+" height="+height+">"
				}
				
			} else if (m === 'audio'){
				return "<embed type=”application/x-shockwave-flash” src=”http://www.google.com/reader/ui/3523697345-audio-player.swf” flashvars=”audioUrl="+ url +"” width=”400″ height=”27″ quality=”best”></embed>"
			} else {
				
			}
		}
		
		
	}
});
