Locus.Views.GalleryItem = Backbone.CompositeView.extend({

	template: JST['gallery/item'], 
	
	events: {
		'click .follow-button' : 'followUser',
		'click .unfollow-button' : 'unfollowUser',
		'click .gallery-item' : 'showPiece',
		'click #overlay' : 'hidePiece'
	},
	
	render: function(){
		var content = this.template({ piece: this.model });
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
	
	followUser: function(){
		var view = this;
		var followUnit = new Locus.Models.FollowUnit({follower_id: this.collection.current_user.id, followee_id: this.model.get('user_id')});
		followUnit.save({}, {
			url: 'api/follow_units',
			success: function(){
				view.toggleFollowButton();
			}
		});
	},
	
	toggleFollowButton: function(){
		var $unfollowButton = $('.unfollow-btn').toggle();
		var $followButton = $('.follow-btn').toggle();
	}
	
});