Locus.Views.GalleryItem = Backbone.View.extend({

	template: JST['gallery/item'], 
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	}
	
});