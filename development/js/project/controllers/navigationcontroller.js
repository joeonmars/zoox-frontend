goog.provide('zoox.controllers.NavigationController');

goog.require('goog.events.EventTarget');
goog.require('goog.events');
goog.require('goog.History');
goog.require('goog.history.EventType');
goog.require('goog.string');

/**
 * @constructor
 */
zoox.controllers.NavigationController = function(){
  goog.base(this);

  // the current token
  this._token = null;

  // the history object
  var input = goog.dom.createDom('input');
  var iframe = goog.dom.createDom('iframe');
  this._navHistory = new goog.History(true, 'blank.html', input, iframe);

  // dispatchers that listen for navigate event
  this._dispatchers = [];
};
goog.inherits(zoox.controllers.NavigationController, goog.events.EventTarget);
goog.addSingletonGetter(zoox.controllers.NavigationController);


zoox.controllers.NavigationController.prototype.init = function(){
  goog.events.listen(this._navHistory, goog.history.EventType.NAVIGATE, this.onNavigate, false, this);
  this._navHistory.setEnabled(true);
};


zoox.controllers.NavigationController.prototype.addDispatcher = function(dispatcher) {
	if(!goog.array.contains(this._dispatchers, dispatcher)) {
		this._dispatchers.push(dispatcher);
	}
};


zoox.controllers.NavigationController.prototype.removeDispatcher = function(dispatcher) {
	if(goog.array.contains(this._dispatchers, dispatcher)) {
		goog.array.remove(this._dispatchers, dispatcher);
	}
};


zoox.controllers.NavigationController.prototype.setToken = function(token){
	token = goog.string.remove(token, '#');
	token = '/' + token;
	this._navHistory.setToken(token);
};


zoox.controllers.NavigationController.prototype.getToken = function(){
	var token = this._navHistory.getToken();
	token = token.split('/');

	if(token[0] === '') token.shift();
	if(goog.array.peek(token) === '') token.pop();

	return token;
};


zoox.controllers.NavigationController.prototype.replaceToken = function(token, title){
	token = '/' + token;
	this._navHistory.replaceToken(token, title);
};


zoox.controllers.NavigationController.prototype.handleToken = function(token){
	if ( goog.DEBUG ) console.log('handle token: [' + token + '] length: ' + token.length);

	var ev = {
		type: goog.history.EventType.NAVIGATE,
		token: token
	};

	goog.array.forEach(this._dispatchers, function(dispatcher) {
		dispatcher.dispatchEvent(ev);
	});
};


zoox.controllers.NavigationController.prototype.onNavigate = function(e){
	if(this._token === e.token) return false;
	else this._token = e.token;

	this.handleToken( this.getToken() );
};