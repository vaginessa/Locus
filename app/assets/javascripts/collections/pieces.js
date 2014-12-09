Locus.Collections.Pieces = Backbone.Collection.extend({
	model: Locus.Models.Piece,
	url: "api/pieces",
	
	initialize: function(){
		this.current_user = {}
	},
	
	
	filterByFollow: function(){
		var pieces = this;
		return _(this.models).filter( function(model) { 
			return _.contains(pieces.current_user.followees_id, model.artist_id); 
		});
	},
	
	parse: function(payload){
		if(payload.current_user){
			this.current_user = { 
				id: payload.current_user.current_user_id, 
				fname: payload.current_user.fname, 
				lname: payload.current_user.lname,
				followers: payload.current_user.followers,
				followees: payload.current_user.followees,
				profile_id: payload.current_user.profile_id
			}
			delete payload.current_user
		}
		
		return payload.pieces;
	},
});

Locus.pieces = new Locus.Collections.Pieces;