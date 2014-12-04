Locus.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
		this.searchBar = options.searchBar;
	},
	
	routes: {
		"" : "mainSpace",
		"profiles/:id" : "userProfile",
		"search" : 'searchGallery'
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
	
	searchGallery: function(){
		// var tags = {}
		// var bool = false
		// var searchPieces = new Locus.Collections.Pieces();
		// if(this.searchBar.tagParams[:tags]){
		// 	tags = this.searchBar.tagParams[:tags]
		// 	bool = true
		// }
		//
		// searchPieces.fetch({
		// 	data: { filter: 'search', tagged: bool, tags: tags },
		// 	url: 'api/pieces',
		// 	success: function(){
		// 		alert("ok")
		// 	}
		// })
		//
		// var searchView = new Locus.Views.Search({collection: searchPieces});
		// this._swapView(searchView);
	},
	
	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},

	
});