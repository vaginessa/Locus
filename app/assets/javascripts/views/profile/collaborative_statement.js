Locus.Views.CollaborativeStatement = Backbone.View.extend({
	template: JST['profile/collaborative_statement'],
	
	render: function(){
		var content = this.template({statement: this.model});
		this.$el.html(content);
		return this;
	}
});