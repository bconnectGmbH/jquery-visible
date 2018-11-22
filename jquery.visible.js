(function ($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *       the user visible viewport of a web browser.
   *       can accounts for vertical position, horizontal, or both
   */
  var $w = $(window);
  $.fn.visible = function (partial, hidden, direction, container) {

    if (this.length < 1) {
      return;
    }

    // Set direction default to 'both'.
    direction = direction || 'both';

    var $t = this.length > 1 ? this.eq(0) : this,
        isContained = typeof container !== 'undefined' && container !== null,
        $c = isContained ? $(container) : $w,
        wPosition = isContained ? $c.position() : 0,
        t = $t.get(0),
        vpWidth = $c.outerWidth(),
        vpHeight = $c.outerHeight(),
        clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

    if (typeof t.getBoundingClientRect === 'function') {

      // Use this native browser method, if available.
      var rec = t.getBoundingClientRect(),
          tViz = rec.top >= 0 && rec.top < vpHeight,
          bViz = rec.bottom > 0 && rec.bottom <= vpHeight,
          lViz = rec.left >= 0 && rec.left < vpWidth,
          rViz = rec.right > 0 && rec.right <= vpWidth,
          tBounds = rec.top < vpHeight,
          bBounds = rec.bottom > 0,
          lBounds = rec.left < vpWidth,
          rBounds = rec.right > 0,
          vVisible = partial ? tBounds && bBounds : tViz && bViz,
          hVisible = partial ? lBounds && rBounds : lViz && rViz;

      if (direction === 'both') {
        return clientSize && vVisible && hVisible;
      }
      else if (direction === 'vertical') {
        return clientSize && vVisible;
      }
      else if (direction === 'horizontal') {
        return clientSize && hVisible;
      }
    }
    else {

      var viewTop = isContained ? 0 : wPosition,
          viewBottom = viewTop + vpHeight,
          viewLeft = $c.scrollLeft(),
          viewRight = viewLeft + vpWidth,
          position = $t.position(),
          _top = position.top,
          _bottom = _top + $t.height(),
          _left = position.left,
          _right = _left + $t.width(),
          compareTop = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom,
          compareLeft = partial === true ? _right : _left,
          compareRight = partial === true ? _left : _right;

      if (direction === 'both') {
        return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
      }
      else if (direction === 'vertical') {
        return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
      }
      else if (direction === 'horizontal') {
        return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
      }
    }
  };

})(jQuery);
