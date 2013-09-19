goog.provide( 'zoox.utils' );


zoox.utils.getRelativeOffsetLeft = function(domElement) {
	var parentOffsetLeft = domElement.parentNode.scrollLeft;
	var offsetLeft = goog.style.getRelativePosition(domElement, domElement.parentNode).x;
	return offsetLeft + parentOffsetLeft;
};


zoox.utils.getBackgroundImageUrl = function(domElement) {
	return domElement.style.backgroundImage.slice(4, -1);
};


zoox.utils.getTouchCoordinate = function(e) {
	var touchX = e.touches ? e.touches[0].pageX : e.clientX;
	var touchY = e.touches ? e.touches[0].pageY : e.clientY;
	var coord = {x:touchX, y:touchY};
	return coord;
};