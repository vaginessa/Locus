Locus.Views.PieceForm = Backbone.View.extend({
	template: ["piece/new"],
	
	render: function(){
		
	},
	
	submit: function(event){
		event.preventDefault();
		var attrs = $(event.currentTarget).serializeJSON();
		this.model.set(attrs);
		
		success = function(){
			Backbone.history.navigate("", {trigger: true})
		},
		
		if(this.model.isNew()){
			this.collection.create(this.model, {
				url: "api/pieces",
				success: success
			});
		} else {
			this.model.save({}, {
				success: success
			});
		}
	}
	
});