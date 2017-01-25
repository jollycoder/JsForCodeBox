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

    addStylesheetRules([
        ['.entry-content pre',
            ['position', 'absolute'],
            ['top', offsetTop + 'px'],
            ['maxHeight', 'none'],
            ['height', 'calc(100% - ' + (offsetTop + 7) + 'px)'],
            ['paddingRight', '0'],
            ['width', (codeBoxes[0].offsetWidth - padding - border - 5) + 'px']]
    ]);
}

function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}

function addStylesheetRules (rules) {
    var styleEl = document.createElement('style'),
        styleSheet;

    // Append style element to head
    document.head.appendChild(styleEl);

    // Grab style sheet
    styleSheet = styleEl.sheet;

    for (var i = 0, rl = rules.length; i < rl; i++) {
        var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
        // If the second argument of a rule is an array of arrays, correct our variables.
        if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
            rule = rule[1];
            j = 0;
        }

        for (var pl = rule.length; j < pl; j++) {
            var prop = rule[j];
            propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
        }

        // Insert CSS Rule
        styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
    }
}