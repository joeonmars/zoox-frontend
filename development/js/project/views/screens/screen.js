goog.provide( 'zoox.views.screens.Screen' );

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'goog.net.ImageLoader' );
goog.require( 'soy' );
goog.require( 'zoox.controllers.NavigationController' );

/** @constructor */
zoox.views.screens.Screen = function () {

	goog.base( this );

	//this.setParentEventTarget( gravity.controllers.PageController.getInstance() );

	this._data = null;
	this._isCreated = false;

	this.domElement = null;
};
goog.inherits(zoox.views.screens.Screen, goog.events.EventTarget);


zoox.views.screens.Screen.prototype.getData = function (dataKey) {
	return this._data[dataKey];
};


zoox.views.screens.Screen.prototype.create = function (data, template) {
	this._isCreated = true;

	var placeholderDom = goog.dom.createDom('div');
	soy.renderElement(placeholderDom, template, data);

	// parse dom elements
	this.domElement = goog.dom.getFirstElementChild(placeholderDom);

	this.onResize();console.log(this.domElement)
};


zoox.views.screens.Screen.prototype.onNavigate = function (e) {

};


zoox.views.screens.Screen.prototype.onResize = function (e) {

};