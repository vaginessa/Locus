window.Locus = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  var $main = $('#main');
	  // var tags = Locus.Collections.Tags();
	  // tags.fetch({
	  // 		  url: 'api/tags',
	  // 		  success: function(){
	  // 		  	var tagArray = tags.widgetify();
	  // 			debugger
	  // 			$('#tags').tagit({
	  // 				availableTags: tagArray,
	  // 				showAutocompleteOnFocus: true,
	  // 				placeholdertext: 'search tags (e.g. projection)'
	  //
	  // 			})
	  // 		  }
	  // })
	  //
	  // new Locus.Views.SearchBar();
	  new Locus.Routers.Router({$rootEl: $main});
	  Backbone.history.start();
  }
};


