$(function () {

    var $navItems = $('nav li');
    var $sections = $('main section');
    var TRIGGER = 120;   // 画面上端から何px下の線で切り替えるか

    var tops = [];       // 各セクションの位置（先に測っておく）
    var docHeight = 0;
    var winHeight = 0;

    /* スマホ表示では header が上に横並びで固定されるので、その高さを差し引く */
    function headerOffset() {
        var $header = $('header');
        return $header.css('position') === 'sticky' ? $header.outerHeight() : 0;
    }

    /* 位置の測り直し。スクロールのたびに測るとカクつくので、ここでまとめて記録する */
    function measure() {
        tops = $sections.map(function () {
            return $(this).offset().top;
        }).get();

        docHeight = $(document).height();
        winHeight = $(window).height();
    }

    /* 現在地のセクションに .current を付け替える */
    function updateCurrent() {
        var scrollTop = $(window).scrollTop();
        var line = scrollTop + headerOffset() + TRIGGER;
        var index = 0;

        for (var i = 0; i < tops.length; i++) {
            if (tops[i] <= line) {
                index = i;
            }
        }

        /* ページ最下部まで来たら最後のセクションを選ぶ（footer の分の救済） */
        if (scrollTop + winHeight >= docHeight - 2) {
            index = tops.length - 1;
        }

        if (!$navItems.eq(index).hasClass('current')) {
            $navItems.removeClass('current');
            $navItems.eq(index).addClass('current');
        }
    }

    $(window).on('scroll', updateCurrent);

    $(window).on('resize', function () {
        measure();
        updateCurrent();
    });

    /* 画像が読み込まれると高さが変わるので、読み込み後にもう一度測る */
    $(window).on('load', function () {
        measure();
        updateCurrent();
    });

    /* メニューをクリックしたらスムーズにスクロール */
    $('nav a').on('click', function (e) {
        var $target = $($(this).attr('href'));
        if (!$target.length) { return; }

        e.preventDefault();
        $('html, body').animate({
            scrollTop: $target.offset().top - headerOffset() - 20
        }, 500, 'swing');
    });

    measure();
    updateCurrent();
});
