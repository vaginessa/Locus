Locus.Views.UploadBar = Backbone.CompositeView.extend({
	
	initialize: function(options){
		this.user = options.user;
		filepicker.setKey(fp_key);
		this.model = new Locus.Models.Piece();
		this.tags = new Locus.Collections.Tags();
	},
	
	template: JST["main_space/upload_bar"],
	
	events: {
		'click #random-tab' : 'toggleButton',
		'click #home-tab' : 'toggleButton',
		'click #image-button' : 'uploadMedia',
		'click #audio-button' : 'uploadMedia',
		'click #video-button' : 'uploadMedia',
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	},
	
	uploadMedia: function(event) {
		var view = this;
		this.tags.fetch()
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

