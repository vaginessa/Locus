Locus.Collections.Tags = Backbone.Collection.extend({
	url: "api/tags",
	
	widgetify: function(){
		return _.pluck(this, 'name');
	}
})