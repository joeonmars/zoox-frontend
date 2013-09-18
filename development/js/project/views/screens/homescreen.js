goog.provide( 'zoox.views.screens.HomeScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.homescreen' );

/** @constructor */
zoox.views.screens.HomeScreen = function () {
	goog.base( this );

};
goog.inherits(zoox.views.screens.HomeScreen, zoox.views.screens.Screen);


zoox.views.screens.HomeScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.homescreen.HomeScreen;

	goog.base(this, 'create', data, template);
};