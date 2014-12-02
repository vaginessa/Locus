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
			success: function(){
				pieces = pieces.filterByFollow();
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