var codeBoxes = document.getElementsByClassName('codebox');

setStyle('.entry-content .quotebox, .entry-content .codebox', [['border-color', ''], ['background', '']]);
setStyle('.entry-content .codebox', [['border', '2px solid #acf'],
                                     ['border-radius', '5px'],
                                     ['background', '#f8f8f8'],
                                     ['padding', '12px 5px 5px 15px'],
                                     ['position', 'relative'],
                                     ['resize', 'vertical'],
                                     ['overflow', 'hidden']]);

for (i = 0; i < codeBoxes.length; i++) {
    var box = codeBoxes[i];
    var pre = box.getElementsByTagName('pre')[0];
    var codeText = pre.getElementsByTagName('code')[0];
    
    var boxPos = box.getBoundingClientRect();
    var prePos = pre.getBoundingClientRect();
    var codePos = codeText.getBoundingClientRect();

    var codeTextHeight = codeText.offsetHeight;
    var boxHeight = codePos.top - boxPos.top + codeTextHeight + 10;
    (boxHeight > 500) && (boxHeight = 500);
    box.style.height = boxHeight + 'px';
}

setStyle('.entry-content pre', [['position', 'absolute'],
    ['maxHeight', 'none'],
    ['top', (prePos.top - boxPos.top) + 'px'],
    ['bottom', '5px'],
    ['paddingRight', '0'],
    ['width', (codeBoxes[0].offsetWidth - 20 - 4) + 'px']]);

function setStyle(selector, rulesArray)  {
    var sheet = document.styleSheets[0];
    var rules = (sheet.cssRules || sheet.rules);

    for (var i in rules)  {
        if (rules[i].selectorText == selector)
            for (var j = 0; j < rulesArray.length; j++)
                rules[i].style[rulesArray[j][0]] = rulesArray[j][1];
    }
}