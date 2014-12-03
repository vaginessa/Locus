Locus.Views.ArtistStatementForm = Backbone.View.extend({
	template: JST['profile/artist_statement_form'],
	
	render: function(){
		var content = this.template({ statement: this.model });
		this.$el.html(content);
		return this;
	}
	
});