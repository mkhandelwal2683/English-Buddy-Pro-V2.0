/* ==========================================
   English Buddy Pro v2.3.1
   UI Feedback Service
========================================== */

class UIFeedback {

    static showToast(message, duration = 3000) {

        const toast = document.getElementById("toastMessage");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(this.toastTimer);

        this.toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, duration);

    }

    static showLoading(message = "Loading...") {

        const overlay = document.getElementById("loadingOverlay");

        if (!overlay) return;

        const text = overlay.querySelector("p");

        if (text) {

            text.textContent = message;

        }

        overlay.classList.remove("hidden");

    }

    static hideLoading() {

        const overlay = document.getElementById("loadingOverlay");

        if (!overlay) return;

        overlay.classList.add("hidden");

    }

    static showSuccess(message) {

        this.showToast("✅ " + message);

    }

    static showError(message) {

        this.showToast("❌ " + message, 4000);

    }

    static showInfo(message) {

        this.showToast("ℹ️ " + message);

    }

}
window.addEventListener("load", () => {
    UIFeedback.showSuccess("English Buddy Pro Ready!");
});
