Locus.Views.Gallery = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.mode = options.mode
		this.addGalleryItems();
		this.listenTo(this.collection, "add", this.addGalleryItem);
		this.listenTo(this.collection, "unshift", this.unshiftGalleryItem);
		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST['main_space/gallery_show'],
	
	render: function(){
		var content = this.template({ pieces: this.collection });
		debugger
		if(this.mode === 'search'){
			this.$('#gallery-items').addClass('search');
		}
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addGalleryItem: function(model){
		var galleryItem = new Locus.Views.GalleryItem({ model: model, collection: this.collection });
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