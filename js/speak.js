/* ==========================================
   English Buddy Pro v4.0
   Speak Module
========================================== */

const Speak = {

    init() {

        const startBtn = document.getElementById("startListening");
        const stopBtn = document.getElementById("stopListening");

        if (!startBtn || !stopBtn) return;

        startBtn.addEventListener("click", () => {

            SpeechRecorder.start();

        });

        stopBtn.addEventListener("click", () => {

            SpeechRecorder.stop();

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Speak.init();

});
