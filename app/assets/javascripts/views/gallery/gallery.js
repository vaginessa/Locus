Locus.Views.Gallery = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.addGalleryItems();
		this.listenTo(this.collection, "add", this.addGalleryItem);
		this.listenTo(this.collection, "unshift", this.unshiftGalleryItem);
	},
	
	template: JST['main_space/gallery_show'],
	
	render: function(){
		var content = this.template({ pieces: this.collection });
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