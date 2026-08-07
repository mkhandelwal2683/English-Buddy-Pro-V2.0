/* ==========================================
   English Buddy Pro v5.0
   Speak Module (Production Ready)
========================================== */

const Speak = {

    initialized: false,

    dom: {},

    /* ==========================================
       Initialize Speak Module
    ========================================== */

    init() {

        if (this.initialized) {
            return;
        }

        console.log("🎤 Speak Module Initializing...");

        this.cacheDOM();

        if (!this.validateDependencies()) {
            console.error("❌ Speak Module dependencies missing.");
            return;
        }

        this.bindEvents();

        this.loadHistory();

        this.loadStreak();

        this.initialized = true;

        console.log("✅ Speak Module Ready");

    },

    /* ==========================================
       Cache DOM Elements
    ========================================== */

    cacheDOM() {

        this.dom = {

            startBtn: document.getElementById("startListening"),

            stopBtn: document.getElementById("stopListening"),

            clearHistoryBtn:
                document.getElementById("clearSpeechHistory"),

            speechResult:
                document.getElementById("speechResult"),

            recordingStatus:
                document.getElementById("recordingStatus"),

            recordingTimer:
                document.getElementById("recordingTimer"),

            history:
                document.getElementById("speechHistory"),

            feedback:
                document.getElementById("aiSpeechFeedback"),

            currentStreak:
                document.getElementById("currentStreak"),

            longestStreak:
                document.getElementById("longestStreak"),

            totalPracticeDays:
                document.getElementById("totalPracticeDays")

        };

    },

    /* ==========================================
       Validate Required Modules
    ========================================== */

    validateDependencies() {

        const required = {

            SpeechRecorder,

            SpeechHistory,

            Storage,

            UIFeedback,

            LessonProgress,

            PromptManager,

            AI

        };

        for (const [name, module] of Object.entries(required)) {

            if (typeof module === "undefined") {

                console.error(`❌ Missing Module : ${name}`);

                return false;

            }

        }

        return true;

    },

    /* ==========================================
       Register Events
    ========================================== */

    bindEvents() {

        if (this.dom.startBtn) {

            this.dom.startBtn.addEventListener(

                "click",

                () => this.startRecording()

            );

        }

        if (this.dom.stopBtn) {

            this.dom.stopBtn.addEventListener(

                "click",

                () => this.stopRecording()

            );

        }

        if (this.dom.clearHistoryBtn) {

            this.dom.clearHistoryBtn.addEventListener(

                "click",

                () => this.clearHistory()

            );

        }

    },

    /* ==========================================
       Start Recording
    ========================================== */

    startRecording() {

        if (!SpeechRecorder) {

            UIFeedback.showError(

                "Speech Recorder unavailable."

            );

            return;

        }

        SpeechRecorder.start();

    },

    /* ==========================================
       Stop Recording
    ========================================== */

    stopRecording() {

        if (!SpeechRecorder) {

            return;

        }

        SpeechRecorder.stop();

    },
      /* ==========================================
       Speech Recording Completed
    ========================================== */

    async onSpeechCompleted(transcript) {

        if (!transcript || !transcript.trim()) {

            UIFeedback.showError(
                "No speech detected."
            );

            return;

        }

        if (this.dom.speechResult) {

            this.dom.speechResult.textContent =
                transcript;

        }

        this.loadHistory();

        await this.analyzeSpeech(transcript);

    },

    /* ==========================================
       Load Speaking History
    ========================================== */

    loadHistory() {

        if (!this.dom.history) {

            return;

        }

        const history =
            SpeechHistory.getHistory();

        if (
            !history ||
            history.length === 0
        ) {

            this.dom.history.innerHTML =
                "<p>No recordings yet.</p>";

            return;

        }

        this.dom.history.innerHTML =
            history
            .slice()
            .reverse()
            .map((item, index) => {

                const text =
                    typeof item === "string"
                        ? item
                        : item.text || "";

                return `

<div class="historyItem">

<strong>#${history.length-index}</strong>

<p>${text}</p>

</div>

`;

            })
            .join("");

    },

    /* ==========================================
       Clear Speaking History
    ========================================== */

    clearHistory() {

        const confirmed =
            confirm(
                "Clear all speaking history?"
            );

        if (!confirmed) {

            return;

        }

        SpeechHistory.clear();

        this.loadHistory();

        UIFeedback.showSuccess(
            "Speaking history cleared."
        );

    },
  
