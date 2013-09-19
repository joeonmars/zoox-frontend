goog.provide( 'zoox.controllers.ScreenController' );

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.events' );
goog.require( 'goog.object' );
goog.require( 'zoox.controllers.WindowController' );
goog.require('zoox.views.screens.AboutScreen');
goog.require('zoox.views.screens.SyncScreen');
goog.require('zoox.views.screens.ShareScreen');
goog.require('zoox.views.screens.HelpScreen');
goog.require('zoox.views.screens.HomeScreen');
goog.require('zoox.utils');

/**
 * @constructor
 */
zoox.controllers.ScreenController = function(){
  goog.base(this);

  this._screenViewDom = goog.dom.getElement('screen-view');

  this.screens = {};
  this.currentScreen = null;
};
goog.inherits(zoox.controllers.ScreenController, goog.events.EventTarget);
goog.addSingletonGetter(zoox.controllers.ScreenController);


zoox.controllers.ScreenController.prototype.init = function(){
	var syncScreen = new zoox.views.screens.SyncScreen();
	syncScreen.create();
	this.screens[syncScreen.id] = syncScreen;

	var homeScreen = new zoox.views.screens.HomeScreen();
	homeScreen.create();
	this.screens[homeScreen.id] = homeScreen;

	var aboutScreen = new zoox.views.screens.AboutScreen();
	aboutScreen.create();
	this.screens[aboutScreen.id] = aboutScreen;

	var shareScreen = new zoox.views.screens.ShareScreen();
	shareScreen.create();
	this.screens[shareScreen.id] = shareScreen;

	var helpScreen = new zoox.views.screens.HelpScreen();
	helpScreen.create();
	this.screens[helpScreen.id] = helpScreen;

	console.log(this.screens);

	var navigationController = zoox.controllers.NavigationController.getInstance();
	navigationController.addDispatcher(this);
	goog.events.listen(this, goog.history.EventType.NAVIGATE, this.onNavigate, false, this);
};


zoox.controllers.ScreenController.prototype.getScreenById = function(id){
	var screen = goog.object.findValue(this.screens, function(screen) {
		return (screen.id === id);
	});

	return screen;
};


zoox.controllers.ScreenController.prototype.getScreenByClass = function(screenClass){
	var screen = goog.object.findValue(this.screens, function(screen) {
		return (screen instanceof screenClass === true);
	});

	return screen;
};


zoox.controllers.ScreenController.prototype.getScreenId = function(screenClass){
	var screen = this.getScreenByClass(screenClass);

	return screen.id;
};


zoox.controllers.ScreenController.prototype.toScreen = function(targetScreen){
	if(!this.currentScreen) this.currentScreen = targetScreen;

	var screenGroups = targetScreen.getScreenGroup();

	// locate screen before tweening
	goog.array.forEach(screenGroups, function(screenGroup) {
		//screenGroup.parentNode.scrollLeft = zoox.utils.getRelativeOffsetLeft( screenGroup );
	}, this);

	// tween to screen
	var outerMostScreenGroup = goog.array.peek( screenGroups );
	var scrollX = zoox.utils.getRelativeOffsetLeft( outerMostScreenGroup );

	TweenMax.to(outerMostScreenGroup.parentNode, .4, {
		scrollTo: {x: scrollX},
		ease: Quad.easeInOut
	});
};


zoox.controllers.ScreenController.prototype.onNavigate = function (e) {
	if(e.token.length <= 0) return;

	var targetScreen = this.getScreenById( e.token[0] );
	this.toScreen( targetScreen );
};