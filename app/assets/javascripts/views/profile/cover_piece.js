Locus.Views.CoverPiece = Backbone.View.extend({

	template: JST['profile/cover_piece'],
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	}
});