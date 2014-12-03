Locus.Models.Profile = Backbone.Model.extend({
	rootUrl: 'api/profiles',
	
	parse: function(payload){
		if(payload.profile.user){
			this.user = payload.profile.user;
			delete payload.profile.user;
		}
		return payload.profile;
	}
});