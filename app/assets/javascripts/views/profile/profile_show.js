Locus.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(){
		this.coverPiece = this.model.coverPiece();
	
		this.coverPieceView = null;
		this.galleryView = new Locus.Views.Gallery({
			collection: new Locus.Collections.Pieces()
		});

		this.listenTo(this.model, "sync", this.conditionallyAddSubviews);
		this.listenTo(this.model, "sync", this.addGallery);
		this.listenTo(this.model, "change:cover_piece", this.render)
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		'click .follow-btn' : 'followUser',
		'click .unfollow-btn' : 'unfollowUser',
		'click .set-cover-piece' : 'setCoverPiece',
		'mouseenter .pencil' : 'showEdit',
		'mouseleave .pencil' : 'hideEdit',
		'click .pencil' : 'editArtistStatement',
		'click #collaborate-badge' : 'showCollaborativeStatment',
		'submit form#a-s' : 'submitArtistStatement'
	},
	
	className: 'profile',
	
	template: JST['profile/show'],
	
	render: function(){
		if(this.model.user !== undefined){
			var content = this.template({ profile: this.model, user: this.model.user});
			this.$el.html(content);
			this.attachSubviews();
		} 
		return this;
	},
	
	ownProfile: function(){
		if(this.model.user['user_id'] === this.model.get('current_user_id')){
			this.model.set({ownprofile: true})
			return true
		} else {
			false
		}
	},

	
	conditionallyAddSubviews: function(){
		var m = this.model
		if(m.coverPiece() !== null){
			this.addCoverPiece();
		} 
		
		if(m.get('artist_statemnt') !== null){
			this.addArtistStatement();
		}
		
		if(m.user['collaborate'] === true){
			this.addCollaborativeStatement(true);
		} else {
			this.addCollaborativeStatement(false);
		};
	},
	
	addCoverPiece: function(){
		this.coverPieceView = new Locus.Views.CoverPiece({model: this.model.coverPiece()}); 
		this.addSubview('#cover-piece', this.coverPieceView); 	
	},

	
	addArtistStatement: function(){
		if(!this.artistStatementView){
			this.artistStatementView = new Locus.Views.ArtistStatement({ text: this.model.get('artist_statement')});
		} 
		this.addSubview('#artist-statement', this.artistStatementView);
		
	},
	
	addCollaborativeStatement: function(bool){
		var colStatementView = undefined;
		if(this.ownProfile()){
			var colStatementView = 
				new Locus.Views.CollaborativeStatementForm({
					model: this.model.get('collaborative_statment')
				});
		}
		
		if(bool){
			colStatementView = new Locus.Views.CollaborativeStatement({model: this.model.get('collaborative_statment')});
		}
		
		if(colStatementView){
			this.addSubview('#collaborative-statement', colStatementView);
		}
	},
	
	
	addGallery: function(){
		var view = this;
		var user_id = this.model.user['user_id'];
		this.galleryView.collection.fetch({
			data: {filter: 'own', user_id: user_id },
			success: function(){
				if (view.ownProfile()){
					view.galleryView.collection.each(function(piece){
						piece.set({ownprofile: true, profile: view})
					});
				}
				view.addSubview('#own-gallery', view.galleryView);
			}
		});
	},
	
	followUser: function(event){
		var view = this;
		var followUnit = new Locus.Models.FollowUnit({ followee_id: this.model.user['user_id'] });
		followUnit.save({}, {
			url: 'api/follow_units',
			success: function(){
				view.model.set({follow_unit_id: followUnit.id})
				view.toggleFollowButton();
			}
		});
	},
	
	unfollowUser: function(){		
		var view = this;
		var followUnit = new Locus.Models.FollowUnit({id: this.model.get('follow_unit_id')});
		followUnit.destroy({
			url: "/api/follow_units/" + followUnit.id,
			success: function(){
				view.toggleFollowButton();
			}
		})

	},
	
	toggleFollowButton: function(){
		this.$('.unfollow-btn').toggle(400);
		this.$('.follow-btn').toggle(400);
	},
	
	setCoverPiece: function(piece){
		var view = this
		this.model.save({cover_piece_id: piece.id}, {
			url: 'api/profiles/' + view.model.id,
		});
		
		this.model.set({cover_piece: piece});
		
		if(this.coverPieceView !== null){
			this.removeSubview('#cover-piece', this.coverPieceView)
		} else {
			$('#cover-piece-form').remove()
		}
		this.addCoverPiece();
	},
	
	showEdit: function(){
		$('#edit').show(400, 'linear');
	},
	
	hideEdit: function(){
		$('#edit').hide(400);
	},
	
	editArtistStatement: function(){
		if(this.artistStatementView !== null){
			this.removeSubview('#artist-statement', this.artistStatementView);
		}
		
		this.artistStatementView = new Locus.Views.ArtistStatementForm({ text: this.model.get('artist_statement') });
		this.addArtistStatement();
	},
	
	submitArtistStatement: function(event){
		event.preventDefault();
		var view = this;
		var $target = $(event.currentTarget);
		var attrs = $target.serializeJSON();
		this.model.set(attrs['profile']);
		this.model.save({}, {
			url: 'api/profiles/' + this.model.id,
			
			success: function(){
				view.removeSubview('#artist-statement', view.artistStatementView);
				view.artistStatementView = new Locus.Views.ArtistStatement({text: view.model.get('artist_statement')});
				view.addArtistStatement();
			}
		})
		
	
	}
});