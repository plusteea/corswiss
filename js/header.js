(function () {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var ENTER = 64;
    var LEAVE = 16;
    var scrolled = false;

    function update() {
        var y = window.scrollY;

        if (!scrolled && y >= ENTER) {
            scrolled = true;
            header.classList.add("is-scrolled");
        } else if (scrolled && y <= LEAVE) {
            scrolled = false;
            header.classList.remove("is-scrolled");
        }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
})();
