Locus.Views.CoverPiece = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'change', this.render)
	},
	
	template: JST['profile/cover_piece'],
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	}
});