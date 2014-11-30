Locus.Views.UploadBar = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.user = options.user
	},
	
	template: JST["main_space/upload_bar"],
	
	events: {
		"click #image-button" : 'uploadImage',
		'click #audio-button' : 'uploadAudio',
		'click #video-button' : 'uploadVideo',
		'submit form' : 'hideForm'
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	},
	
	uploadImage: function() {
		var view = this;
		var picker_options = {mimetype: 'image/*', service: 'COMPUTER', }
		filepicker.setKey("Aej0E2YFRSEuECMt5FTXjz")
		filepicker.pick(picker_options, function(blob) {
			var newPiece = new Locus.Models.Piece()
			newPiece.save({}, {
				url: "api/pieces",
				success: function() {
					view.saveImageToPiece(newPiece, blob.url);
				}
			})
		});
		
	},
	
	saveImageToPiece: function(piece, imgUrl){
		var view = this;
		var newImage = new Locus.Models.Image({
			url: imgUrl,
			piece_id: piece.id
		});
		
		newImage.save({ }, {
			url: "api/images",
			success: function(){
				view.showPieceForm(piece, newImage);
			}
		})
		
	},
	
	uploadAudio: function(){
		
	},
	
	uploadVideo: function(){
		
	},
	
	showPieceForm: function(piece, newImage){
		debugger
		var pieceFormView = new Locus.Views.PieceForm( { model: piece, collection: this.collection, media: newImage })
		this.addSubview("#piece-form", pieceFormView);
		$("#piece-form").show();
	},
	
	hideForm: function(){
		$('#piece-form').hide();
	}
	
	
});

