goog.provide('zoox.main');

goog.require('goog.fx.anim');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('zoox.templates');
goog.require('zoox.controllers.ScreenController');
goog.require('zoox.controllers.NavigationController');


zoox.Url = {
	ORIGIN: window.location.protocol + '//' + window.location.hostname + '/'
};

zoox.main = function() {
	goog.fx.anim.setAnimationWindow(window);

	var mainFrag = soy.renderAsFragment(zoox.templates.Main);
	goog.dom.appendChild(document.body, mainFrag);

	zoox.main.controllers.screenController.init();
	zoox.main.controllers.navigationController.init();

	var syncScreenId = zoox.main.controllers.screenController.getScreenId( zoox.views.screens.SyncScreen );
	zoox.main.controllers.navigationController.replaceToken( syncScreenId );
};

zoox.main.controllers = {
	navigationController: zoox.controllers.NavigationController.getInstance(),
	screenController: zoox.controllers.ScreenController.getInstance()
};

goog.exportProperty(window, 'zoox', zoox);
goog.exportProperty(zoox, 'main', zoox.main);