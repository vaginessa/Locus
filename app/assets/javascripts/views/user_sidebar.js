Locus.Views.UserSidebar = Backbone.View.extend({
	initialize: function(options){
		this.user = options.user
	},
	
	template: JST["main_space/user_sidebar"],
	
	render: function(){
		var content = this.template({ user: this.user });
		this.$el.html(content);
		return this;
	}
	
});