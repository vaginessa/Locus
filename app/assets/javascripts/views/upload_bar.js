Locus.Views.UploadBar = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.user = options.user;
		filepicker.setKey("Aej0E2YFRSEuECMt5FTXjz");
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
		var picker_options = { mimetype: 'image/*', service: 'COMPUTER' }
		
		filepicker.pick(picker_options, function(blob) {
			var newPiece = new Locus.Models.Piece({ media_type: "image"})
			newPiece.save({}, {
				url: "api/pieces",
				success: function() {
					view.saveImage(newPiece, blob.url);
				}
			})
		});
		
	},
	
	saveImage: function(piece, imgUrl){
		var view = this;
		var newImage = new Locus.Models.Image({
			url: imgUrl,
			piece_id: piece.id
		});
		debugger
		newImage.save({ }, {
			url: "api/images",
			success: function(){
				view.showPieceForm(piece, newImage);
			}
		})
		
	},
	
	uploadAudio: function() {
		var view = this;
		var picker_options = { mimetype: 'audio/*', service: 'COMPUTER' }
		
		filepicker.pick(picker_options, function(blob) {
			var newPiece = new Locus.Models.Piece({ media_type: "audio"})
			newPiece.save({}, {
				url: "api/pieces",
				success: function() {
					view.saveAudio(newPiece, blob.url);
				}
			})
		});
		
	},
	
	saveAudio: function(piece, imgUrl){
		var view = this;
		var newAudio = new Locus.Models.Audio({
			url: imgUrl,
			piece_id: piece.id
		});
		debugger
		newAudio.save({ }, {
			url: "api/audio",
			success: function(){
				view.showPieceForm(piece, newAudio);
			}
		})
		
	},
	

	
	uploadVideo: function(){
		
	},
	
	showPieceForm: function(piece, newMedia){
		var pieceFormView = new Locus.Views.PieceForm( { model: piece, collection: this.collection, media: newMedia })
		this.addSubview("#piece-form", pieceFormView);
		$("#piece-form").show();
	},
	
	hideForm: function(){
		$('#piece-form').hide();
	}
	
	
});

