Locus.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		"" : "mainSpace",
		"profiles/:id" : "userProfile"
	},
	
	mainSpace: function(){
		var pieces = Locus.pieces;
		pieces.fetch({
			data: {filter: 'feed'},
			success: function(){
				pieces.each(function(piece){
					piece.set({following: true});
				});
			}
		});
		
		var mainSpace = new Locus.Views.mainSpace({collection: pieces});
		this._swapView(mainSpace);
	},
	
	userProfile: function(id){
		var profile = new Locus.Models.Profile({id: id});
		profile.fetch({
			url: "api/profiles/" + id
		})
		
		var profileView = new Locus.Views.Profile({ model: profile });
		this._swapView(profileView);
		
		
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},

	
});