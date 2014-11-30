Locus.Models.Image = Backbone.Model.extend({

	rootUrl: "api/images",
	url: function() {
		return this.rootUrl + "/" + this.id
	}
});