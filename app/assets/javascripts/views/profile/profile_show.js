Locus.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},
	
	template: JST['profile/show'],
	
	render: function(){
		if(this.model.user !== undefined){
			var content = this.template({ profile: this.model, user: this.model.user});
			this.$el.html(content);
			this.attachSubviews();
		} 
		return this;
	}
});