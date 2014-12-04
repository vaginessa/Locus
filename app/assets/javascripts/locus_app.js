window.Locus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  var $main = $('#main');
	  new Locus.Views.SearchBar();
	  new Locus.Routers.Router({$rootEl: $main});
	  Backbone.history.start();
  }
};


