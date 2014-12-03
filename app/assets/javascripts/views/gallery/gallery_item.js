Locus.Views.GalleryItem = Backbone.CompositeView.extend({
	template: JST['gallery/item'], 
	
	initialize: function(){
		debugger
		this.$('.follow-btn').hide();
		this.listenTo(this.model, 'change:following', this.render);
		var follow_unit_id = this.model.get('follow_unit')[0].id;
		this.listenTo(this.model, 'sync', this.model.set({follow_unit_id: follow_unit_id }, {silent: true}));
	},
	
	events: {
		'click .follow-btn' : 'followUser',
		'click .unfollow-btn' : 'unfollowUser',
		'click .gallery-item' : 'showPiece',
		'click #overlay' : 'hidePiece'
	},
	
	render: function(){
		var content = this.template({ piece: this.model, current_user: this.collection.current_user});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	showPiece: function(event){
		var $followButton = $('.follow-btn');
		var $unfollowButton = $('.unfollow-btn');
		var $target = $(event.currentTarget);
		
		if(!$followButton.is($target) && !$unfollowButton.is($target)){
			var pieceShowView = new Locus.Views.PieceShow({ model: this.model });
			this.addSubview("#piece-show", pieceShowView);
			this.$("#piece-show").show();
		}
	},
	
	hidePiece: function(event){
		var $pieceShow = $('#piece-show');
		var $target = $(event.currentTarget);
		if(!$pieceShow.is($target)){
			this.$('#piece-show').empty();
			this.$('#piece-show').hide();
		}
	},
	
	followUser: function(event){
		event.stopImmediatePropagation();
		var view = this;
		var followUnit = new Locus.Models.FollowUnit({follower_id: this.collection.current_user.id, followee_id: this.model.get('artist_id')});
		followUnit.save({}, {
			url: 'api/follow_units',
			success: function(){
				view.model.set({follow_unit_id: followUnit.id});
				view.toggleFollowButton();
			}
		});
		
		
	},
	
	unfollowUser: function(event){
		
		event.stopImmediatePropagation();
		var view = this;
		this.toggleFollowButton();
		var followUnit = new Locus.Models.FollowUnit({id: this.model.follow_unit_id});
		followUnit.destroy({
			url: "/api/follow_units/" + followUnit.id,
			success: function(){
				view.toggleFollowButton();
			}
		})

	},
	
	toggleFollowButton: function(){
		this.$('.unfollow-btn').toggle(0);
		this.$('.follow-btn').toggle(0);
	}
	
});