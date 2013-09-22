goog.provide('zoox.events');

goog.require('goog.userAgent');

zoox.events.EventType = {
	ADDED_TO_DOM: 'added_to_dom',
	REMOVED_FROM_DOM: 'removed_from_dom',
	ANIMATE_IN: 'animate_in',
	ANIMATE_OUT: 'animate_out',
	ANIMATED_IN: 'animated_in',
	ANIMATED_OUT: 'animated_out',
	ANIMATE_IN_START: 'animate_in_start',
	ANIMATE_OUT_START: 'animate_out_start',
	ANIMATE_IN_COMPLETE: 'animate_in_complete',
	ANIMATE_OUT_COMPLETE: 'animate_out_complete',
	SCREEN_TRANSITION_START: 'screen_transition_start',
	SCREEN_TRANSITION_COMPLETE: 'screen_transition_complete',
	DOWN: goog.userAgent.MOBILE ? 'touchstart' : 'mousedown',
	MOVE: goog.userAgent.MOBILE ? 'touchmove' : 'mousemove',
	UP: goog.userAgent.MOBILE ? ['touchend', 'touchcancel'] : 'mouseup'
};