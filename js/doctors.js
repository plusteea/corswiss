(function () {
    var chips = document.querySelectorAll(".doctors-filter .chip");
    if (!chips.length) return;

    var groups = document.querySelectorAll("main section[id^='g-']");

    chips.forEach(function (btn) {
        btn.addEventListener("click", function () {
            chips.forEach(function (chip) {
                chip.setAttribute("aria-pressed", String(chip === btn));
            });

            var target = btn.getAttribute("data-target");
            groups.forEach(function (sec) {
                sec.hidden = Boolean(target) && sec.id !== target;
            });
        });
    });
})();
