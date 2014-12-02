Locus.Models.Image = Backbone.Model.extend({

	rootUrl: "api/images",
	
	mediaHtml: function(options){
		if(!options){
			options = {};
		}
		
		var url = "'" + this.get('url') + "'";
		var width = "50%"
		var height = "60%"
		return "<img src="+ url + " width="+width+" height="+height+">"
	}
});