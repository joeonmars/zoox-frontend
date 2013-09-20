goog.provide( 'zoox.views.screens.SyncScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.syncscreen' );

/** @constructor */
zoox.views.screens.SyncScreen = function () {
	goog.base( this );

};
goog.inherits(zoox.views.screens.SyncScreen, zoox.views.screens.Screen);


zoox.views.screens.SyncScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.syncscreen.SyncScreen;

	goog.base(this, 'create', data, template);
};