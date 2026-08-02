/* ==========================================
   English Buddy Pro v5.0
   Production Speech Recorder
========================================== */

const SpeechRecorder = {

    recognition: null,

    timer: null,

    seconds: 0,

    isStoppedByUser: false,

    fullTranscript: "",

    start() {

        this.isStoppedByUser = false;
        this.fullTranscript = "";

        document.getElementById("speechResult").textContent = "";
        document.getElementById("recordingStatus").textContent =
            "🔴 Listening...";

        this.seconds = 0;

        document.getElementById("recordingTimer").textContent =
            "00:00";

        clearInterval(this.timer);

        this.timer = setInterval(() => {

            this.seconds++;

            const mins = String(
                Math.floor(this.seconds / 60)
            ).padStart(2, "0");

            const secs = String(
                this.seconds % 60
            ).padStart(2, "0");

            document.getElementById("recordingTimer").textContent =
                `${mins}:${secs}`;

        }, 1000);

        this.startRecognition();

    },

    startRecognition() {

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

        this.recognition.interimResults = false;

        this.recognition.continuous = false;

        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript.trim();

            if (
                transcript &&
                !this.fullTranscript.endsWith(transcript)
            ) {

                if (this.fullTranscript.length > 0) {

                    this.fullTranscript += " ";

                }

                this.fullTranscript += transcript;

            }

            document.getElementById(
                "speechResult"
            ).textContent = this.fullTranscript;

        };

        this.recognition.onerror = (event) => {

            console.log(
                "Speech Error:",
                event.error
            );

        };

        this.recognition.onend = () => {

            if (this.isStoppedByUser) {

                clearInterval(this.timer);

                document.getElementById(
                    "recordingStatus"
                ).textContent =
                    "🟢 Recording Complete";

                return;

            }

            document.getElementById(
                "recordingStatus"
            ).textContent =
                "🎤 Listening...";

            setTimeout(() => {

                if (!this.isStoppedByUser) {

                    this.startRecognition();

                }

            }, 300);

        };

        this.recognition.start();

    },

    stop() {

        this.isStoppedByUser = true;

        if (this.recognition) {

            this.recognition.stop();

        }

        clearInterval(this.timer);

        document.getElementById(
            "recordingStatus"
        ).textContent =
            "🟢 Recording Complete";
SpeechHistory.save(this.fullTranscript);

if (typeof Speak !== "undefined") {

    Speak.loadHistory();

}
       
    }

};
