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
  
    /* ==========================================
       Analyze Speech Using AI
    ========================================== */

    async analyzeSpeech(transcript) {

        if (!transcript || !transcript.trim()) {

            return;

        }

        try {

            UIFeedback.showLoading(
                "🤖 AI is analyzing your speech..."
            );

            const prompt =
                PromptManager.buildSpeakingPrompt(
                    transcript
                );

            const response =
                await AI.ask(prompt);

            let data;

            try {

                data =
                    typeof response === "string"
                        ? JSON.parse(response)
                        : response;

            } catch (error) {

                console.error(
                    "Invalid AI JSON:",
                    error
                );

                UIFeedback.hideLoading();

                UIFeedback.showError(
                    "AI returned an invalid response."
                );

                return;

            }

            this.renderFeedback(data);

            this.updateXP(data);

            this.loadStreak();

            UIFeedback.hideLoading();

        } catch (error) {

            console.error(error);

            UIFeedback.hideLoading();

            UIFeedback.showError(
                "Unable to analyze your speech."
            );

        }

    },

    /* ==========================================
       Update XP
    ========================================== */

    updateXP(data) {

        if (
            !data ||
            typeof calculateXP !== "function"
        ) {

            return;

        }

        const score =
            Number(data.overallScore) || 0;

        const earnedXP =
            calculateXP(score);

        if (
            typeof LessonProgress !== "undefined" &&
            typeof LessonProgress.addXP === "function"
        ) {

            LessonProgress.addXP(
                earnedXP
            );

        }

    },

    /* ==========================================
       Render AI Feedback
    ========================================== */

    renderFeedback(data) {

        if (!this.dom.feedback) {

            return;

        }

        const safe = (value, fallback = "-") =>
            value ? value : fallback;

        this.dom.feedback.innerHTML = `

<h3>🤖 AI Speaking Coach</h3>

<p><strong>Overall Score:</strong> ${safe(data.overallScore,0)}/100</p>

<p><strong>Correct Sentence:</strong><br>
${safe(data.correctSentence)}</p>

<p><strong>Strengths:</strong><br>
${safe(data.strengths)}</p>

<p><strong>Improvements:</strong><br>
${safe(data.improvements)}</p>

<p><strong>Pronunciation:</strong><br>
${safe(data.pronunciation)}</p>

<p><strong>Vocabulary:</strong><br>
${safe(data.vocabulary)}</p>

<p><strong>Coach Message:</strong><br>
${safe(data.coachMessage)}</p>

`;

    },
   
