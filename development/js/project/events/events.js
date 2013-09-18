goog.provide('zoox.events');

goog.require('goog.userAgent');

zoox.events.EventType = {
	ADDED_TO_DOM: 'added_to_dom',
	REMOVED_FROM_DOM: 'removed_from_dom',
	ANIMATE_IN_START: 'animate_in_start',
	ANIMATE_OUT_START: 'animate_out_start',
	ANIMATE_IN_COMPLETE: 'animate_in_complete',
	ANIMATE_OUT_COMPLETE: 'animate_out_complete',
	DOWN: goog.userAgent.MOBILE ? 'touchstart' : 'mousedown',
	MOVE: goog.userAgent.MOBILE ? 'touchmove' : 'mousemove',
	UP: goog.userAgent.MOBILE ? ['touchend', 'touchcancel'] : 'mouseup'
};