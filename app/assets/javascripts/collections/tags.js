Locus.Collections.Tags = Backbone.Collection.extend({
	url: "api/tags",
	
	
	widgetify: function(){
		var tagArray = [];
		this.each(function(tag){
			tagArray.push(tag.get('name'))
		})
		return tagArray;
	},
	
	
	fetchandMakeTags: function(){
		debugger
		var tags = this;
		var tagArray = [];
		this.fetch({
			url: 'api/tags',
			success: function(){
				debugger
				tagArray = tags.widgetify();
				
				$('#tags').tagit({
					availableTags: tagArray,
					autocomplete: 'on',
					showAutocompleteOnFocus: true,
					
					placeholdertext: 'search tags (e.g. projection)'
				})
			}
		});
	}
	
})



