/* ===== BOOK MODAL JAVASCRIPT ===== */

function openBookModal() {
    var overlay = document.getElementById("book-modal-overlay");
    if (overlay) {
        // Reset: show form, hide success
        var form = document.getElementById("bookNowForm");
        var note = document.querySelector(".book-modal-footer-note");
        var success = document.getElementById("bookModalSuccess");
        if (form)    { form.reset(); form.style.display = ""; }
        if (note)    { note.style.display = ""; }
        if (success) { success.classList.remove("show"); }

        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }
}

function closeBookModal() {
    var overlay = document.getElementById("book-modal-overlay");
    if (overlay) {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    }
}

// Attach listeners once DOM is ready
document.addEventListener("DOMContentLoaded", function () {

    // Attach to every Book Now trigger button
    var triggers = document.querySelectorAll(".book-modal-trigger");
    triggers.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            openBookModal();
        });
    });

    // Close button (× inside modal)
    var closeBtn = document.querySelector(".book-modal-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            closeBookModal();
        });
    }

    // Click on dark overlay outside modal box → close
    var overlay = document.getElementById("book-modal-overlay");
    if (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                closeBookModal();
            }
        });
    }

    // ESC key → close
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeBookModal();
        }
    });

    // Form submit → show success state
    var form = document.getElementById("bookNowForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // Hide form + footer note, show success
            form.style.display = "none";
            var note = document.querySelector(".book-modal-footer-note");
            if (note) note.style.display = "none";
            var success = document.getElementById("bookModalSuccess");
            if (success) success.classList.add("show");
            // Auto-close after 3.5s
            setTimeout(function () {
                closeBookModal();
            }, 3500);
        });
    }
});
