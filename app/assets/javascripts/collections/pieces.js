Locus.Collections.Pieces = Backbone.Collection.extend({
	model: Locus.Models.Piece,
	url: "api/pieces",
	
	getOrFetch: function(){
		
	}
		
	
});

Locus.pieces = new Locus.Collections.Pieces();