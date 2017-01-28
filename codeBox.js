var borderWidth = 2;
var borderColor = '#acf';
var borderRadius = 5;
var backgroundColor = '#f8f8f8';
var maxHeight = 500;
var fontFamily = 'Droid Sans Mono';
var paddingRight = 5, paddingBottom = 5, paddingLeft = 15;
var offsetTop = 47;  // отступ области с кодом от верха codebox

var codeBoxes = document.getElementsByClassName('codebox');

for (i = 0; i < codeBoxes.length; i++) {
    var box = codeBoxes[i];
    box.setAttribute('style',
        'border: ' + borderWidth + 'px solid ' + borderColor + '; ' +
        'border-radius: ' + borderRadius + 'px; ' +
        'background: ' +  backgroundColor + '; ' +
        'padding: ' + '0 ' +  paddingRight + 'px ' + paddingBottom + 'px ' + paddingLeft + 'px; ' +
        'position: relative; ' +
        'resize: vertical; ' +
        'min-height: 80px; ' +
        'overflow: hidden;');

    var header = box.getElementsByTagName('div')[0];
    header.setAttribute('style',
        'border-bottom: 2px #ed9 solid; ' +
        'line-height: 36px; ' +
        'vertical-align: middle; ' +
        'margin-left: ' + (paddingRight - paddingLeft) + 'px; ' +
        'margin-top: -4px; ' +
        'padding-left: 10px;');

    var pre = box.getElementsByTagName('pre')[0];
    var codeText = pre.getElementsByTagName('code')[0];
    codeText.setAttribute('style',
        'font-size: 12.5px !important; ' +
        'font-family: ' + fontFamily + ';');

    var boxPos = box.getBoundingClientRect();
    var codePos = codeText.getBoundingClientRect();

    var codeTextHeight = codeText.offsetHeight;
    var boxHeight = codePos.top - boxPos.top + codeTextHeight + 10;  // 10 — небольшой запас
    (boxHeight > maxHeight) && (boxHeight = maxHeight);
    box.style.height = boxHeight + 'px';

    pre.setAttribute('style',
        'position: absolute; ' +
        'max-height: none; ' +
        'top: ' + offsetTop + 'px; ' +
        'right: ' + paddingRight + 'px; ' +
        'bottom: ' + paddingBottom + 'px; ' +
        'padding-right: 0; ' +
        'overflow: auto;');
}