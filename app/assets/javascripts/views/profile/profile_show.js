Locus.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(){
		this.galleryView = new Locus.Views.Gallery({
			collection: new Locus.Collection.Pieces();
		});
		this.listenTo(this.model, "sync", conditionallyAddSubviews);
		this.listenTo(this.model, "sync", this.addGallery);
		this.listenTo(this.model, "sync", this.render)
	},
	
	template: JST['profile/show'],
	
	render: function(){
		if(this.model.user !== undefined){
			debugger
			var content = this.template({ profile: this.model, user: this.model.user});
			this.$el.html(content);
			this.attachSubviews();
		} 
		return this;
	},
	
	conditionallyAddSubviews: function(){
		var m = this.model
		if(m.get('cover_piece') !== 'null'){
			this.addCoverPiece(true);
		} else {
			this.addCoverPiece(false);
		};
		
		if(m.get('artist_statemnt') !== 'null'){
			this.addArtistStatement(true);
		} else {
			this.addArtistStatement(false);
		};
		
		if(m.user['collaborate'] === true){
			this.addCollaborativeStatement(true);
		} else {
			this.addCollaborativeStatement(false);
		};
	},
	
	addCoverPiece: function(bool){
		var coverPieceView = Locus.Views.CoverPieceForm({model: this.model.get('cover_piece')});
		if(bool){
			var coverPieceView = Locus.Views.CoverPiece({model: this.model.get('cover_piece')});
		}
		this.addSubview('#cover-piece', coverPieceView);
	},

	
	addArtistStatement: function(bool){
		var artistStatementView = Locus.Views.ArtistStatementForm({model: this.model.get('artist_statement')});
		if(bool){
			var artistStatementView = Locus.Views.ArtistStatement({model: this.model.get('artist_statement')});
		}
		this.addSubview('#artist-statement', artistStatmentView);
		
	},
	
	addCollaborativeStatement: function(bool){
		var colStatementView = Locus.Views.CollaborativeStatementForm({model: this.model.get('collaborative_statment')});
		if(bool){
			var colStatementView = Locus.Views.CollaborativeStatement({model: this.model.get('collaborative_statment')});
		}
		this.addSubview('#collaborative-statement', colStatmentView);
	},
	
	
	addGallery: function(){
		var view = this;
		var galleryPieces = new Locus.Collection.Pieces();
		this.galleryView.collection.fetch({
			data: {filter: 'own'},
			success: function(){
				this.addSubview('#own-gallery', view.galleryView);
			}
		});
	},
});