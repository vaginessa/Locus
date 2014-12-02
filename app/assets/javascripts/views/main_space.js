Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.randomGalleryView = null;
		this.galleryView = new Locus.Views.Gallery({ collection: this.collection });;
		this.addUploadBar();
		this.listenTo(this.collection, "sync", this.addGallery);
		this.listenToOnce(this.collection, "sync", this.addUserSidebar);
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.render);
	}, 
	
	events: {
		'click #random-tab' : 'getRandomPieces',
		'click #home-tab' : 'showMainGallery'
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
		var randomPieces = Locus.pieces;
		var view = this;
		randomPieces.fetch({
			data: {filter: 'random'},
			success: function(){
				randomPieces.each(function(piece){
					piece.set({following : false}, {silent: true});
				})
				view.showRandomPieces(randomPieces);
			}
		});
	},
	
	showRandomPieces: function(randomPieces){
		debugger
		this.$('#gallery').empty();
		this.removeSubview('#gallery', this.galleryView);

		var randomGalleryView = new Locus.Views.Gallery({ collection: randomPieces });
		this.randomGalleryView = randomGalleryView;
		this.addSubview('#gallery', randomGalleryView);
	},
	
	showMainGallery: function(){
		debugger
		this.removeSubview('#gallery', this.randomGalleryView);
		this.$('#gallery').empty();
		this.addGallery();
	}

	
})