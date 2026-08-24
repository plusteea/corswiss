(function () {
    document.querySelectorAll(".faq details").forEach(function (details) {
        var summary = details.querySelector("summary");
        var body = details.querySelector(".faq__body");
        if (!summary || !body) return;

        if (details.hasAttribute("open")) {
            details.classList.add("is-open");
        }

        summary.addEventListener("click", function (e) {
            e.preventDefault();

            if (details.classList.contains("is-open")) {
                details.classList.remove("is-open");
                body.addEventListener(
                    "transitionend",
                    function handler(event) {
                        if (event.propertyName !== "grid-template-rows") return;
                        body.removeEventListener("transitionend", handler);
                        details.open = false;
                    }
                );
            } else {
                details.open = true;
                requestAnimationFrame(function () {
                    details.classList.add("is-open");
                });
            }
        });
    });
})();
