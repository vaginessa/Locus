Locus.Views.PieceForm = Backbone.View.extend({
	initialize: function(options){
		this.media = options.media
		this.listenTo(this.model, "update", this.remove)
	},
	
	events: {
		"submit form" : "postPiece"
	},
	
	template: JST["piece/form"],
	
	render: function(){
		var content = this.template({ piece: this.model, media: this.media });
		this.$el.html(content);
		return this;
	},
	
	postPiece: function(event){
		event.preventDefault();
		var view = this;
		var target = $(event.currentTarget)
			
		var attrs = target.serializeJSON();
		
		var piece = this.model;
		piece.set(attrs['piece']);
		piece.save({},{
			url: piece.url(),
			success: function(){
				view.collection.set( piece,  {remove: false});
				view.remove();
				Backbone.history.navigate("/", { trigger: true } );
			}
		})
		
	}


	
});