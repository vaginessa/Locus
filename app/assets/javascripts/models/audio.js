Locus.Models.Audio = Backbone.Model.extend({
	
	rootUrl: "api/audio",
	
	mediaHtml: function(options){
		if(!options){
			options = {};
		}
		
		
		var url = "'" + this.get('url') + "'";

		return '<audio controls> <source src =' + url + ' type="audio/mpeg"></audio>'
	}
	
});