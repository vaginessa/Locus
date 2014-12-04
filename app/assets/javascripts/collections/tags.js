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
		var tags = this;
		var tagArray = [];
		this.fetch({
			url: 'api/tags',
			success: function(){
				tagArray = tags.widgetify();
				
				$('#tags').tagit({
					fieldName: 'tag[name]',
					availableTags: tagArray,
					singleField: true,
					showAutocompleteOnFocus: true,
					placeholderText: 'search tags (e.g. projection)'
				})
			}
		});
	}
	
})



