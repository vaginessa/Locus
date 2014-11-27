Locus.Views.UploadBar = Backbone.View.extend({
	
	initialize: function(options){
		debugger 
		this.user = options.user
	},
	
	template: JST["main_space/upload_bar"],
	
	events: {
		"click #image-button" : 'upload'
	},
	
	render: function(){
		var content = this.template();
		this.$el.addClass("upbar").html(content);
		return this;
	},
	
	upload: function() {
		var view = this;
		var picker_options = {mimetype: 'image/*', service: 'COMPUTER', }
		filepicker.setKey("Aej0E2YFRSEuECMt5FTXjz")
		filepicker.pick(picker_options, function(blob) {
			var newImage = new Locus.Models.Piece({
				filepicker_url: blob.url
			});
			
			newImage.save({ }, {
				url: "api/pieces",
				success: function(){
					
				}
			})
		});
	}, 
	
});

	// id="image-input"
	// type="filepicker"
	//     name="image[url]"
	//     data-fp-button-text="Image"
	// data-fp-apikey="Aej0E2YFRSEuECMt5FTXjz"
	// data-fp-mimetypes="image/*"
	// data-fp-container="modal"
	// data-fp-services="COMPUTER"
	// onchange="alert('file picker')"