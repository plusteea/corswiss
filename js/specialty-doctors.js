(function () {
    var root = document.querySelector("[data-specialty-doctors]");
    if (!root) return;

    var track = root.querySelector(".specialty-doctors__track");
    var viewport = root.querySelector(".specialty-doctors__viewport");
    var nav = root.querySelector(".specialty-doctors__nav");
    var prevBtn = root.querySelector("[data-specialty-doctors-prev]");
    var nextBtn = root.querySelector("[data-specialty-doctors-next]");
    var doctorCards = root.querySelectorAll(".doctor-card");
    var items = root.querySelectorAll(".specialty-doctors__item");

    if (!track || !viewport || doctorCards.length <= 3) return;

    root.classList.add("is-slider");
    if (nav) nav.hidden = false;

    var index = 0;

    function perView() {
        var w = window.innerWidth;
        if (w <= 640) return 1;
        if (w <= 980) return 2;
        return 4;
    }

    function maxIndex() {
        return Math.max(0, items.length - perView());
    }

    function gapSize() {
        var gap = getComputedStyle(track).columnGap || getComputedStyle(track).gap;
        var n = parseFloat(gap);
        return isNaN(n) ? 0 : n;
    }

    function itemStep() {
        var first = items[0];
        if (!first) return 0;
        return first.getBoundingClientRect().width + gapSize();
    }

    function render() {
        var max = maxIndex();
        if (index > max) index = max;
        track.style.transform = "translate3d(" + -index * itemStep() + "px,0,0)";
        if (prevBtn) prevBtn.disabled = index <= 0;
        if (nextBtn) nextBtn.disabled = index >= max;
    }

    function go(dir) {
        index = Math.min(maxIndex(), Math.max(0, index + dir));
        render();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

    var resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(render, 120);
    });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(render);
    }
    window.addEventListener("load", render);
    render();
})();
