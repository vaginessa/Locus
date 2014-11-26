Locus.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl
// 		this.currentUser = options.currentUser;
	},
	
	
	routes: {
		"" : "mainSpace"
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
	
	
	
});