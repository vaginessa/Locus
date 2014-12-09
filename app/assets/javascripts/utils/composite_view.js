Backbone.CompositeView = Backbone.View.extend({
	
	addSubview: function (selector, subview, options) {
		if(options === undefined) { options = {} }
		
		if(options.prepend){ 
		  this.subviews(selector).unshift(subview);
		} else {
  		  this.subviews(selector).push(subview);
	    }
		this.attachSubview(selector, subview.render(), options);
	},
	
	attachSubview: function(selector, subview, options) {
		if(options === undefined) { options = {} }
		
		if(options.prepend){
			this.$(selector).prepend(subview.$el);
		} else {
			this.$(selector).append(subview.$el);
		}
		
		subview.delegateEvents();
		if(subview.attachSubviews){
			subview.attachSubviews();
		}
	},
	
	attachSubviews: function(options){
		var view = this;
		_(this.subviews()).each(function (subviews, selector) {
			view.$(selector).empty();
			_(subviews).each(function (subview){
				view.attachSubview(selector, subview, options);
			});
		});
	},
	
	removeSubview: function(selector, subview){
		subview.remove();
		var subviews = this.subviews(selector);
		subviews.splice(subviews.indexOf(subview), 1);
	},
	
	subviews: function(selector) {
		this._subviews = this._subviews || {};
		if(!selector) {
			return this._subviews;
		} else {
			this._subviews[selector] = this._subviews[selector] || [];
			return this._subviews[selector];
		}
	}
	
});