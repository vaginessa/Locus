Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.addUploadBar();
		this.addGallery();
		this.listenToOnce(this.collection, "sync", this.addUserSidebar);
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.render);
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
		$("#gallery").empty();
		var galleryView = new Locus.Views.Gallery({ collection: this.collection });
		this.addSubview('#gallery', galleryView);
	},
	
	addPostForm: function(){
		var pieceFormView = new Locus.Views.PieceForm({ collection: this.collection }) 
		this.addSubview('#post-form', pieceFormView);
	},
	
	addUploadBar: function(){
		var uploadBarView = new Locus.Views.UploadBar({ collection: this.collection, user: this.collection.current_user });
		this.addSubview('#upload-bar', uploadBarView);
	}

	
})