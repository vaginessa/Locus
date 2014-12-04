Locus.Views.SearchBar = Backbone.View.extend({
	
	initialize: function(){
		this.autoCompleteTags();
	}, 
	
	events: {
		'keypress #search' : 'autoCompleteTags'
	},
	
	autoCompleteTags: function(){
		var tags = new Locus.Collections.Tags();
		tags.fetchandMakeTags();
	}
	
	
	
});