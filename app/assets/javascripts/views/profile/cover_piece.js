Locus.Views.CoverPiece = Backbone.View.extend({
	template: ['profile/cover_piece'],
	
	render: function(){
		debugger
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	}
});