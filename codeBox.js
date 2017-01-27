var codeBoxes = document.getElementsByClassName('codebox');

setStyle('.entry-content .quotebox, .entry-content .codebox', [['border-color', ''], ['background', '']]);
setStyle('.entry-content .codebox', [['border', '2px solid #acf'],
                                     ['border-radius', '5px'],
                                     ['background', '#f8f8f8'],
                                     ['padding', '12px 5px 5px 15px'],
                                     ['position', 'relative'],
                                     ['resize', 'vertical'],
                                     ['overflow', 'hidden']]);

if (navigator.userAgent.search(/Firefox|Chrome/i) > -1) {
    for (i = 0; i < codeBoxes.length; i++) {
        var gotValue, box = codeBoxes[i];
        var pre = box.getElementsByTagName('pre')[0];
        if (!gotValue) {
            var boxPos = box.getBoundingClientRect();
            var prePos = pre.getBoundingClientRect();
            var offsetTop = prePos.top - boxPos.top;
            gotValue = true;
        }
        var codeTextHeight = pre.getElementsByTagName('code')[0].offsetHeight;
        var boxHeight = offsetTop + codeTextHeight + 5;
        (boxHeight > 500) && (boxHeight = 500);
        box.style.height = boxHeight + 'px';
    }

    setStyle('.entry-content pre', [['position', 'absolute'],
                                    ['maxHeight', 'none'],
                                    ['top', offsetTop + 'px'],
                                    ['bottom', '5px'],
                                    ['paddingRight', '0'],
                                    ['width', (codeBoxes[0].offsetWidth - 20 - 4 - 5) + 'px']]);
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