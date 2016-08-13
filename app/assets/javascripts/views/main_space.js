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
		'click #followers-btn' : 'fetchFollowUsers',
		'click #following-btn' : 'fetchFollowUsers',
		'click link' : 'hidePopup'
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
		var userSideBarView = new Locus.Views.UserSidebar({ user: this.collection.current_user });

		this.addSubview('#user-sidebar', userSideBarView);
	},
	
	addGallery: function() {
		this.$("#gallery").empty();
		this.addSubview('#gallery', this.galleryView);
		if(this.collection.length === 0){
			this.$('#empty-gallery').show();
		}
	},
	
	addPostForm: function(){
		var pieceFormView = new Locus.Views.PieceForm({ collection: this.collection }); 
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
		this.randomGalleryView = new Locus.Views.Gallery({collection: randomPieces});
		this.showRandomPieces();
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
	
	fetchFollowUsers: function(event){
		var filter = 'following';
		if(event.currentTarget.id === 'followers-btn'){
			filter = 'followers';
		}
		
		var view = this;
		var users = new Locus.Collections.FollowUsers();
		users.fetch({
			url: 'users',
			data: {filter: filter },
			success: function(){
				view.showFollowUsers(users);
			}
		});
	},
	
	showFollowUsers: function(users){
		var followList = $('#follows');
		followList.empty();
		users.each( function(user){
			var profileUrl = '#/profiles/' + user.get('profile').id;
			var profileLink = '<a href=' + profileUrl + '>' + user.get('fname') + " " + user.get('lname') + '</a>';
			var user = $('<li>').addClass('follow-li').html(profileLink);
			followList.append(user);
		});
		
		$('#follow-popup').popup('show');
	},
	
});
