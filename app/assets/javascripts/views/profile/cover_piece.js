Locus.Views.CoverPiece = Backbone.View.extend({
	template: JST['profile/cover_piece'],
	
	render: function(){
		debugger
		var content = this.template({ piece: this.model });
		debugger
		this.$el.html(content);
		return this;
	}
});