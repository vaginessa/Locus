Locus.Collections.Pieces = Backbone.Collection.extend({
	model: Locus.Models.Piece,
	url: "api/pieces",
	
	initialize: function(){
		this.current_user = {}
	},
	
	getOrFetch: function(){
		// var piece = this.get(id);
	//
	// 	if(piece === undefined){
	// 		piece = new Locus.Models.Piece();
	// 	}
		
	},
	
	parse: function(payload){
		
		if(payload.current_user){
			this.current_user = { 
				id: payload.current_user.current_user_id, 
				fname: payload.current_user.fname, 
				lname: payload.current_user.lname
			}
			delete payload.current_user
		}
		
		if(payload.pieces){
			this.set(payload.pieces, { parse: true, remove: false })
			delete payload.pieces
		}
		
		debugger
		
	
		return payload;
	}
		
	
});

Locus.pieces = new Locus.Collections.Pieces;