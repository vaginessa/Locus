Locus.Views.UploadBar = Backbone.View.extend({
	
	template: JST["main_space/upload_bar"],
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	}
	
});