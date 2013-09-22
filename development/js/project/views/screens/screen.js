goog.provide( 'zoox.views.screens.Screen' );

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'goog.style' );
goog.require( 'goog.net.ImageLoader' );
goog.require( 'goog.events.EventHandler' );
goog.require( 'soy' );


/** @constructor */
zoox.views.screens.Screen = function () {

	goog.base( this );

	this.setParentEventTarget( zoox.controllers.ScreenController.getInstance() );

	this._data = null;
	this._isCreated = false;
	this._eventHandler = null;

	this.domElement = null;
	this.id = null;
};
goog.inherits(zoox.views.screens.Screen, goog.events.EventTarget);


zoox.views.screens.Screen.prototype.getData = function (dataKey) {
	return this._data[dataKey];
};


zoox.views.screens.Screen.prototype.getOffsetLeft = function () {
	var parentOffsetLeft = this.domElement.parentNode.parentNode.scrollLeft;
	var offsetLeft = goog.style.getRelativePosition(this.domElement.parentNode, this.domElement.parentNode.parentNode).x;
	return offsetLeft + parentOffsetLeft;
};


zoox.views.screens.Screen.prototype.getScreenGroup = function () {
	var screenGroups = [];

	var dom = this.domElement;

	while(dom.parentNode.parentNode.className === 'screenGroup') {
		screenGroups.push(dom.parentNode.parentNode);
		dom = dom.parentNode;	
	}

	return screenGroups;
};


zoox.views.screens.Screen.prototype.create = function (data, template) {
	this._isCreated = true;

	var placeholderDom = goog.dom.createDom('div');
	soy.renderElement(placeholderDom, template, data);

	// parse dom elements
	this.domElement = goog.dom.getFirstElementChild(placeholderDom);
	this.id = this.domElement.id;

	// add dom to its holder
	var screenHolderDom = goog.dom.query('div[data-holder-id=' + this.id + ']')[0];
	goog.dom.appendChild(screenHolderDom, this.domElement);

	// add event listeners
	this._eventHandler = new goog.events.EventHandler(this);
	var buttons = goog.dom.query('.button', this.domElement);
	goog.array.forEach(buttons, function(button) {
		FastClick.attach(button);
		this._eventHandler.listen(button, 'click', this.onClickButton, false, this);
	}, this);

	this._eventHandler.listen(this, zoox.events.EventType.SCREEN_TRANSITION_START, this.onScreenTransitionStart, false, this);
	this._eventHandler.listen(this, zoox.events.EventType.SCREEN_TRANSITION_COMPLETE, this.onScreenTransitionComplete, false, this);
};


zoox.views.screens.Screen.prototype.handleOnScreenTransitionStart = function () {
	console.log('handle transition start', this.id);
};


zoox.views.screens.Screen.prototype.handleOnScreenTransitionComplete = function () {
	console.log('handle transition complete', this.id);
};


zoox.views.screens.Screen.prototype.onClickButton = function (e) {
	var token = e.currentTarget.getAttribute('data-token');
	if(token) {
		zoox.main.controllers.navigationController.setToken(token);
	}
};


zoox.views.screens.Screen.prototype.onScreenTransitionStart = function (e) {
	if(this === e.currentScreen) this.handleOnScreenTransitionStart();
};


zoox.views.screens.Screen.prototype.onScreenTransitionComplete = function (e) {
	if(this === e.currentScreen) this.handleOnScreenTransitionComplete();
};


zoox.views.screens.Screen.prototype.onResize = function (e) {

};