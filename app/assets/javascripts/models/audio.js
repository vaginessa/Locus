Locus.Models.Audio = Backbone.Model.extend({
	
	rootUrl: "api/audio",
	
	url: function(){
		return this.rootUrl + "/" + this.id;
	}
	
});