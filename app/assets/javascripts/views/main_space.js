Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
	}, 
	
	template: JST["main_space"],
	
	className: 'main-space',
	
	render: function(){
		var content = this.template({ posts: this.collection, user: "Minu" });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})