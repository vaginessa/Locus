Locus.Views.ArtistStatement = Backbone.View.extend({
	template: JST['profile/artist_statement'],
	
	render: function(){
		var content = this.template({statement: this.model});
		this.$el.html(content);
		return this;
	}
});

