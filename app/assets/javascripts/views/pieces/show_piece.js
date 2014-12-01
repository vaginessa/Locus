Locus.Views.PieceShow = Backbone.View.extend({

	template: JST["piece/show"],
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	}
	
});