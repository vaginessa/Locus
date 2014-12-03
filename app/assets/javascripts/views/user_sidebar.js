Locus.Views.UserSidebar = Backbone.View.extend({
	initialize: function(options){
		this.user = options.user
	},
	
	events: {
	   'click #user-name' : 'navigateToOwnProfile',
	},
	
	template: JST["main_space/user_sidebar"],
	
	render: function(){
		var content = this.template({ user: this.user });
		this.$el.html(content);
		return this;
	},
	
	navigateToOwnProfile: function(){
		var url = '#/profiles/' + this.user['profile_id'];
		Backbone.history.navigate(url, {trigger:true})
	}
	
});