window.Locus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  new Locus.Routers.Router({ $rootEl: $("#main") });
	  Backbone.history.start();
  }
};

