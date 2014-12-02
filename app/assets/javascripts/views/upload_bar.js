Locus.Views.UploadBar = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.user = options.user;
		filepicker.setKey("Aej0E2YFRSEuECMt5FTXjz");
		this.model = new Locus.Models.Piece();
	},
	
	template: JST["main_space/upload_bar"],
	
	events: {
		'click #image-button' : 'uploadMedia',
		'click #audio-button' : 'uploadMedia',
		'click #video-button' : 'uploadMedia',
		'submit form' : 'submitPieceForm'
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	},
	
	uploadMedia: function(event) {
		var view = this;
		var uploadType = event.currentTarget.id;
		var picker_options = this.pickerOptions(uploadType);
		filepicker.pick(picker_options, function(blob) {
			var newMedia = view.newMedia.set({ url: blob.url });
			view.model.set({ media: newMedia, 
				media_type: view.mediaType, 
				image: {url: blob.url},
				audio: {url: blob.url},
			 	video: {url: blob.url}
			});
			view.showPieceForm(view.model, newMedia);
		});
		
	},
	
	
	pickerOptions: function(uploadType){
		if(uploadType === "image-button"){
			this.mediaType = 'image';
			this.newMedia = new Locus.Models.Image();
			return {mimetype: 'image/*', service: 'COMPUTER'}
		} else if(uploadType === "audio-button"){
			this.mediaType = 'audio'
			this.newMedia = new Locus.Models.Audio();
			return { mimetype: 'audio/*', service: 'COMPUTER'}
		} else {
			this.mediaType = 'video'
			this.newMedia = new Locus.Models.Video();
			return {mimetype: 'video/*', service: 'COMPUTER'}
		}
	},

	
	showPieceForm: function(piece, newMedia){
		var pieceFormView = new Locus.Views.PieceForm({ 
			model: piece, 
			collection: this.collection, 
			media: newMedia 
		});
		
		this.$('#piece-form').empty();
		this.addSubview("#piece-form", pieceFormView);
		$("#piece-form").show();
	},

	submitPieceForm: function(event){
		event.preventDefault();
		this.$('#piece-form').empty();
		this.$('#piece-form').hide();
	}
});

