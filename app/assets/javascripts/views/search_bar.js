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
		
		
		
		$('#submit-search').on('click', this.searchByTags.bind(this))
	}, 
	
	searchByTags: function(event){
		event.preventDefault()
		debugger
		this.extractTags();
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
		 this.searchTags = $('#search-tags').tagit('assignedTags');
	 }
	
	
	
});