goog.provide( 'zoox.views.screens.Screen' );

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'goog.style' );
goog.require( 'goog.net.ImageLoader' );
goog.require( 'soy' );


/** @constructor */
zoox.views.screens.Screen = function () {

	goog.base( this );

	this.setParentEventTarget( zoox.controllers.ScreenController.getInstance() );

	this._data = null;
	this._isCreated = false;

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
};


zoox.views.screens.Screen.prototype.onResize = function (e) {

};