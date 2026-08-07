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
            this.updateStreak();
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

    if (!this.dom.feedback) return;

    const safe = (v, d = "-") => v ?? d;

    const list = (items) => {

        if (!Array.isArray(items) || items.length === 0) {
            return "<li>-</li>";
        }

        return items.map(item => `<li>${item}</li>`).join("");

    };

this.dom.feedback.innerHTML = `

<div class="coachCard">

<div class="scoreCircle">
<div class="scoreValue">${safe(data.overallScore,0)}</div>
<div class="scoreText">Overall Score</div>
</div>

<div class="levelBadge level${safe(data.level,"Beginner")}">
${safe(data.level,"Beginner")}
</div>

<div class="scoreRow">
<div class="scoreHeader">
<span>Grammar</span>
<span>${safe(data.grammarScore,0)}%</span>
</div>

<div class="scoreBar">
<div class="scoreFill"
style="width:${safe(data.grammarScore,0)}%">
</div>
</div>
</div>

<div class="scoreRow">
<div class="scoreHeader">
<span>Fluency</span>
<span>${safe(data.fluencyScore,0)}%</span>
</div>

<div class="scoreBar">
<div class="scoreFill"
style="width:${safe(data.fluencyScore,0)}%">
</div>
</div>
</div>

<div class="scoreRow">
<div class="scoreHeader">
<span>Pronunciation</span>
<span>${safe(data.pronunciationScore,0)}%</span>
</div>

<div class="scoreBar">
<div class="scoreFill"
style="width:${safe(data.pronunciationScore,0)}%">
</div>
</div>
</div>

<div class="scoreRow">
<div class="scoreHeader">
<span>Vocabulary</span>
<span>${safe(data.vocabularyScore,0)}%</span>
</div>

<div class="scoreBar">
<div class="scoreFill"
style="width:${safe(data.vocabularyScore,0)}%">
</div>
</div>
</div>

<div class="correctBox">
<h4>✅ Correct Sentence</h4>
<p>${safe(data.correctedSentence)}</p>
</div>

<div class="tipBox">
<h4>💪 Strengths</h4>
<ul>
${list(data.strengths)}
</ul>

<h4>📈 Improvements</h4>
<ul>
${list(data.improvements)}
</ul>
</div>

<div class="tipBox">
<h4>💬 Coach Message</h4>
<p>${safe(data.coachMessage)}</p>
</div>

<div class="xpBadge">
⭐ XP Earned: ${safe(data.xpEarned,0)}
</div>

</div>

`;

}
   
    /* ==========================================
       Refresh Speaking Streak
    ========================================== */

    loadStreak() {

        try {

            const streak = Storage.getStreak();

            if (this.dom.currentStreak) {

                this.dom.currentStreak.textContent =
                    `${streak.currentStreak} Day${streak.currentStreak === 1 ? "" : "s"}`;

            }

            if (this.dom.longestStreak) {

                this.dom.longestStreak.textContent =
                    `${streak.longestStreak} Day${streak.longestStreak === 1 ? "" : "s"}`;

            }

            if (this.dom.totalPracticeDays) {

                this.dom.totalPracticeDays.textContent =
                    streak.totalPracticeDays;

            }

        } catch (error) {

            console.error(
                "Unable to load streak:",
                error
            );

        }

    },

    /* ==========================================
       Update Streak After Successful Practice
    ========================================== */

    updateStreak() {

        try {

            const streak =
                StreakManager.updateSpeakingStreak();

            if (streak) {

                this.loadStreak();

            }

        } catch (error) {

            console.error(
                "Unable to update streak:",
                error
            );

        }

    },

    /* ==========================================
       Reset AI Feedback Card
    ========================================== */

    resetFeedback() {

        if (!this.dom.feedback) {

            return;

        }

        this.dom.feedback.innerHTML = `

<h3>🤖 AI Speaking Coach</h3>

<p>Your AI feedback will appear here...</p>

`;

    },

    /* ==========================================
       Reset Speak Screen
    ========================================== */

    resetScreen() {

        if (this.dom.speechResult) {

            this.dom.speechResult.textContent =
                "Your speech will appear here...";

        }

        if (this.dom.recordingStatus) {

            this.dom.recordingStatus.textContent =
                "🟢 Ready";

        }

        if (this.dom.recordingTimer) {

            this.dom.recordingTimer.textContent =
                "00:00";

        }

        this.resetFeedback();

    },
    /* ==========================================
       Destroy Speak Module
    ========================================== */

    destroy() {

        try {

            if (this.dom.startBtn) {

                this.dom.startBtn.replaceWith(
                    this.dom.startBtn.cloneNode(true)
                );

            }

            if (this.dom.stopBtn) {

                this.dom.stopBtn.replaceWith(
                    this.dom.stopBtn.cloneNode(true)
                );

            }

            if (this.dom.clearHistoryBtn) {

                this.dom.clearHistoryBtn.replaceWith(
                    this.dom.clearHistoryBtn.cloneNode(true)
                );

            }

        } catch (error) {

            console.error(
                "Speak destroy failed:",
                error
            );

        }

        this.initialized = false;

    }

};

/* ==========================================
   Initialize Speak Module
========================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            if (
                typeof Speak !== "undefined"
            ) {

                Speak.init();

            }

        }
    );

} else {

    if (
        typeof Speak !== "undefined"
    ) {

        Speak.init();

    }

}

/* ==========================================
   Export Globally
========================================== */

window.Speak = Speak;

console.log(
    "✅ English Buddy Pro Speak Module v5.0 Loaded"
);   
