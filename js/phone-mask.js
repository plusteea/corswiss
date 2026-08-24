(function () {
    var PHONE_PREFIX = "+41-";
    var PHONE_PREFIX_LEN = PHONE_PREFIX.length;
    var DIGIT_COUNT = 9;
    var MAX_LENGTH = 15;

    function isPhoneMaskTarget(input) {
        return input && input.matches('input[type="tel"]');
    }

    function normalizeDigits(value) {
        var digits = (value || "").replace(/\D/g, "");
        if (digits.indexOf("41") === 0) {
            digits = digits.slice(2);
        }
        if (digits.charAt(0) === "0") {
            digits = digits.slice(1);
        }
        return digits.slice(0, DIGIT_COUNT);
    }

    function formatPhoneValue(digits) {
        var result = PHONE_PREFIX + digits.slice(0, 2);
        if (digits.length >= 2) result += "-";
        if (digits.length > 2) result += digits.slice(2, 5);
        if (digits.length >= 5) result += "-";
        if (digits.length > 5) result += digits.slice(5, 9);
        return result;
    }

    function removeDigitAt(value, index) {
        if (index < 0) return value;
        return value.slice(0, index) + value.slice(index + 1);
    }

    function placeCaretAfterPrefix(input) {
        if (!input) return;
        setTimeout(function () {
            if ((input.selectionStart || 0) < PHONE_PREFIX_LEN) {
                input.setSelectionRange(PHONE_PREFIX_LEN, PHONE_PREFIX_LEN);
            }
        }, 0);
    }

    function ensurePhoneInput(input) {
        if (!input || input.dataset.phoneMaskApplied === "1") return;
        input.dataset.phoneMaskApplied = "1";
        input.setAttribute("maxlength", String(MAX_LENGTH));
        input.setAttribute("inputmode", "tel");
        input.setAttribute("placeholder", "+41-xx-xxx-xxxx");
        input.setAttribute("autocomplete", "tel");
    }

    document.addEventListener("focusin", function (e) {
        if (!isPhoneMaskTarget(e.target)) return;
        var input = e.target;
        ensurePhoneInput(input);

        var digits = normalizeDigits(input.value);
        input.value = formatPhoneValue(digits);
        placeCaretAfterPrefix(input);
    });

    document.addEventListener("click", function (e) {
        if (!isPhoneMaskTarget(e.target)) return;
        placeCaretAfterPrefix(e.target);
    });

    document.addEventListener("keydown", function (e) {
        if (!isPhoneMaskTarget(e.target)) return;

        var input = e.target;
        var caretStart = input.selectionStart || 0;
        var caretEnd = input.selectionEnd || 0;
        var hasSelection = caretStart !== caretEnd;
        var isDeleteKey = e.key === "Backspace" || e.key === "Delete";

        if (!isDeleteKey) return;

        if (hasSelection) {
            e.preventDefault();

            var selectedRangeStartsBeforePrefix = caretStart < PHONE_PREFIX_LEN;
            var valueAfterDelete = input.value.slice(0, caretStart) + input.value.slice(caretEnd);
            var digitsAfterDelete = normalizeDigits(valueAfterDelete);

            input.value = formatPhoneValue(digitsAfterDelete);

            if (selectedRangeStartsBeforePrefix) {
                input.setSelectionRange(PHONE_PREFIX_LEN, PHONE_PREFIX_LEN);
            }
            placeCaretAfterPrefix(input);
            return;
        }

        if (e.key === "Backspace") {
            if (caretStart <= PHONE_PREFIX_LEN) {
                e.preventDefault();
                input.value = formatPhoneValue(normalizeDigits(input.value));
                input.setSelectionRange(PHONE_PREFIX_LEN, PHONE_PREFIX_LEN);
                return;
            }

            var prevChar = input.value.charAt(caretStart - 1);
            if (/\d/.test(prevChar)) return;

            var digits = normalizeDigits(input.value);
            var digitsBeforeCaret = input.value.slice(0, caretStart).replace(/\D/g, "").length;
            var typedDigitsBeforeCaret = Math.max(0, digitsBeforeCaret - (PHONE_PREFIX.replace(/\D/g, "").length));
            var deleteIndex = typedDigitsBeforeCaret - 1;

            if (deleteIndex < 0) {
                e.preventDefault();
                input.value = PHONE_PREFIX;
                input.setSelectionRange(PHONE_PREFIX_LEN, PHONE_PREFIX_LEN);
                return;
            }

            e.preventDefault();
            var newDigits = removeDigitAt(digits, deleteIndex);
            input.value = formatPhoneValue(newDigits);
            placeCaretAfterPrefix(input);
            return;
        }

        if (e.key === "Delete" && caretStart < PHONE_PREFIX_LEN) {
            e.preventDefault();
            input.setSelectionRange(PHONE_PREFIX_LEN, PHONE_PREFIX_LEN);
        }
    });

    document.addEventListener("input", function (e) {
        if (!isPhoneMaskTarget(e.target)) return;
        var input = e.target;
        ensurePhoneInput(input);
        var digits = normalizeDigits(input.value);
        input.value = formatPhoneValue(digits);
        if (digits.length === 0 || digits.length === DIGIT_COUNT) {
            input.classList.remove("error");
        } else {
            input.classList.add("error");
        }
        placeCaretAfterPrefix(input);
    });

    document.addEventListener(
        "blur",
        function (e) {
            if (!isPhoneMaskTarget(e.target)) return;
            var input = e.target;
            var digits = normalizeDigits(input.value);
            if (!digits.length) {
                input.value = "";
                input.classList.remove("error");
                return;
            }
            if (digits.length < DIGIT_COUNT) {
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
            input.value = formatPhoneValue(digits);
        },
        true
    );

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('input[type="tel"]').forEach(function (input) {
            ensurePhoneInput(input);
        });
    });
})();
