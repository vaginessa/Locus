Locus.Views.SearchBar = Backbone.View.extend({
	
	initialize: function(){
		this.autoCompleteTags();
	}, 
	
	events: {
		'keypress #search' : 'autoCompleteTags',
		'submit form' : 'searchByTags'
	},
	
	autoCompleteTags: function(){
		var tags = new Locus.Collections.Tags();
		tags.fetchandMakeTags();
	},
	
	searchByTags: function(event){
		debugger
		event.preventDefault();
		var $target = $(event.currentTarget)
			debugger
		this.tagParams = $target.serializeJSON();
		Backbone.history.navigate("search", {trigger: true})
	}
	
	
	
});