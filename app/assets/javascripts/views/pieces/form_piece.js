Locus.Views.PieceForm = Backbone.View.extend({
	template: JST["piece/form"],
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	},
	

	
	submit: function(event){
		event.preventDefault();
		var attrs = $(event.currentTarget).serializeJSON();
		var newPost = new Locus.Models.Piece(params['post']);
		
		newPost.save({ user_id: this.collection.current_user }, {
			url: "api/pieces",
			success: function (resp) {
				alert("image saved")
			}
		});
	}
	
});