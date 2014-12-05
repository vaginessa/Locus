Locus.Views.PieceShow = Backbone.View.extend({


	template: JST["piece/show"],
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		return this;
	},

	show: function(){
		this.$('#gallery-item-show').popup('show');
		$('.s-piece-artist').on('click', this.toProfile.bind(this));
	},
	
	toProfile: function(){
		var url = '#/profiles/' + this.model.get('profile_id');
		$('#gallery-item-show').popup('hide');
		Backbone.history.navigate(url, {trigger:true});
	}
	
});