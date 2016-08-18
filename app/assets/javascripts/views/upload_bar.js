Locus.Views.UploadBar = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.user = options.user;
		this.model = new Locus.Models.Piece();
		this.tags = new Locus.Collections.Tags();
          // Initialize the jQuery File Upload widget:
    },
	
	template: JST["main_space/upload_bar"],
	
	events: {
		'click #random-tab' : 'toggleButton',
		'click #home-tab' : 'toggleButton',
        'click #start-upload': 'uploadMedia'
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	},

	uploadMedia: function(event) {
        debugger

		
	},
	
	
	pickerOptions: function(uploadType){
	},

	
	showPieceForm: function(piece, newMedia){
		pieceFormView = new Locus.Views.PieceForm({ 
			model: piece, 
			collection: this.collection, 
			media: newMedia,
			tags: this.tags
		});
		
		this.addSubview("#piece-form", pieceFormView);
		pieceFormView.show();
	},
	
	toggleButton: function(){
		this.$('#random-tab').toggle();
		this.$('#home-tab').toggle();
	}
});

