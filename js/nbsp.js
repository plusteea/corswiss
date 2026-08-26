(function () {
    var SKIP = /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE|KBD|SAMP|NOSCRIPT|SVG)$/;
    var PARTICLES =
        "из-под|из-за|чтобы|через|между|перед|около|кроме|среди|" +
        "для|или|над|под|при|про|без|вне|как|" +
        "во|до|за|из|ко|на|не|ни|но|об|от|по|со|" +
        "а|в|и|к|о|с|у";
    var RE = new RegExp("(?<![А-Яа-яЁёA-Za-z])(" + PARTICLES + ")\\s+", "gi");
    var NUM = /(\d+)\s+(?=[А-Яа-яЁёA-Za-z])/g;

    function glue(text) {
        return text.replace(RE, "$1\u00A0").replace(NUM, "$1\u00A0");
    }

    function skipped(node) {
        var el = node.parentElement;
        while (el) {
            if (SKIP.test(el.nodeName) || el.isContentEditable) return true;
            if (el.hasAttribute && el.hasAttribute("data-no-nbsp")) return true;
            el = el.parentElement;
        }
        return false;
    }

    function process(root) {
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node.nodeValue || !/\S/.test(node.nodeValue)) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (skipped(node)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var node;
        while ((node = walker.nextNode())) {
            var next = glue(node.nodeValue);
            if (next !== node.nodeValue) node.nodeValue = next;
        }
    }

    function run() {
        process(document.body);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", run);
    } else {
        run();
    }
})();
