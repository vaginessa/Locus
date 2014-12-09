Locus.Views.ArtistStatementForm = Backbone.View.extend({
	
	initialize: function(options){
		if(!options){ options = {}; }
		this.statement = options.text
	},
	
	template: JST['profile/artist_statement_form'],
	
	render: function(){
		var content = this.template({ statement: this.statement });
		this.$el.html(content);
		return this;
	}
	
});