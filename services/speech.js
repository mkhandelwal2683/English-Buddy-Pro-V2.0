
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

    UIFeedback.showError(
        "Speech recognition is not supported on this device."
    );

    return;

}
       
UIFeedback.showInfo(
    "🎤 Listening... Please speak now."
);
       
        this.recognition.start();

        this.recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

           UIFeedback.showSuccess(
    "Speech captured"
);
           
            callback(text);

        };

        this.recognition.onerror = (event) => {

    console.error(
        "Speech Error:",
        event.error
    );

    switch (event.error) {

        case "no-speech":

            UIFeedback.showInfo(
                "I didn't hear anything. Please try again."
            );

            break;

        case "not-allowed":

            UIFeedback.showError(
                "Please allow microphone access."
            );

            break;

        case "audio-capture":

            UIFeedback.showError(
                "Microphone not detected."
            );

            break;

        default:

            UIFeedback.showError(
                "Speech recognition failed."
            );

    }

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
