goog.provide('zoox.controllers.WindowController');

goog.require('goog.array');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events.EventType');
goog.require('goog.dom.query');
goog.require('goog.userAgent');

zoox.controllers.WindowController = function() {
	goog.base(this);

	this._dispatchers = [];

	this._viewportSizeMonitor = new goog.dom.ViewportSizeMonitor();
	this._window = goog.dom.getWindow();

  // listen for window events
  goog.events.listen(this._viewportSizeMonitor, goog.events.EventType.RESIZE, this.onResize, false, this);
  goog.events.listen(this._window, 'orientationchange', this.onOrientationChange, false, this);

  goog.events.listen(document, 'touchmove', function(e) {
  	e.preventDefault();
  });
};
goog.inherits(zoox.controllers.WindowController, goog.events.EventTarget);
goog.addSingletonGetter(zoox.controllers.WindowController);


zoox.controllers.WindowController.prototype.addDispatcher = function(dispatcher) {
	if(!goog.array.contains(this._dispatchers, dispatcher)) {
		this._dispatchers.push(dispatcher);

		var ev = this.getResizeEvent();
		dispatcher.dispatchEvent(ev);
	}
};


zoox.controllers.WindowController.prototype.removeDispatcher = function(dispatcher) {
	if(goog.array.contains(this._dispatchers, dispatcher)) {
		goog.array.remove(this._dispatchers, dispatcher);
	}
};


zoox.controllers.WindowController.prototype.getWindowSize = function() {
	return (this._viewportSizeMonitor.getSize() || goog.dom.getViewportSize());
};


zoox.controllers.WindowController.prototype.getResizeEvent = function() {
	var ev = {
		type: goog.events.EventType.RESIZE,
		windowSize: this.getWindowSize()
	};

	return ev;
};


zoox.controllers.WindowController.prototype.onResize = function(e) {
	var ev = this.getResizeEvent();

	goog.array.forEach(this._dispatchers, function(dispatcher) {
		dispatcher.dispatchEvent(ev);
	});
};


zoox.controllers.WindowController.prototype.onOrientationChange = function(e) {
	
};