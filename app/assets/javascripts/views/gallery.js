Locus.Views.Gallery = Backbone.CompositeView.extend({
	
	template: JST['main_space/gallery_show'],
	
	className: 'main-gallery',
	
	render: function(){
		var content = this.template({ pieces: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
	
});