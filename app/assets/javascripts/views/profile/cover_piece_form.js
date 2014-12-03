Locus.View.CoverPieceForm = Backbone.View.extend({
	template: JST['profile/cover_piece_form'];
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})