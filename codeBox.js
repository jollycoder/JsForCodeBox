var codeBoxes = document.getElementsByClassName('codebox');
for(var i=0; i<codeBoxes.length; i++) {
    var box = codeBoxes[i];
    var pre = box.getElementsByTagName('pre')[0];
    var boxPos = box.getBoundingClientRect();
    var prePos = pre.getBoundingClientRect();
    var offset = prePos.top - boxPos.top;
    box.style = 'border: 2px solid #acf; border-radius: 5px; background: #f8f8f8; padding: 12px 5px 5px 15px;' +
                                                        ' position: relative; resize: vertical; overflow: auto;';
    setStyle('.entry-content pre', 'position', 'absolute');
    setStyle('.entry-content pre', 'top', offset + 'px');
    setStyle('.entry-content pre', 'height', 'calc(100% - ' + offset + 'px)');
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