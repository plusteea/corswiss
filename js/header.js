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

    var toggle = header.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 720) setOpen(false);
    });
})();
