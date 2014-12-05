Locus.Models.Image = Backbone.Model.extend({

	rootUrl: "api/images",
	
	mediaHtml: function(options){
		if(!options){
			options = {};
		}
		
		var url = "'" + this.get('url') + "'";
		if(options.form){
			var width = '100%'
			var	height = '100%'
		} else {
			var width = "50%"
			var height = "60%"
		}
		return "<img src="+ url + " width="+width+" height="+height+">"
	}
});