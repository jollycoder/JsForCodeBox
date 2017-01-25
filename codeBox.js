"use strict";

var codeBoxes = document.getElementsByClassName('codebox');

if (navigator.userAgent.search(/Firefox|Chrome/i) == -1) {
    for (var i = 0; i < codeBoxes.length; i++)
        codeBoxes[i].style = "border: 2px solid #acf; border-radius: 5px; background: #f8f8f8; padding: 12px 5px 5px 15px;";
}
else {
    for (i = 0; i < codeBoxes.length; i++) {
        var box = codeBoxes[i];
        var getValue;
        var pre = box.getElementsByTagName('pre')[0];
        if (!getValue) {
            var boxPos = box.getBoundingClientRect();
            var prePos = pre.getBoundingClientRect();
            var offsetTop = prePos.top - boxPos.top;
            var computedStyle = getStyle(codeBoxes[0]);
            var paddingBottom = +computedStyle.paddingBottom.slice(0, -2);
            getValue = true;
        }
        var codeTextHeight = pre.getElementsByTagName('code')[0].offsetHeight;
        var boxHeight = offsetTop + codeTextHeight + 10;
        ((boxHeight - paddingBottom > 500) && (boxHeight = 500 + paddingBottom));

        box.style = 'border: 2px solid #acf; border-radius: 5px; background: #f8f8f8; padding: 12px 5px 5px 15px;' +
            'height: ' + boxHeight + 'px; position: relative; resize: vertical; overflow: hidden;';
    }

    var padding = +computedStyle.paddingLeft.slice(0, -2) + +computedStyle.paddingRight.slice(0, -2);
    var border = +computedStyle.borderWidth.slice(0, -2) * 2;

    setStyle('.entry-content pre', 'position', 'absolute');
    setStyle('.entry-content pre', 'top', offsetTop + 'px');
    setStyle('.entry-content pre', 'maxHeight', 'none');
    setStyle('.entry-content pre', 'height', 'calc(100% - ' + (offsetTop + 7) + 'px)');
    setStyle('.entry-content pre', 'paddingRight', '0');
    setStyle('.entry-content pre', 'width', (codeBoxes[0].offsetWidth - padding - border - 5) + 'px');
}

function setStyle(selector, style, value)  {
    if (document.styleSheets[0].cssRules)
        var rules = document.styleSheets[0].cssRules;
    else if (document.styleSheets[0].rules)
        rules = document.styleSheets[0].rules;

    for (var i in rules)  {
        if (rules[i].selectorText == selector)
            rules[i].style[style] = value;
    }
}

function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}