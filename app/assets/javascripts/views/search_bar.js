Locus.Views.SearchBar = Backbone.View.extend({
	
	initialize: function(){
		$('#search-bar').on('submit', this.searchByTags.bind(this))
		// this.tags = new Locus.Collections.Tags();
	// 	this.tags.fetch({
	// 		url: 'api/tags'
	// 	});
	// 	this.listenTo(this.tags, "sync", this.autoCompleteTags)
	}, 
	
	events: {
		// 'click #search-bar' : 'autoCompleteTags'
	},
	
	autoCompleteTags: function(){
		// var tags = this.tags.widgetify();
		
		// $('#tags').autocomplete({
	// 		source: tags
	// 	})
	},
	
	searchByTags: function(event){
		event.preventDefault()
		var $target = $(event.currentTarget)
		this.tagParams = $target.serializeJSON();
		debugger
		$('#search-bar').find('#tags').val("");
		$('#search-bar').find('#tags').blur();
		Backbone.history.navigate("search", {trigger: true})
	}
	
	
	
});