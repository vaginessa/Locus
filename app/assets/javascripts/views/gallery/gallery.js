Locus.Views.Gallery = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.mode = options.mode
		this.addClassSearch();
		this.addGalleryItems();
		this.listenTo(this.collection, "add", this.addGalleryItem);
		this.listenTo(this.collection, "unshift", this.unshiftGalleryItem);
		this.listenTo(this.collection, "sync", this.render)
		this.listenTo(this.collection, "sync", this.makeMasonry)
		this.listenTo(this.collection, "all", this.addClassSearch)
		this.listenTo(this.collection, "remove", this.render)
	},
	
	addClassSearch: function(){
		if(this.mode === 'masonry'){
			$('#gallery-items').addClass('masonry')
		}	
	},
	
	template: JST['main_space/gallery_show'],
	
	render: function(){
		var content = this.template({ pieces: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		this.makeMasonry();
		return this;
	},
	
	makeMasonry: function(){
		if(this.mode === 'masonry'){
			$('#gallery-items').imagesLoaded(function(){
			 	$('#gallery-items').packery({
					containerStyle: null,
					itemSelector: '.gi',
					gutter: 60
				})
			});
		}
		
	},
	
	addGalleryItem: function(model){
		var galleryItem = new Locus.Views.GalleryItem({ model: model, collection: this.collection, view: this });
		this.addSubview('#gallery-items', galleryItem);
	},
	
	unshiftGalleryItem: function(model){
		var galleryItem = new Locus.Views.GalleryItem({ model: model, collection: this.collection });
		this.addSubview('#gallery-items', galleryItem, { prepend: true });
	},
	
	addGalleryItems: function(){
		var view = this;
		this.collection.each( function(model){
			view.addGalleryItem(model)
		});
	}
	
	
});