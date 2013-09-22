goog.provide( 'zoox.views.Loader' );

goog.require( 'goog.fx.CssSpriteAnimation' );
goog.require( 'goog.dom' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.math.Size' );
goog.require( 'goog.math.Box' );
goog.require( 'goog.net.EventType' );
goog.require( 'goog.net.BulkLoader' );
goog.require( 'goog.net.ImageLoader' );
goog.require( 'goog.object' );


/** @constructor */
zoox.views.Loader = function (bulkAssets, imageAssets, animateOutDelay) {
	goog.base(this);

	// bulk loader
	this._bulkAssets = null;
	this._bulkAssetsKeys = null;
	this._bulkAssetsValues = null;

	this.bulkLoader = this.createBulkLoader(bulkAssets);

	// image loader
	this._imageAssets = null;

	this.imageLoader = this.createImageLoader(imageAssets);

	// loaders to execute
	this._loaders = [this.bulkLoader, this.imageLoader];

	// loader progrss
	this._loadedAssets = 0;
	this._totalAssets = 0;
	this._progress = 0;

	// animation
	this._animateInTweener = new TimelineMax({
		paused: true,
		onComplete: this.onAnimatedIn,
		onCompleteScope: this
	});

	this._animateOutTweener = new TimelineMax({
		paused: true,
		onComplete: this.onAnimatedOut,
		onCompleteScope: this
	});

	this._animateOutDelay = new goog.async.Delay(this.animateOut, animateOutDelay || 0, this);
};
goog.inherits(zoox.views.Loader, goog.events.EventTarget);


zoox.views.Loader.prototype.disposeInternal = function() {
	goog.base(this, 'disposeInternal');
};


zoox.views.Loader.prototype.reset = function() {
	if(this.bulkLoader) {
		this._bulkAssets = null;
		this._bulkAssetsKeys = null;
		this._bulkAssetsValues = null;

		goog.events.unlisten(this.bulkLoader, goog.net.EventType.SUCCESS, this.onBulkSuccess, false, this);
		goog.events.unlisten(this.bulkLoader, goog.net.EventType.ERROR, this.onBulkError, false, this);

		this.bulkLoader.dispose();
	}

	if(this.imageLoader) {
		this._imageAssets = null;

		goog.events.unlisten(this.imageLoader, goog.events.EventType.LOAD, this.onImageLoad, false, this);
		goog.events.unlisten(this.imageLoader, goog.net.EventType.COMPLETE, this.onImageComplete, false, this);
		goog.events.unlisten(this.imageLoader, goog.net.EventType.ERROR, this.onImageError, false, this);
		goog.events.unlisten(this.imageLoader, goog.net.EventType.ABORT, this.onImageAbort, false, this);

		this.imageLoader.dispose();
	}

	this._loadedAssets = 0;
	this._totalAssets = 0;
	this._progress = 0;
	this.updateProgress();
};


zoox.views.Loader.prototype.animateIn = function() {
	this._animateInTweener.play();
};


zoox.views.Loader.prototype.animateOut = function() {
	this._animateOutTweener.play();
};


zoox.views.Loader.prototype.createBulkLoader = function(assets) {
	if(!assets) return null;

	this._bulkAssets = assets;
	this._bulkAssetsKeys = goog.object.getKeys(this._bulkAssets);
	this._bulkAssetsValues = goog.object.getValues(this._bulkAssets);

	this.bulkLoader = new goog.net.BulkLoader( this._bulkAssetsValues );
	goog.events.listen(this.bulkLoader, goog.net.EventType.SUCCESS, this.onBulkSuccess, false, this);
	goog.events.listen(this.bulkLoader, goog.net.EventType.ERROR, this.onBulkError, false, this);

	this._totalAssets += this._bulkAssetsValues.length;

	return this.bulkLoader;
};


zoox.views.Loader.prototype.createImageLoader = function(assets) {
	if(!assets) return null;

	this._imageAssets = assets;

	this.imageLoader = new goog.net.ImageLoader();

	goog.object.forEach(this._imageAssets, function(imageAssetUrl, imageAssetKey) {
		this.imageLoader.addImage(imageAssetKey, imageAssetUrl);
	}, this);

	goog.events.listen(this.imageLoader, goog.events.EventType.LOAD, this.onImageLoad, false, this);
	goog.events.listen(this.imageLoader, goog.net.EventType.COMPLETE, this.onImageComplete, false, this);
	goog.events.listen(this.imageLoader, goog.net.EventType.ERROR, this.onImageError, false, this);
	goog.events.listen(this.imageLoader, goog.net.EventType.ABORT, this.onImageAbort, false, this);

	this._totalAssets += goog.object.getCount(assets);

	return this.imageLoader;
};


zoox.views.Loader.prototype.start = function(loaders) {
	this._loaders = loaders || this._loaders;

	// remove empty loaders
	this._loaders = goog.array.filter(this._loaders, function(loader) {
		return goog.isDefAndNotNull(loader);
	});

	goog.array.forEach(this._loaders, function(loader) {
		if(loader === this.bulkLoader) this.bulkLoader.load();
		else if(loader === this.imageLoader) this.imageLoader.start();
	}, this);

	if(!this.bulkLoader && !this.imageLoader) {
		this.onLoadComplete();
	}
};


zoox.views.Loader.prototype.updateProgress = function() {
	this._progress = this._loadedAssets / this._totalAssets;
};


zoox.views.Loader.prototype.onAnimatedIn = function(e) {
	this.start();

	this.dispatchEvent({
		type: zoox.events.EventType.ANIMATED_IN
	});
};


zoox.views.Loader.prototype.onAnimatedOut = function(e) {
	this.dispatchEvent({
		type: zoox.events.EventType.ANIMATED_OUT
	});
};


zoox.views.Loader.prototype.onBulkSuccess = function(e) {
	this._loadedAssets += this._bulkAssetsValues.length;
	this.updateProgress();

	var loaderIndex = goog.array.indexOf(this._loaders, e.target);

	if(loaderIndex >= this._loaders.length - 1) {
		this.onLoadComplete();
	}else {
		this.imageLoader.start();
	}
};


zoox.views.Loader.prototype.onBulkError = function(e) {
	console.log('Bulk loader error', e, this);
};


zoox.views.Loader.prototype.onLoadComplete = function() {
	console.log('Load complete', this);

	this._animateOutDelay.start();

	this.dispatchEvent({
		type: goog.net.EventType.COMPLETE
	});
};


zoox.views.Loader.prototype.onImageLoad = function(e) {
	this._loadedAssets ++;
	this.updateProgress();
};


zoox.views.Loader.prototype.onImageComplete = function(e) {
	var loaderIndex = goog.array.indexOf(this._loaders, e.target);

	if(loaderIndex >= this._loaders.length - 1) {
		this.onLoadComplete();
	}else {
		this.bulkLoader.load();
	}
};


zoox.views.Loader.prototype.onImageError = function(e) {

};


zoox.views.Loader.prototype.onImageAbort = function(e) {

};


zoox.views.Loader.Sprite = {
	DEFAULT: function() {return new goog.fx.CssSpriteAnimation(goog.dom.createDom('div', 'defaultSpinner'), new goog.math.Size(26, 26), new goog.math.Box(0, 312, 26, 0), 1000);},
	BLUE: function() {return new goog.fx.CssSpriteAnimation(goog.dom.createDom('div', 'blueSpinner'), new goog.math.Size(72, 72), new goog.math.Box(0, 720, 72, 0), 500);}
};