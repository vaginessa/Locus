Locus.Collections.Pieces = Backbone.Collection.extend({
	model: Locus.Models.Piece,
	url: "api/pieces",
	comparator: function(piece){
		var date = new Date(piece.get('updated_at'));
		return -date.getTime();
	},
	
	initialize: function(){
		this.current_user = {}
	},
	
	fetchSubscribedPieces: function(){
		this.fetch();
		_(this.filter(function(model){
			
		}))
		
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
		
		return payload.pieces;
	}
		
	
});

Locus.pieces = new Locus.Collections.Pieces;