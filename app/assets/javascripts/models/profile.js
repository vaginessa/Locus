Locus.Models.Profile = Backbone.Model.extend({
	rootUrl: 'api/profiles',
	
	initialize: function(){
		this.cover_piece = null;
	},
	
	parse: function(payload){
		if(payload.profile.user){
			this.user = payload.profile.user;
			delete payload.profile.user;
		}
		
		if(payload.profile.cover_piece){
			this.coverPiece().set(payload.profile.cover_piece.c_p, {parse : true});
			this.coverPiece().set({image: payload.profile.cover_piece.c_p_img});
			this.coverPiece().set({audio: payload.profile.cover_piece.c_p_aud});
			this.coverPiece().set({video: payload.profile.cover_piece.c_p_vid});
			delete payload.profile.cover_piece
			
		}
		return payload.profile;
	},
	
	coverPiece: function(){
		if(!this._coverPiece){
			this._coverPiece = new Locus.Models.Piece();
		}
		
		return this._coverPiece;
	}
});