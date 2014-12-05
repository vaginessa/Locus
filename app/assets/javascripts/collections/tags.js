Locus.Collections.Tags = Backbone.Collection.extend({
	url: "api/tags",
	
	
	widgetify: function(){
		var tagArray = [];
		this.each(function(tag){
			tagArray.push(tag.get('name'))
		})
		return tagArray;
	},

})



