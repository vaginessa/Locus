Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.galleryView = new Locus.Views.Gallery({ collection: this.collection });
		this.addUploadBar();
		this.listenTo(this.collection, "sync", this.addGallery);
		this.listenToOnce(this.collection, "sync", this.addUserSidebar);
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.render);
	}, 
	
	events: {
		'click #random-tab' : 'getRandomPieces',
		'click #home-tab' : 'showMainGallery',
		'click #followers-btn' : 'showFollowers'
	},
	
	
	template: JST["main_space"],
	
	className: 'main-space',
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addUserSidebar: function() {
		$("#user-sidebar").empty();
		var userSideBarView = new Locus.Views.UserSidebar({ user: this.collection.current_user })

		this.addSubview('#user-sidebar', userSideBarView)
	},
	
	addGallery: function() {
		this.$("#gallery").empty();
		this.addSubview('#gallery', this.galleryView);
		if(this.collection.length === 0){
			this.$('#empty-gallery').show()
		}
	},
	
	addPostForm: function(){
		var pieceFormView = new Locus.Views.PieceForm({ collection: this.collection }) 
		this.addSubview('#post-form', pieceFormView);
	},
	
	addUploadBar: function(){
		var uploadBarView = new Locus.Views.UploadBar({ collection: this.collection, user: this.collection.current_user});
		this.addSubview('#upload-bar', uploadBarView);
	},
	
	getRandomPieces: function(){
		var view = this;
		var randomPieces = new Locus.Collections.Pieces();
		randomPieces.fetch({
			data: {filter: 'random'}
		});
		this.randomGalleryView = new Locus.Views.Gallery({collection: randomPieces})
		this.showRandomPieces()
	},
	
	showRandomPieces: function(randomPieces){
		this.$('#gallery').empty();
		this.removeSubview('#gallery', this.galleryView);
		this.addSubview('#gallery', this.randomGalleryView);
	},
	
	showMainGallery: function(){
		if(this.randomGalleryView){
			this.removeSubview('#gallery', this.randomGalleryView);
		}
		this.$('#gallery').empty();
		this.addGallery();
	},
	
	showFollowers: function(){

		var followers = this.collection.current_user['followers']
			
		var followersList = $('#followers');
		followersList.empty();
		_.each(followers, function(follower){

			var profileUrl = '#/profiles/' + follower.profile_id
			var profileLink = '<a href=' + profileUrl + '>' + follower.follower_fname + " " + follower.follower_lname + '</a>'
			var follower = $('<li>').addClass('follower-li').html(profileLink);
			followersList.append(follower);
		});
		
		$('#follower-popup').popup('show');
	}

	
})