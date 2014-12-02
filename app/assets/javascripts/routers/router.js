Locus.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		"" : "mainSpace",
	},
	
	mainSpace: function(){
		var pieces = Locus.pieces;
		pieces.fetch({
			data: {filter: 'feed'},
			success: function(){
				console.log("in success callback")
				pieces.each(function(piece){
					piece.set({following: true}, {silent: true});
					debugger
				});
			}
			
		});
		var mainSpace = new Locus.Views.mainSpace({collection: pieces});
		this._swapView(mainSpace);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},

	
});