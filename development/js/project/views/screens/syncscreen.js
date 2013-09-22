goog.provide( 'zoox.views.screens.SyncScreen' );

goog.require( 'goog.dom' );
goog.require( 'goog.dom.query' );
goog.require( 'zoox.views.screens.Screen' );
goog.require( 'zoox.templates.screens.syncscreen' );

/** @constructor */
zoox.views.screens.SyncScreen = function () {
	goog.base( this );

	this._brandingDom = null;
	this._controlsDom = null;
	this._topDom = null;
	this._loader = null;
	this._syncTweener = null;
};
goog.inherits(zoox.views.screens.SyncScreen, zoox.views.screens.Screen);


zoox.views.screens.SyncScreen.prototype.create = function () {
	var data = {};
	var template = zoox.templates.screens.syncscreen.SyncScreen;

	goog.base(this, 'create', data, template);

	this._brandingDom = goog.dom.getElementByClass('branding', this.domElement);
	this._controlsDom = goog.dom.getElementByClass('controls', this.domElement);
	this._tipDom = goog.dom.getElementByClass('tip', this.domElement);

	var spinnerDom = goog.dom.getElementByClass('spinner', this.domElement);
	this._loader = new zoox.views.screens.SyncScreen.Loader( spinnerDom );
	goog.events.listenOnce(this._loader, zoox.events.EventType.ANIMATED_OUT, this.onLoaderAnimatedOut, false, this);

	this._syncTweener = new TimelineMax({paused: true});

	var brandingTweener = TweenMax.fromTo(this._brandingDom, .8, {
		top: '50%'
	},{
		top: '22%'
	});
	
	var controlsTweener = TweenMax.fromTo(this._controlsDom, .8, {
		x: - zoox.main.controllers.windowController.getWindowSize().width
	}, {
		x: 0
	});

	var tipTweener = TweenMax.fromTo(this._tipDom, 1.5, {
		autoAlpha: 0
	}, {
		autoAlpha: 1
	});

	this._syncTweener.add(brandingTweener, 0);
	this._syncTweener.add(controlsTweener, .4);
	this._syncTweener.add(tipTweener, .8);
};


zoox.views.screens.SyncScreen.prototype.handleOnScreenTransitionComplete = function () {
	goog.base(this, 'handleOnScreenTransitionComplete');

	this._loader.start();
};


zoox.views.screens.SyncScreen.prototype.onLoaderAnimatedOut = function (e) {
	this._syncTweener.play();
};


goog.provide( 'zoox.views.screens.SyncScreen.Loader' );

goog.require( 'goog.dom' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zoox.views.Loader' );


/** @constructor */
zoox.views.screens.SyncScreen.Loader = function(domElement) {
	var bulkAssets = null;
	
	var imageAssets = null;

	goog.base(this, bulkAssets, imageAssets, 0);

	// dom elements
	this.domElement = domElement;
	this.loaderSprite = null;

	// animation
	var fadeInTweener = TweenMax.to(this.domElement, .4, {
		opacity: 1,
		display: 'block',
		ease: Quad.easeOut
	});

	this._animateInTweener.add(fadeInTweener);	

	var fadeOutTweener = TweenMax.to(this.domElement, .4, {
		opacity: 0,
		display: 'none',
		ease: Quad.easeOut
	});

	this._animateOutTweener.add(fadeOutTweener);

	//
	this.assets = {};
};
goog.inherits(zoox.views.screens.SyncScreen.Loader, zoox.views.Loader);


zoox.views.screens.SyncScreen.Loader.prototype.onAnimatedOut = function(e) {
	goog.base(this, 'onAnimatedOut', e);
};


zoox.views.screens.SyncScreen.Loader.prototype.onImageLoad = function(e) {
	switch(e.target.id) {
		case 'blueSpinner':
		this.loaderSprite = zoox.views.Loader.Sprite.BLUE();
		this.loaderSprite.play();
		goog.dom.appendChild(this.iconDom, this.loaderSprite.element_);
		break;
	}

	this.assets[e.target.id] = e.target;

	goog.base(this, 'onImageLoad', e);
};