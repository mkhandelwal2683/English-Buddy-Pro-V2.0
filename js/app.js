/* ==========================================
   English Buddy Pro v2.4.1
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

    restoreAIMode();

    showWelcomeMessage();

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

    const xp = Storage.getXP();

    const streak = Storage.getStreak();

    const lessons = Storage.getLessonsCompleted();

    const quiz = Storage.getQuizScore();

    setText("xpValue", xp);

    setText("streakValue", streak);

    setText("lessonValue", lessons);

    setText("quizValue", quiz);

}

/* ==========================================
   Daily Goal
========================================== */

function updateProgressBar() {

    const progress = document.getElementById("goalProgress");

    const percent = document.getElementById("goalPercent");

    if (!progress || !percent) return;

    const value = Storage.load("dailyGoal", 0);

    progress.style.width = value + "%";

    percent.textContent = value + "%";

}

/* ==========================================
   Restore AI Mode
========================================== */

function restoreAIMode() {

    const mode = Storage.getCurrentMode();

    const buttons = document.querySelectorAll(".modeButton");

    buttons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.mode === mode) {

            button.classList.add("active");

        }

    });

    if (typeof currentMode !== "undefined") {

        currentMode = mode;

    }

}

/* ==========================================
   Welcome Message
========================================== */

function showWelcomeMessage() {

    UIFeedback.showSuccess(

        "Welcome back to English Buddy Pro!"

    );

}

/* ==========================================
   Dark Mode
========================================== */

function setupDarkMode() {

    const toggle = document.getElementById("darkModeToggle");

    if (!toggle) return;

    const saved = Storage.load("darkMode", false);

    if (saved) {

        document.body.classList.add("dark");

        toggle.checked = true;

    }

    toggle.addEventListener("change", () => {

        document.body.classList.toggle("dark");

        Storage.save(

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
