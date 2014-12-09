Locus.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(){
		this.galleryView = new Locus.Views.Gallery({
			collection: new Locus.Collections.Pieces(),
			mode: 'masonry'
		});
		this.listenTo(this.model, "sync", this.ownProfile)
		this.listenTo(this.model, "sync", this.conditionallyAddSubviews);
		this.listenTo(this.model, "sync", this.addGallery);
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		'click .follow-btn' : 'followUser',
		'click .unfollow-btn' : 'unfollowUser',
		'click .set-cover-piece' : 'setCoverPiece',
		'mouseenter .art.pencil' : 'toggleEdit',
		'mouseleave .art.pencil' : 'toggleEdit',
		'click .art.pencil' : 'editArtistStatement',
		'submit form#a-s' : 'submitArtistStatement'
	},
	
	className: 'profile',
	
	template: JST['profile/show'],
	
	render: function(){
		this.checkCoverPiece()
		var user = {}
		if(this.model.user){
			user = this.model.user
		}

		var content = this.template({ profile: this.model, user: user});
		this.$el.html(content);
		this.attachSubviews();
		if($('.cover-piece').length !== 0){
			if($('#cover-piece-form')){
				$('#cover-piece-form').remove()
			}
		}
		
	
		return this;
	},
	
	ownProfile: function(){
		if(this.model.user['user_id'] === this.model.get('current_user_id')){
			this.model.set({ownprofile: true})
			$('#collaborate-badge').addClass('owner')
			return true
		} else {
			this.model.set({ownprofile: false})
			false
		}
	},

	checkCoverPiece: function(){
		var cp = this.model.coverPiece();
		if(cp.get('image') === null && cp.get('audio') === null && cp.get('video') === null){
			this.model.unset('cover_piece')
			$('#cover-piece').empty()
			return true
		} else {
			return false
		}
	},
	
	conditionallyAddSubviews: function(){
		var m = this.model
		if(m.coverPiece() !== null && !this.checkCoverPiece()){
			this.addCoverPiece();
		}
		
		if(m.get('artist_statemnt') !== null){
			this.addArtistStatement();
		}
	},
	
	addCoverPiece: function(){
		
		if(this.coverPieceView !== undefined){
			this.removeSubview('#cover-piece', this.coverPieceView)
		}
		
		this.coverPieceView = new Locus.Views.CoverPiece({ model: this.model.coverPiece()})
		this.addSubview('#cover-piece', this.coverPieceView);
		if(this.model.get('cover_piece')){
			this.model.unset('cover_piece')
		}	
	},
	
	
	setCoverPiece: function(piece){
		var view = this;
		this.model.save({cover_piece_id: piece.id}, {
			url: 'api/profiles/' + view.model.id,
			silent: true
		});
		
		this.model.set({cover_piece: piece});
		this.model.coverPiece().set(piece)
		this.addCoverPiece();
	},
	

	
	addArtistStatement: function(){
		if(!this.artistStatementView){
			this.artistStatementView = new Locus.Views.ArtistStatement({ text: this.model.get('artist_statement')});
		} 
		this.addSubview('#artist-statement', this.artistStatementView);
		
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

	toggleEdit: function(){
		$('#edit').toggle(400);
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