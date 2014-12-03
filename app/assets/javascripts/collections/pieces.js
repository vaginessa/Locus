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
				following_units: payload.current_user.following_units,
				followers: payload.current_user.followers,
				followees: payload.current_user.followees
			}
			delete payload.current_user
		}
		
		return payload.pieces;
	},
	
	findFollowUnit: function(id){
		_(this.current_user.following_units).each(function(follow_unit){
			if(follow_unit.unit_id === id){
				return follow_unit;
			}
		})
	}
		
	
});

Locus.pieces = new Locus.Collections.Pieces;