/* ==========================================
   English Buddy Pro v2.0
   Main Application
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 English Buddy Pro Started");

    initializeApp();

});

/* ==========================================
   Initialize App
========================================== */

function initializeApp() {

    hideSplashScreen();

    loadUserProgress();

    updateProgressBar();

    setupDarkMode();

    showToast("Welcome to English Buddy Pro!");

}

/* ==========================================
   Splash Screen
========================================== */

function hideSplashScreen() {

    const splash = document.getElementById("splashScreen");

    if (!splash) return;

    setTimeout(() => {

        splash.style.opacity = "0";

        setTimeout(() => {

            splash.style.display = "none";

        }, 500);

    }, 1800);

}

/* ==========================================
   User Progress
========================================== */

function loadUserProgress() {

    const xp = localStorage.getItem("xp") || "0";

    const streak = localStorage.getItem("streak") || "0";

    const lessons = localStorage.getItem("lessons") || "0";

    const quiz = localStorage.getItem("quiz") || "0";

    setText("xpValue", xp);

    setText("streakValue", streak);

    setText("lessonValue", lessons);

    setText("quizValue", quiz);

}

/* ==========================================
   Progress Bar
========================================== */

function updateProgressBar() {

    const progress = document.getElementById("goalProgress");

    const percent = document.getElementById("goalPercent");

    if (!progress || !percent) return;

    const value = Number(localStorage.getItem("dailyGoal")) || 0;

    progress.style.width = value + "%";

    percent.textContent = value + "%";

}

/* ==========================================
   Toast Message
========================================== */

function showToast(message) {

    const toast = document.getElementById("toastMessage");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==========================================
   Dark Mode
========================================== */

function setupDarkMode() {

    const toggle = document.getElementById("darkModeToggle");

    if (!toggle) return;

    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {

        document.body.classList.add("dark");

        toggle.checked = true;

    }

    toggle.addEventListener("change", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "darkMode",

            toggle.checked

        );

    });

}

/* ==========================================
   Helper
========================================== */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}
