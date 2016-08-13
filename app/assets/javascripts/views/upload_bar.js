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
		'click #image-button' : 'uploadMedia',
		'click #audio-button' : 'uploadMedia',
		'click #video-button' : 'uploadMedia',
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
        this.addFileUpload();
		return this;
	},

    addFileUpload: function(){
        $('#fileupload').fileupload({
          autoUpload: true,
          uploadTemplate: function (o) {
                var rows = $();
                $.each(o.files, function (index, file) {
                  console.log(file);
                    var row = $('<li class="span3">' +
                        '<div class="thumbnail">' +
                          '<div class="preview" style="text-align: center;"></div>' +
                          '<div class="progress progress-success progress-striped active">' +
                            '<div class="bar" style="width:0%;"></div>' +
                          '</div>' +
                        '</div>');
                    rows = rows.add(row);
                });
                return rows;
            },

	    }); 

    },
	
	uploadMedia: function(event) {
		var view = this;
		this.tags.fetch();
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

