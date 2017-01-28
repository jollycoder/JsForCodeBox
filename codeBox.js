var borderWidth = 2;
var borderColor = '#acf';
var borderRadius = 5;
var backgroundColor = '#f8f8f8';
var maxHeight = 500;
var fontFamily = 'Droid Sans Mono';
var paddingRight = 5, paddingBottom = 5, paddingLeft = 15;

var codeBoxes = document.getElementsByClassName('codebox');

for (i = 0; i < codeBoxes.length; i++) {
    var box = codeBoxes[i];
    var pre = box.getElementsByTagName('pre')[0];

    var codeText = pre.getElementsByTagName('code')[0];
    codeText.setAttribute('style', 'font-size: 12.5px !important; font-family:' + fontFamily + ';');

    var boxPos = box.getBoundingClientRect();
    if (!i) {
        var prePos = pre.getBoundingClientRect();
        var offsetTop = prePos.top - boxPos.top;
    }
    var codePos = codeText.getBoundingClientRect();

    var codeTextHeight = codeText.offsetHeight;
    var boxHeight = codePos.top - boxPos.top + codeTextHeight + 8;  // 8 — небольшой запас
    (boxHeight > maxHeight) && (boxHeight = maxHeight);
    
    box.setAttribute('style', 'border: ' + borderWidth + 'px solid ' + borderColor + '; ' +
        'border-radius: ' + borderRadius + 'px; ' +
        'background: ' +  backgroundColor + '; ' +
        'padding: ' + '0 ' +  paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px; ' +
        'height: ' + boxHeight + 'px; ' +
        'position: relative; ' +
        'resize: vertical; ' +
        'overflow: hidden;');
}

setStyle('.entry-content pre', [['position', 'absolute'],
                                ['maxHeight', 'none'],
                                ['top', offsetTop + 'px'],
                                ['bottom', paddingBottom + 'px'],
                                ['paddingRight', '0'],
                                ['width', (codeBoxes[0].offsetWidth - paddingRight - paddingLeft - borderWidth * 2) + 'px']]);

function setStyle(selector, rulesArray)  {
    var sheet = document.styleSheets[0];
    var rules = (sheet.cssRules || sheet.rules);

    for (var i in rules)  {
        if (rules[i].selectorText == selector)
            for (var j = 0; j < rulesArray.length; j++)
                rules[i].style[rulesArray[j][0]] = rulesArray[j][1];
    }
}