Locus.Collections.Followees = Backbone.Collection.extend({
	url: "api/follow_units"
	
});

Locus.followees = new Locus.Collections.Followees;