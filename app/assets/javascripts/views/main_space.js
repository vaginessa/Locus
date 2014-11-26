Locus.Views.mainSpace = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "sync", this.addUserSideBar);
		this.listenTo(this.collection, "sync", this.addGallery)
	}, 
	
	template: JST["main_space"],
	
	className: 'main-space',
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addUserSideBar: function() {
		var userSideBar = new Locus.Views.UserSidebar({ user: this.collection.current_user })
		this.addSubview("#user-sidebar", userSideBar)
	},
	
	addGallery: function() {
		var gallery = new Locus.Views.Gallery({ collection: this.collection });
		this.addSubview("#gallery", gallery);
	}
})