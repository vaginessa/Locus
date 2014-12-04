Locus.Views.SearchBar = Backbone.View.extend({
	
	initialize: function(router){
		this.router = router
		this.autoCompleteTags();
	}, 
	
	events: {
		'keypress #search' : 'autoCompleteTags',
		'submit search' : 'searchByTags'
	},
	
	autoCompleteTags: function(){
		var tags = new Locus.Collections.Tags();
		tags.fetchandMakeTags();
	},
	
	searchByTags: function(event){
		event.preventDefault();
		var $target = $(event.currentTarget)
		this.tagParams = $target.serializeJSON();
		Backbone.history.navigate("search", {trigger: true})
	}
	
	
	
});