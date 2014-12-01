Locus.Views.GalleryItem = Backbone.CompositeView.extend({

	template: JST['gallery/item'], 
	
	events: {
		'click .gallery-item' : 'showPiece',
		'click #overlay' : 'hidePiece'
	},
	
	render: function(){
		var content = this.template({ piece: this.model });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	showPiece: function(){
		var pieceShowView = new Locus.Views.PieceShow({ model: this.model });
		this.addSubview("#piece-show", pieceShowView);
		$("#piece-show").show();
	},
	
	hidePiece: function(event){
		event.preventDefault();
		var $pieceShow = $('#piece-show');
		var $target = $(event.currentTarget);
		if(!$pieceShow.is($target)){
			$pieceShow.hide();
		}
	}
	
});