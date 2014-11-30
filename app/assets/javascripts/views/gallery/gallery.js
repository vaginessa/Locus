Locus.Views.Gallery = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.addGalleryItems();
		this.listenTo(this.collection, "add", this.addGalleryItem);
	},
	
	template: JST['main_space/gallery_show'],
	
	className: 'main-gallery',
	
	render: function(){
		var content = this.template({ pieces: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addGalleryItem: function(model){
		debugger
		var galleryItem = new Locus.Views.GalleryItem({ model: model });
		this.addSubview('#gallery-items', galleryItem);
	},
	
	addGalleryItems: function(){
		debugger
		var view = this;
		this.collection.each( function(model){
			view.addGalleryItem(model)
		})
	}
	
	
});