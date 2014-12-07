Locus.Views.SearchBar = Backbone.View.extend({
	
	initialize: function(){
		if(!this.searchTags){
			this.searchTags = []
		}
		this.tags = new Locus.Collections.Tags();
		var view = this;
		this.tags.fetch({
			success: function(){
				view.makeTagit();
			}
		});
		
		$('#search-bar').on('submit', this.searchByTags.bind(this))
	}, 
	
	
	searchByTags: function(event){
		event.preventDefault()
		this.searchTags = this.extractTags();
		Backbone.history.navigate("search", {trigger: true})
	},
	
	 makeTagit: function(){
	 	$('#search-tags').tagit({
			fieldName: 'tags',
	 		availableTags: this.tags.widgetify(),
			placeholderText: 'search by tag'
	 	})
	 },
	 
	 extractTags: function(){
		 this.tagList = $('#search-tags').tagit('assignedTags');
	 }
	
	
	
});