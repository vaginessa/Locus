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
		'submit form' : 'submitPieceForm'
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
					view.collection.add(newPiece, {silent: true})
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

		newAudio.save({ }, {
			url: "api/audio",
			success: function(){
				view.showPieceForm(piece, newAudio);
			}
		})
		
	},
	

	
	uploadVideo: function(){
		var view = this;
		var picker_options = { mimetype: 'video/*', service: 'COMPUTER' }
		
		filepicker.pick(picker_options, function(blob) {
			var newPiece = new Locus.Models.Piece({ media_type: "video"})
			newPiece.save({}, {
				url: "api/pieces",
				success: function() {
					view.collection.add(newPiece)
					view.saveVideo(newPiece, blob.url);
				}
			})
		});
		
	},
	
	saveVideo: function(piece, imgUrl){
		var view = this;
		var newVideo = new Locus.Models.Video({
			url: imgUrl,
			piece_id: piece.id
		});

		newVideo.save({ }, {
			url: "api/videos",
			success: function(){
				view.showPieceForm(piece, newVideo);
			}
		})
		
	},
	
	showPieceForm: function(piece, newMedia){
		var pieceFormView = new Locus.Views.PieceForm( { model: piece, collection: this.collection, media: newMedia })
		this.addSubview("#piece-form", pieceFormView);
		$('#piece-form').data('piece_id', piece.id);
		$("#piece-form").show();
	},
	
	submitPieceForm: function(event){
		event.preventDefault();
		
		var view = this;
		var piece = this.collection.get($('#piece-form').data('piece_id'));
		var attrs = $(event.currentTarget).serializeJSON();
		
		piece.save(attrs, { 
			patch: true,
			success: function(){
				view.collection.add(piece, {merge: true})
				alert('piece successfully updated')
			}
		});
		
		$('#piece-form').hide();
	}
});

