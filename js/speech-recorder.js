/* ==========================================
   Speech Recorder
========================================== */

const SpeechRecorder = {

    recognition: null,

timer: null,

seconds: 0,

isRecording: false,

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
        this.recognition.continuous = true;

        this.recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

            const result = document.getElementById("speechResult");

result.textContent += " " + text;

        };
       this.recognition.onend = () => {

    if (this.isRecording) {

        this.recognition.start();

    }

};
       
document.getElementById(
    "recordingStatus"
).textContent = "🔴 Listening...";

this.seconds = 0;

document.getElementById(
    "recordingTimer"
).textContent = "00:00";

this.timer = setInterval(() => {

    this.seconds++;

    const mins = String(
        Math.floor(this.seconds / 60)
    ).padStart(2, "0");

    const secs = String(
        this.seconds % 60
    ).padStart(2, "0");

    document.getElementById(
        "recordingTimer"
    ).textContent = `${mins}:${secs}`;

}, 1000);
       
        this.recognition.start();

    },

    stop() {
       
this.isRecording = false;
    if (this.recognition) {

        this.isRecording = true;

this.recognition.start();

    }

    clearInterval(this.timer);

    document.getElementById(
        "recordingStatus"
    ).textContent =
        "🟢 Recording Complete";

}

};
