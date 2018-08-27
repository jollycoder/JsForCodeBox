(function () {
    var isMobile = IsMobileDevice(),
        ahkHref = 'http://forum.script-coding.com/viewforum.php?id=13';
    
    configPage();
    configNavBar();
    configCodeBox();
    CodeParse( getCodeParseParam() );
    onClickRunCodeButton();

    function configPage() {
        if (isMobile)  {
            $("head").prepend('<link href="https://fonts.googleapis.com/css?family=Droid+Sans+Mono" rel="stylesheet">');
            $(".mini-chat").css("display", "none");
        }
        $('.brd').css("width", document.body.clientWidth < 1730 ? "90%" : "70%");

        $(".postbody, .posthead").css("margin-left", isMobile ? "140px" : "180px");

        $(".post-byline, .post-author").css({ paddingLeft: 0,
                                              marginLeft:  isMobile ? "-140px" : "-180px",
                                              width:       isMobile ? "120px" : "160px" });

        $(".postfoot").css("padding-left", isMobile ? "140px" : "180px");

        $("textarea#fld4").css({ fontFamily: "'Droid Sans Mono', monospace",
                                 height:     isMobile ? "300px" : "640px" });
    }

    function configNavBar() {
        var $nav = $('#navextra2'), currentLiClass;
        if (!isMobile) {
            var style = document.getElementById('brd-navlinks').style;
            style.zIndex = 1000;
            var property = navigator.userAgent.search(/Edge/) > 0 ? 'body' : 'documentElement';

            var OnScroll = function()  {
                var top = document[property].scrollTop - 82;
                style.top = top < 0 ? 0 : top + 'px';
            };
            window.addEventListener('scroll', OnScroll, true);

            var $navParent = $nav.parent();
            $nav.children().text('Коллекция AHK').attr('href', 'http://forum.script-coding.com/viewforum.php?id=2');

            $navParent.append('<li id="myAhk"><a href=' + ahkHref + '>AHK</a>');
            if (window.location.href == ahkHref)
                $('#myAhk').addClass('isactive');

            $navParent.append('<li id="myAhk"><a href="https://autohotkey.com/boards/viewforum.php?f=5">AutoHotkey.com</a>');
        }

        $('#navprofile').children().attr('href', 'http://forum.script-coding.com/profile.php?section=identity&id=24515');

        if (window.location.href == 'http://forum.script-coding.com/viewforum.php?id=2')
            $nav.addClass('isactive');

        $('#brd-navlinks > ul > li').hover(
            function() {
                currentLiClass = $(this).attr('class');
                $(this).children().css('background', '#2a6ab8');
            },
            function() {
                $(this).children().css('background', (currentLiClass == 'isactive') ? '#2a6ab8' : 'transparent');
            }
        );
    }

    function configCodeBox() {
        $(".codebox").css({ padding:      "0 10px 10px 10px",
                            border:       "2px solid #acf",
                            borderRadius: "5px" });

        $(".codebox > pre > code").css( { fontFamily: "'Droid Sans Mono', monospace",
                                          fontSize:   "12px" });
    }

    function onClickRunCodeButton() {
        $(".runCode").mousedown(function()  {
            $(this).parent().parent().find("code").css("background", "rgb(255, 230, 200)");
        }).mouseup(function()  {
            var $code = $(this).parent().parent().find("code");
            if ($code.css("background-color") != "rgb(255, 230, 200)")
                return;

            var text = $code.text(), html = $code.html(), thisButton = this;

            $code.css("background", "transparent");
            $(this).css({ transition: "all 300ms",
                          transformOrigin: "40% 50%",
                          transform: "rotate(1turn)" });
            $code.text("__runAhkCode__:" + text);
            selectCode(this);
            document.execCommand("copy");
            clearSelection();
            $code.html(html);

            setTimeout( function() { $(thisButton).css({ transition: 'none', transform: 'none' }) }, 400 );
        }).mouseleave(function()  {
            var $code = $(this).parent().parent().find("code");
            if ($code.css("background-color") = "rgb(255, 230, 200)")
                $code.css("background", "transparent");
        });
    }
})();

function getCodeParseParam() {
    return `<div style="margin-top:-4px;
                        margin-bottom:8px;
                        border-bottom:2px solid #acf;
                        white-space: wrap-word !important;
                        font-size: 12px !important;
                        line-height: 36px;
                        cursor: default !important;" %bottom%>

    %copySection(<img src="data:image/png;base64,
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC70lEQVR42m2TW0gU
        YRTH/9/MuLO5rrvrZhSlPkSRkolpUEFF9GhE0UblpVbXLuJThFJRPiRBWFDRTbwh
        XSCEhLIkepCIICMfKldNQ82eKlvdXdfd1rl8ndlVXKGBb5j5vnN+3zn/cw7DjRHg
        ZxSYpDWjAhIDOJY+tBXbC9N5dipglYCQBlzdSEd1AwIUnQ61k1B5IVjMmsW9MO/J
        eGyPYQgW6S4kQSFb1bBhKO8ziKd3Zlvvuwsd0DmHYBzM+9MvdIKItNHpDaLrs79O
        CGn1utPEkCIS9VAvkC63P6jIKi0rcMyRTxL+/+jvJ8LYfvNbEFF+BzapgahRhqMf
        AKfc3FSW6XEX2LWwwkWJrmMJniqFlSwx1j0S4tfeTGL9Cpm19fyuIR2uE4AicJpb
        7hVneKq2palTES4lCYspGBIoOofNzHjHlwB7NhCcK8u3CUW3Rx/jV9TNUByLoPXW
        4cyKU1sdqm+WAOJSDSgCpJpJg/4g7/ROa6X5DtHVONZKlTvBUEoAh9za4MqsKN/i
        UKfCXDKJcW8DsgCwygzPB4N4MeRXj2yyScUt4wagkqGMAHa5pf5AhqckP56CAUgs
        oqpxpBDg1XAAr4cDqivXJrnbxtvgi3oYjhPAJjdf3Jvp2Z9r1/wRLpIGLDEFjV4W
        qloPFeDtWEDdl2OXqh6OzQOO9RoRtJ8vyio5mOfQfWGYTAJdPC9DLALqsxQZeDcW
        QvegLwY484RS8P2lFCo/grqrZkdOWoMrz8kDEd3ImVEh4i1oNBItiwl4+snH1y43
        a5vXWMTajtFWTM+RiBe8AlmYEVJqYRKrs1dbUtNTkozuFoSFUTDEJMpKqwlnd69S
        Xg76TVe6vj/CnwiVsf4rDYbCWHCOY5l0adcG++U962wI068gsCWtaIB0XUfXwDT6
        J2aqEFEb4xbnvKC2lEitJPKspubPJmuOxYlCQlGMie2DLDZBFLAISBaBWRqwHzPk
        RsGLC4OYOJS0FPpII0EoHZDa/wCwEEEML0FzeQAAAABJRU5ErkJggg==" title="Копировать">)%

    %copyTab(<img src="data:image/png;base64,
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACsElEQVR42j2SXUiT
        URjHz3nffX+0peZEZeryIvKibG1JUQYVRHlnN10E0k1RBEU3EUV6IUagJWiJEJSJ
        QassWiiDWCIEZfZhkZTmVrk5nduaadvec85zOu+sHs57Ls55/8+P8/z/mHM+HqET
        33JY4ggAcW7X8y1O2VlsVSjXyghjLP4RO8oXBkZbR8Blw1oZgIGE+aM3K/OppbYG
        g2dDqdCIE1nCqzJVQInS85Kd3GEQvSlDGg2+eH+x2mHpC063NVq9NRWrjf9DMFDS
        Oao0eU1GLdJpUDCEOoZ+1jrNX+dzkdjsoboijvip3VasMQCASiJE6X2heMu070Mr
        WiDP5/XnDtr0iCGMLAb5sj81GcuW6xJdTS5Zb+IAmFGlayRbv94QSSgaDqMRfGav
        qcAk5QjSa9EVf3Jjqe3ZZDqbDnUfqwFkwJQq3cHfteXGL5GsBrG3cen0PguikCV8
        rZm3PIgnVsyeSsuNQPiIJ9Xc5MaMKZ2BX54qaySekzGMRXmj2/RxZpkQygmZXWJJ
        qjFgiCVpfPZDoHWrKrg6nHZX2CKJnIz4qwg5XGedW1QYA8a4aIGASYg7y+wdtwO3
        zm4SPijtT1PVJWumohkJ2OckO1pfEM0LADilQBmTMXcUWm/6AgPn3RhAaX+S3F/r
        oKCOdXB8yVul+75AmCgqXGWUCgFUVxT0+Yb7L2wT/tHjPTNijGYDZgqJZbQnDlQu
        pP4ShPd5ArLbzHfu+e82bxcE/vrTj7GJaeG/BMq7xcKGXZvDc8v5N6grT+Cucrvv
        ob+/ZacggPAb/atr/lhlSVFVsSZL8olACDgSEQxFSf+A73H7HjVSIFLFEQMuSbh3
        KDwYnDIKq0WwmDoidUocMhnqWkeuX2pQBasxFO2wQOFsOhqmIraSlAeLD+cvuM5o
        05odfwD7/ZyzoOGWNQAAAABJRU5ErkJggg==" title="Копировать с табуляцией">)%

    %copySpace3(<img src="data:image/png;base64,
        iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAD1klEQVR42l2Te0xb
        dRTHv797e7m0pbSWx7gUyqMtiCtsgihLBhskkz1ifGQhuJiRzRDD5mNGRhaN0czg
        K5tRFqK46MzcI9mDbQox8spAw9gypgw6rIUOGAwzCuWWPmhve3/e6T/Gk5zk/HFy
        Hp9zvqS45g+OZYhqxBWWIsOeKFCFotoJLIsS5Ghsd6YAw+MlppblUJCcOWSi+J+R
        mqZ7cLj8CIUBKRLNMKVyZVkmvjI/V11mzVHnd/e7Jyur15ZMRoKxoYteprcth7b0
        SHLXTx50HBVA8nc4njIa2K2PWdSbC2ya9VlmtUEQ4qHWstBrgNNnxyZ/n9Wu9YTk
        MOMF4nkfXqorxMn2RXQfSQOxVd/++f3G7KetBTrElAFVDGIsQIkynmAAe+EH1/Rr
        L262p266mGbPS62ksj9cXpn7/dBNEV2fZ4CU1ty59F5j9jZ9qpoNrcQUHAShEMX0
        bBi6uChx3RVDwaDkyrM9Ys1Mj9dc6hyf3Lt3fX4iI8fsZg7E/sL4t5+9bd6t1SsF
        gjLm5lcxPCIiL4dHoiEOgqCGQa8CHw+q4RA7fXb0Tnm1/YkqCyO99eUiIWlbHAdO
        HDZ/bMnV8ksiaN+vXpKTHQdLQQKlMgijrEOjkAMBGaYkwnR2u9xT1/KLvmhF8ECr
        BwSagcLzHet6NxbrUsQA5B/7RMaWy8GYpoHoVSo85KJA4VjIj5oZpmdwbqluR7kd
        8M2/fszJkIkJP3rHIkM7q/RP3l+E3PmLn7HbWCIIGnhFGRqeQMGCSITSvAyGjvy5
        jNr6oxtijHBj36u7VKT5jBd/eSKHD+0yvsupWKntcoAtslAUFSQwd+dkmqgB4TkC
        WaYwaInkC0W5D77qfyPZbD+WrE/gSUXDNFKTYKt/PmW0olDNneuTGJaE8UyFFhOz
        sgJAuee/a1BjIonpE4jqeMfMQKk9YdOiyKvIN12BOCkciiz4pE+KrarGWw7REafi
        1zTsNKXMLlDKq0CU5sqnUqwEIRdbmeisGGM/OnFtT0p61inycpuPuG+cpwa1zHFa
        a4k503zbs8I1NNcLRyhlI/ceyKxRR2BMZFi1GggoLz+1EEb/8ORw7Za8MlLXIuLm
        QDuqymzQJ6/DLacf6fromm0bjc6tpRp9KAIs+MKYmvetOt33nU7XxPVxx8hVx9WT
        g63NB6fJp5cDaHpO+4+yDn69xKSn8YgnAXnugX9/ki765vTMzG+jjvGB6/1XBv3u
        HoeSttp4zoex9ndw6sNXQP4rzabjS8hK57Fvu4Yo9hCfTvGV/VcoWp+1KKFbgUr5
        74Yo9mxgFOkj9je06aHJO4pb8AAAAABJRU5ErkJggg==" title="Копировать с 3 пробелами">)%

    <img class="runCode" style="margin-top:4px; cursor:pointer" src="data:image/png;base64,
        iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAACOklEQVR42lWSX0hT
        cRzFv9/teuca2NRKZ1hJ7lZsDizS2nAr80UoyYcIrLCIfIi91INPvSRKISX00EOy
        MsIibRUVg21RzN2l2D+jJhtimejm1jZ3N7X9u/d3u71EnufzgcM5B9susK69+0sP
        DT1YG5lvLz6rvWwgMwA04qCc7jicyT9i4H+h+bjH09/DmBMclb57Pzj67JLhFtSp
        p8vLhuF3cz2Vsev4dcC+1jfsjT6d0VJfgfPLeZxwzIdvvgw9/WRfGxDh6E+UTNWn
        A7IFb4FAQwkgY3nN9vTqTFqmksQ4kddsAcV0gIMPH6MB+0hscOGd5aHExCpOxSEa
        TwDuMrt957v1B8uqKzGcIKKSRrGYlglKmqcjoRQ4XPEvk85IH0ltfAVHNuWQMTvZ
        YxfrTMWaKpFLEaQoAEIACgQFdQmKJJMtWoqu5t/6suMh2+cOrLU42dYug1G1VQPp
        NAG5HCQXiFJ2QikQMvkCFY3myPsJbjJk853AnWaXr92qN5Zvq4Ikx4t0kUykFTIB
        UKDD4VVwj60Ef3gXr0ONbhT2qDJY2+Riz3TrjDuYKshlkVcqSdHsXAr9/uSc17V8
        J+ZeHAYIhdTWTuDWeECNye270qs/YGrQwNRMUj7jT8Wf2MPPZ18kBwA2BAGa/9Yv
        ozpzhC+Tdtjd4hm72q9tWkoowHb7+2N/qe4aDLV8U6ussMJoKWGqUZAA8d9wm08G
        fFgQan6Np7sggo6Kc9shck8jXcNGwGDg4Wvjumv8AaO++ljw6ccvAAAAAElFTkSu
        QmCC" title="Запустить">
  
    <br></div>%code%`;
}

function IsMobileDevice() {
    return (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))return true
    })(navigator.userAgent || navigator.vendor || window.opera);
}
