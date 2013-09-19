goog.provide( 'zoox.views.screens.HelpScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.helpscreen' );

/** @constructor */
zoox.views.screens.HelpScreen = function () {
	goog.base( this );

};
goog.inherits(zoox.views.screens.HelpScreen, zoox.views.screens.Screen);


zoox.views.screens.HelpScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.helpscreen.HelpScreen;

	goog.base(this, 'create', data, template);
};