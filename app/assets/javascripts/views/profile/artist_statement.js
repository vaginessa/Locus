Locus.Views.ArtistStatement = Backbone.View.extend({
	
	initialize: function(options){
		this.text = options.text
	},
	
	template: JST['profile/artist_statement'],
	
	render: function(){
		var content = this.template({statement: this.text});
		this.$el.html(content);
		return this;
	}
});

