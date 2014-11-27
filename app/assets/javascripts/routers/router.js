Locus.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	
	routes: {
		"" : "mainSpace",
		"api/pieces/:id/edit" : "editPiece"
	},
	
	mainSpace: function(){
		Locus.pieces.fetch();
		var mainSpace = new Locus.Views.mainSpace( { collection: Locus.pieces } );
		this._swapView(mainSpace);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
	
	editPiece: function(id){
		var pieceToEdit = this.pieces.getOrFetch(id);
		var mainSpace = new Locus.Views.mainSpace( );
	}
	
});