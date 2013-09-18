goog.provide( 'zoox.views.screens.AboutScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.aboutscreen' );

/** @constructor */
zoox.views.screens.AboutScreen = function () {
	goog.base( this );

};
goog.inherits(zoox.views.screens.AboutScreen, zoox.views.screens.Screen);


zoox.views.screens.AboutScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.aboutscreen.AboutScreen;

	goog.base(this, 'create', data, template);
};