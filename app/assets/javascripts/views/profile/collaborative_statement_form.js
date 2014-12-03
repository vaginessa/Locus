Locus.Views.CollaborativeStatementForm = Backbone.View.extend({
	template: ['profile/collaborative_statement_form'],
	
	render: function(){
		var content = this.template({statement: this.model});
		this.$el.html(content);
		return this;
	}
});