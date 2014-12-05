Locus.Views.PieceShow = Backbone.View.extend({

	template: JST["piece/show"],
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	},
	
	events: {
		'click .piece-artist' : 'toProfile'
	},
	
	show: function(){
		this.$('#gallery-item-show').popup('show');
	},
	
	toProfile: function(){
		debugger
		var url = '#/profiles/' + this.model.get('profile_id');
		Backbone.history.navigate(url, {trigger:true})
	}
	
});