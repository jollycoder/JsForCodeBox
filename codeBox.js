var codeBoxes = document.getElementsByClassName('codebox');
console.info(navigator.userAgent);
alert(navigator.userAgent);
if (navigator.userAgent.search(/Firefox|Chrome/i) == -1) {
    alert(navigator.userAgent);
    for (var i = 0; i < codeBoxes.length; i++)
        codeBoxes[i].style = "border: 2px solid #acf; border-radius: 5px; background: #f8f8f8; padding: 12px 5px 5px 15px;";
}
else {
    for (i = 0; i < codeBoxes.length; i++) {
        var gotValue, box = codeBoxes[i];
        var pre = box.getElementsByTagName('pre')[0];
        if (!gotValue) {
            var boxPos = box.getBoundingClientRect();
            var prePos = pre.getBoundingClientRect();
            var offsetTop = prePos.top - boxPos.top;
            var computedStyle = getStyle(codeBoxes[0]);
            var paddingBottom = +computedStyle.paddingBottom.slice(0, -2);
            gotValue = true;
        }
        var codeTextHeight = pre.getElementsByTagName('code')[0].offsetHeight;
        var boxHeight = offsetTop + codeTextHeight + 10;
        ((boxHeight - paddingBottom > 500) && (boxHeight = 500 + paddingBottom));

        box.style = 'border: 2px solid #acf; border-radius: 5px; background: #f8f8f8; padding: 12px 5px 5px 15px;' +
            'height: ' + boxHeight + 'px; position: relative; resize: vertical; overflow: hidden;';
    }

    var padding = +computedStyle.paddingLeft.slice(0, -2) + +computedStyle.paddingRight.slice(0, -2);
    var border = +computedStyle.borderWidth.slice(0, -2) * 2;

    setStyle('.entry-content pre', [['position', 'absolute'],
                                    ['maxHeight', 'none'],
                                    ['height', 'calc(100% - ' + offsetTop + 'px)'],
                                    ['paddingRight', '0'],
                                    ['width', (codeBoxes[0].offsetWidth - padding - border - 5) + 'px']]);
    setStyle('.codebox', [['border-radius', '5px']])
}

function setStyle(selector, rulesArray)  {
    var sheet = document.styleSheets[0];
    var rules = (sheet.cssRules || sheet.rules);

    for (var i in rules)  {
        if (rules[i].selectorText == selector)
            for (var j = 0; j < rulesArray.length; j++)
                rules[i].style[rulesArray[j][0]] = rulesArray[j][1];
    }
}

function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}
