
/* ==========================================
   English Buddy Pro v2.1
   Speech Service
========================================== */

class SpeechService {

    constructor() {

        this.recognition = null;
        this.synthesis = window.speechSynthesis;

        this.initializeRecognition();

    }

    initializeRecognition() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.warn("Speech Recognition Not Supported");

            return;

        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-IN";

        this.recognition.continuous = false;

        this.recognition.interimResults = false;

    }

    listen(callback) {

        if (!this.recognition) {

            alert("Speech Recognition is not supported on this browser.");

            return;

        }

        this.recognition.start();

        this.recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

            callback(text);

        };

        this.recognition.onerror = (event) => {

            console.error("Speech Error:", event.error);

        };

    }

    speak(text, language = "en-IN") {

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.lang = language;

        utterance.rate = 1;

        utterance.pitch = 1;

        this.synthesis.speak(utterance);

    }

    stopSpeaking() {

        this.synthesis.cancel();

    }

}

const Speech = new SpeechService();
