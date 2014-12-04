Locus.Views.GalleryItem = Backbone.CompositeView.extend({
	template: JST['gallery/item'], 
	
	initialize: function(){
		this.$('.follow-btn').hide();
		this.listenTo(this.model, 'change:following change:ownprofile', this.render);
	},
	
	events: {
		'click .set-cover-piece' : 'setAsCoverPiece',
		'click .piece-artist' : 'navigateToProfile',
		'click .gallery-item' : 'showPiece',
		'click #overlay' : 'hidePiece'
	},
	
	render: function(){
		var content = this.template({ piece: this.model, current_user: this.collection.current_user});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	showPiece: function(event){
		event.preventDefault();
		var pieceShowView = new Locus.Views.PieceShow({ model: this.model });
		this.addSubview("#piece-show", pieceShowView);
		pieceShowView.show();
	},
	
	hidePiece: function(event){
		event.preventDefault();
		var $pieceShow = $('#piece-show');
		var $target = $(event.currentTarget);
		if(!$pieceShow.is($target)){
			this.$('#piece-show').empty();
			this.$('#piece-show').popup('hide');
		}
	},

	
	navigateToProfile: function(event){
		event.stopImmediatePropagation();
		var url = '#/profiles/' + this.model.get('profile_id');
		Backbone.history.navigate(url, {trigger:true})
	},
	
	setAsCoverPiece: function(event){
		event.stopImmediatePropagation();
		this.model.get('profile').setCoverPiece(this.model);
	}
	
});