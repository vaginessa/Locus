Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.hidePostForm();
		this.addPostForm();
		this.addUploadBar();
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "sync", this.addUserSideBar);
		this.listenTo(this.collection, "sync", this.addGallery);
	}, 
	
	events: {
		"click .btn-post-piece" : "displayPostForm"
	},
	
	template: JST["main_space"],
	
	className: 'main-space',
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addUserSideBar: function() {
		var userSideBarView = new Locus.Views.UserSidebar({ user: this.collection.current_user })
		this.addSubview('#user-sidebar', userSideBarView)
	},
	
	addGallery: function() {
		var galleryView = new Locus.Views.Gallery({ collection: this.collection });
		this.addSubview('#gallery', galleryView);
	},
	
	addPostForm: function(){
		var pieceFormView = new Locus.Views.PieceForm({ collection: this.collection }) 
		this.addSubview('#post-form', pieceFormView);
	},
	
	addUploadBar: function(){
		var uploadBarView = new Locus.Views.UploadBar();
		this.addSubview('#upload-bar', uploadBarView);
	},
	
	displayPostForm: function(){
		this.$('#post-form').show();
	},
	
	hidePostForm: function(){
		this.$('#post-form').show();
	}
})