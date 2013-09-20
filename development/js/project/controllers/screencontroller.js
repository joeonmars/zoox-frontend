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

	// locate screen before tweening
	var screenGroups = targetScreen.getScreenGroup();
	var outerMostScreenGroup;
	var scrollX;

	var i, l = screenGroups.length;
	for(i = 0; i < l; ++i) {
		var screenGroup = screenGroups[i];

		if(goog.dom.contains(screenGroup, this.currentScreen.domElement)) {
			outerMostScreenGroup = screenGroup;

			if(i === 0) scrollX = zoox.utils.getRelativeOffsetLeft( targetScreen.domElement.parentNode );
			else scrollX = zoox.utils.getRelativeOffsetLeft( screenGroups[i - 1] );

			break;
		}

		var groupChildren = goog.dom.getChildren(screenGroup);
		var childContainedTargetScreen = goog.array.find(groupChildren, function(child) {
			return goog.dom.contains(child, targetScreen.domElement);
		});
		
		screenGroup.scrollLeft = zoox.utils.getRelativeOffsetLeft( childContainedTargetScreen );
	}

	// tween to screen
	TweenMax.to(outerMostScreenGroup, .4, {
		scrollTo: {x: scrollX},
		ease: Quad.easeInOut,
		onComplete: this.onScreenTransitionComplete,
		onCompleteScope: this,
		onCompleteParams: [targetScreen]
	});
};


zoox.controllers.ScreenController.prototype.onScreenTransitionComplete = function (targetScreen) {
	this.currentScreen = targetScreen;
	console.log('current screen: ', this.currentScreen);
};


zoox.controllers.ScreenController.prototype.onNavigate = function (e) {
	if(e.token.length <= 0) return;

	var targetScreen = this.getScreenById( e.token[0] );
	this.toScreen( targetScreen );
};