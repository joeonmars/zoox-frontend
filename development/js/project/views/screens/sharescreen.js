goog.provide( 'zoox.views.screens.ShareScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.sharescreen' );

/** @constructor */
zoox.views.screens.ShareScreen = function () {
	goog.base( this );

};
goog.inherits(zoox.views.screens.ShareScreen, zoox.views.screens.Screen);


zoox.views.screens.ShareScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.sharescreen.ShareScreen;

	goog.base(this, 'create', data, template);
};