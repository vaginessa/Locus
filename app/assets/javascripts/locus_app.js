window.Locus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  var $main = $('#main');
	  var searchBar = new Locus.Views.SearchBar();
	  new Locus.Routers.Router({$rootEl: $main, searchBar: searchBar});
	  Backbone.history.start();
  }
};


