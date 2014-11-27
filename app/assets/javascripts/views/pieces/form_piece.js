Locus.Views.PieceForm = Backbone.View.extend({
	template: JST["piece/form"],
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}


	
});