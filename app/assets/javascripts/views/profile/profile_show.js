Locus.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(){
		this.galleryView = new Locus.Views.Gallery({
			collection: new Locus.Collections.Pieces()
		});
		this.listenTo(this.model, "sync", this.conditionallyAddSubviews);
		this.listenTo(this.model, "sync", this.addGallery);
		this.listenTo(this.model, "sync", this.render)
	},
	
	template: JST['profile/show'],
	
	render: function(){
		if(this.model.user !== undefined){
			var content = this.template({ profile: this.model, user: this.model.user});
			this.$el.html(content);
			this.attachSubviews();
		} 
		return this;
	},
	
	conditionallyAddSubviews: function(){
		debugger
		var m = this.model
		if(m.get('cover_piece') !== null){
			this.addCoverPiece(true);
		} else {
			this.addCoverPiece(false);
		};
		
		if(m.get('artist_statemnt') !== null){
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
		debugger
		var coverPieceView = new Locus.Views.CoverPieceForm({model: null});
		if(bool){
			coverPieceView = new Locus.Views.CoverPiece({model: this.model.get('cover_piece')});
		}
		this.addSubview('#cover-piece', coverPieceView);
	},

	
	addArtistStatement: function(bool){
		var artistStatementView = new Locus.Views.ArtistStatementForm({model: this.model.get('artist_statement')});
		if(bool){
			artistStatementView = new Locus.Views.ArtistStatement({model: this.model.get('artist_statement')});
		}
		this.addSubview('#artist-statement', artistStatementView);
		
	},
	
	addCollaborativeStatement: function(bool){
		var colStatementView = new Locus.Views.CollaborativeStatementForm({model: this.model.get('collaborative_statment')});
		if(bool){
			colStatementView = new Locus.Views.CollaborativeStatement({model: this.model.get('collaborative_statment')});
		}
		this.addSubview('#collaborative-statement', colStatementView);
	},
	
	
	addGallery: function(){
		var view = this;
		this.galleryView.collection.fetch({
			data: {filter: 'own'},
			success: function(){
				view.addSubview('#own-gallery', view.galleryView);
			}
		});
	},
});