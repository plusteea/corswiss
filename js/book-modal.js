(function () {
    var modal = document.getElementById("book-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.className = "book-modal";
        modal.id = "book-modal";
        modal.setAttribute("hidden", "");
        modal.innerHTML =
            '<button class="book-modal__backdrop" type="button" data-book-close aria-label="Закрыть"></button>' +
            '<div class="book-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="book-modal-title">' +
            '<button class="book-modal__close" type="button" data-book-close aria-label="Закрыть">×</button>' +
            '<p class="eyebrow">Консультация</p>' +
            '<h2 class="display book-modal__title" id="book-modal-title">Запись на консультацию</h2>' +
            '<p class="lede book-modal__lede">Врач-куратор перезвонит в течение рабочего дня.</p>' +
            '<form class="book-modal__form" action="#" method="post">' +
            '<div class="book-modal__row">' +
            '<div class="field"><label for="book-name">Имя</label><input class="input" id="book-name" name="name" type="text" autocomplete="name" required /></div>' +
            '<div class="field"><label for="book-phone">Телефон</label><input class="input" id="book-phone" name="phone" type="tel" autocomplete="tel" required /></div>' +
            "</div>" +
            '<div class="field"><label for="book-mail">Электронная почта</label><input class="input" id="book-mail" name="email" type="email" autocomplete="email" /></div>' +
            '<div class="field"><label for="book-task">Кратко о задаче</label><textarea class="input" id="book-task" name="task" rows="2"></textarea></div>' +
            '<div class="book-modal__actions">' +
            '<button class="btn" type="submit">Записаться <span class="arr" aria-hidden="true">→</span></button>' +
            '<a class="book-modal__phone" href="tel:+41789488882">+41 78 94 88 88 2</a>' +
            "</div>" +
            "</form>" +
            "</div>";
        document.body.appendChild(modal);
    }

    var openers = document.querySelectorAll("[data-book-open]");
    var lastFocus = null;

    function openModal(event) {
        if (event) event.preventDefault();
        lastFocus = document.activeElement;
        modal.removeAttribute("hidden");
        document.body.classList.add("is-book-open");
        requestAnimationFrame(function () {
            modal.classList.add("is-open");
            var first = modal.querySelector("#book-name");
            if (first) first.focus();
        });
    }

    function closeModal() {
        modal.classList.remove("is-open");
        document.body.classList.remove("is-book-open");
        setTimeout(function () {
            if (!modal.classList.contains("is-open")) {
                modal.setAttribute("hidden", "");
            }
        }, 350);
        if (lastFocus && typeof lastFocus.focus === "function") {
            lastFocus.focus();
        }
    }

    openers.forEach(function (el) {
        el.addEventListener("click", openModal);
    });

    modal.addEventListener("click", function (event) {
        if (event.target.closest("[data-book-close]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
})();
