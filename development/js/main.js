goog.provide('zoox.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('zoox.templates');
goog.require('zoox.controllers.NavigationController');
goog.require('zoox.views.screens.AboutScreen');
goog.require('zoox.views.screens.SyncScreen');
goog.require('zoox.views.screens.ShareScreen');
goog.require('zoox.views.screens.HomeScreen');

zoox.Url = {
	ORIGIN: window.location.protocol + '//' + window.location.hostname + '/'
};

zoox.main = function() {
	goog.fx.anim.setAnimationWindow(window);

	//zoox.controllers.NavigationController.Implementation = zoox.controllers.NavigationController.HASH;
	zoox.main.controllers.navigationController.init();

	var helloWorld = soy.renderAsFragment(zoox.templates.helloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	var syncScreen = new zoox.views.screens.SyncScreen();
	syncScreen.create();

	var homeScreen = new zoox.views.screens.HomeScreen();
	homeScreen.create();

	var aboutScreen = new zoox.views.screens.AboutScreen();
	aboutScreen.create();

	var shareScreen = new zoox.views.screens.ShareScreen();
	shareScreen.create();
};

zoox.main.controllers = {
	navigationController: zoox.controllers.NavigationController.getInstance()
};

goog.exportProperty(window, 'zoox', zoox);
goog.exportProperty(zoox, 'main', zoox.main);