Locus.Model.Piece = Backbone.Model.extend({
	rootUrl: "/api/pieces",
	url: function(){
		return this.rootUrl + "/" + this.id
	}
	
});