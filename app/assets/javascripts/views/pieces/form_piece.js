Locus.Views.PieceForm = Backbone.View.extend({
	initialize: function(options){
		this.media = options.media
		this.tags = options.tags
		this.listenTo(this.tags, 'sync', this.render);
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.model, "update", this.remove)
	},
	
	events: {
		"submit form" : "postPiece",
	},
	
	template: JST["piece/form"],
	
	render: function(){
		var content = this.template({ piece: this.model, media: this.media });
		this.$el.html(content);
		return this;
	},
	
	show: function(){
		this.makeTagit();
		this.$('#p-piece-form').popup('show');
		$("#p-piece-form").find("form").on("submit", this.postPiece.bind(this));
	},
	
	postPiece: function(event){
		event.preventDefault();
		event.stopImmediatePropagation();

		this.extractTags();
		var view = this;
		var target = $(event.currentTarget)
		var attrs = target.serializeJSON();
		var piece = this.model;
		piece.set(attrs['piece']);
		piece.save({tags: this.tagList}, {
			url: 'api/pieces',
			success: function(){
				$("#p-piece-form").popup('hide')
				view.collection.unshift(piece, { silent: true });
				view.collection.trigger('unshift', piece);
				view.remove();
				Backbone.history.navigate("/", { trigger: true } );
			}
		});
	 },
	 
	 makeTagit: function(){
	 	$('#piece-form-tags').tagit({
			fieldName: 'tags',
	 		availableTags: this.tags.widgetify(),
			placeholderText: 'tags'
			
	 	})
		
		$('#piece-form-tags').css("z-index", '100000')
	 },
	 
	 extractTags: function(){
		 this.tagList = $('#piece-form-tags').tagit('assignedTags');
		 $('#piece-form-tags').tagit('removeAll');
	 }
});