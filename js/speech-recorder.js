/* ==========================================
   Speech Recorder
========================================== */

const SpeechRecorder = {

    recognition: null,

    start() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            UIFeedback.showError(
                "Speech Recognition is not supported."
            );

            return;

        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-IN";
        this.recognition.interimResults = true;
        this.recognition.continuous = false;

        this.recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

            document.getElementById(
                "speechResult"
            ).textContent = text;

        };

        this.recognition.start();

    },

    stop() {

        if (this.recognition) {

            this.recognition.stop();

        }

    }

};
