/* ==========================================
   English Buddy Pro v4.1
   Speech Recorder
========================================== */

const SpeechRecorder = {

    recognition: null,

    timer: null,

    seconds: 0,
   isStoppedByUser: false,
   

    start() {
this.isStoppedByUser = false;
       
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
        this.recognition.continuous = true;

        document.getElementById("recordingStatus").textContent =
            "🔴 Listening...";

        document.getElementById("speechResult").textContent = "";

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

        this.recognition.onresult = (event) => {

    let transcript = "";

    for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
    ) {

        transcript += event.results[i][0].transcript;

    }

    const result = document.getElementById("speechResult");

    const previous = result.textContent.trim();

    if (
        previous === "" ||
        previous === "Your speech will appear here..."
    ) {

        result.textContent = transcript;

    } else {

        result.textContent =
            previous + " " + transcript;

    }

};

        this.recognition.onerror = (event) => {

            console.log("Speech Error:", event.error);

        };

        this.recognition.onend = () => {

    if (this.isStoppedByUser) {

        clearInterval(this.timer);

        document.getElementById("recordingStatus").textContent =
            "🟢 Recording Complete";

        return;

    }

    document.getElementById("recordingStatus").textContent =
        "🎤 Listening...";

    setTimeout(() => {

        try {

            this.recognition.start();

        } catch (e) {

            console.log("Restart skipped:", e);

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

        document.getElementById("recordingStatus").textContent =
            "🟢 Recording Complete";

    }

};
