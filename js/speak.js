/* ==========================================
   English Buddy Pro v4.3
   Speak Module
========================================== */

const Speak = {

    init() {

        const startBtn = document.getElementById("startListening");
        const stopBtn = document.getElementById("stopListening");
        const clearBtn = document.getElementById("clearSpeechHistory");

        if (startBtn) {

            startBtn.addEventListener("click", () => {

                SpeechRecorder.start();

            });

        }

        if (stopBtn) {

            stopBtn.addEventListener("click", () => {

                SpeechRecorder.stop();

            });

        }

        if (clearBtn) {

            clearBtn.addEventListener("click", () => {

                SpeechHistory.clear();

                this.loadHistory();

                UIFeedback.showSuccess(
                    "Speech history cleared."
                );

            });

        }
        this.loadStreak();
        this.loadHistory();

    },

    loadHistory() {

        const container = document.getElementById("speechHistory");

        if (!container) return;

        const history = SpeechHistory.getHistory();

        if (history.length === 0) {

            container.innerHTML =
                "<p>No recordings yet.</p>";

            return;

        }

        let html = "";

        history.forEach(item => {

            html += `

                <div class="historyCard">

                    <small>${item.date}</small>

                    <p>${item.text}</p>

                </div>

            `;

        });

        container.innerHTML = html;

    }, 
async onSpeechCompleted(transcript) {

    if (!transcript || transcript.trim() === "") {
        return;
    }

    try {

        UIFeedback.showLoading("Analyzing your speech...");

        // Build the AI prompt using PromptManager
const prompt = PromptManager.buildPrompt(
    "speaking",
    transcript
);

// Send to AI
const feedback = await AI.ask(
    prompt,
    "speaking"
);
        UIFeedback.hideLoading();

        const result = document.getElementById("speechResult");
const aiFeedback = document.getElementById("aiSpeechFeedback");

if (result) {

    result.textContent = transcript;

}

if (aiFeedback) {

    try {

        const data = JSON.parse(feedback);
       /* ==========================================
   Update User XP
========================================== */

let earnedXP = 0;
       
// Dynamic score colors
const getScoreColor = (score) => {

    if (score >= 80) {

        return "#22c55e"; // Green

    }

    if (score >= 60) {

        return "#f59e0b"; // Orange

    }

    return "#ef4444"; // Red

};
      // Level badge color
const getLevelClass = (level) => {

    switch ((level || "").toLowerCase()) {

        case "beginner":
            return "levelBeginner";

        case "elementary":
            return "levelElementary";

        case "intermediate":
            return "levelIntermediate";

        case "advanced":
            return "levelAdvanced";

        default:
            return "levelBeginner";

    }

};
    /* ==========================================
   Calculate XP from Overall Score
========================================== */

const calculateXP = (score) => {

    if (score >= 90) {

        return 25;

    }

    if (score >= 80) {

        return 20;

    }

    if (score >= 70) {

        return 15;

    }

    if (score >= 60) {

        return 10;

    }

    if (score >= 40) {

        return 5;

    }

    return 2;

};
  earnedXP = calculateXP(data.overallScore);

try {

    if (
        typeof LessonProgress !== "undefined" &&
        typeof LessonProgress.addXP === "function"
    ) {

        LessonProgress.addXP(earnedXP);
if (
    typeof StreakManager !== "undefined" &&
    typeof StreakManager.updateSpeakingStreak === "function"
) {

    StreakManager.updateSpeakingStreak();

}
    Speak.loadStreak();
       
    }

} catch (error) {

    console.error("XP Update Failed:", error);

}
       
        aiFeedback.innerHTML = `
<h3>🤖 AI Speaking Coach</h3>

<div class="coachCard">

    <div class="scoreCircle">

    <div class="scoreValue">
        ${data.overallScore}
    </div>

    <div class="scoreText">
        Overall Score
    </div>

</div>

    <div class="scoreRow">
        <div class="scoreHeader">
            <span>📚 Grammar</span>
            <span>${data.grammarScore}/100</span>
        </div>
        <div class="scoreBar">
            <div
    class="scoreFill"
    style="
        width:${data.grammarScore}%;
        background:${getScoreColor(data.grammarScore)};
    ">
</div>
        </div>
    </div>

    <div class="scoreRow">
        <div class="scoreHeader">
            <span>🗣 Fluency</span>
            <span>${data.fluencyScore}/100</span>
        </div>
        <div class="scoreBar">
            <div
    class="scoreFill"
    style="
        width:${data.fluencyScore}%;
        background:${getScoreColor(data.fluencyScore)};
    ">
</div>
</div>
    </div>

    <div class="scoreRow">
        <div class="scoreHeader">
            <span>🎤 Pronunciation</span>
            <span>${data.pronunciationScore}/100</span>
        </div>
        <div class="scoreBar">
            <div
    class="scoreFill"
    style="
        width:${data.pronunciationScore}%;
        background:${getScoreColor(data.pronunciationScore)};
    ">
</div>
        </div>
    </div>

    <div class="scoreRow">
        <div class="scoreHeader">
            <span>📖 Vocabulary</span>
            <span>${data.vocabularyScore}/100</span>
        </div>
        <div class="scoreBar"><div
    class="scoreFill"
    style="
        width:${data.vocabularyScore}%;
        background:${getScoreColor(data.vocabularyScore)};
    ">
</div>
        </div>
    </div>

    <hr>

    <div style="text-align:center;margin:15px 0;">

    <span class="levelBadge ${getLevelClass(data.level)}">

        🎓 ${data.level}

    </span>

</div>

    <div class="correctBox">
        <strong>✅ Correct Sentence</strong>
        <p>${data.correctedSentence}</p>
    </div>

    <strong>💪 Strengths</strong>

    <ul>
        ${data.strengths.map(item => `<li>${item}</li>`).join("")}
    </ul>

    <strong>🎯 Improvements</strong>

    <ul>
        ${data.improvements.map(item => `<li>${item}</li>`).join("")}
    </ul>

    <div class="tipBox">

    <strong>⭐ Coach Message</strong>

    <p>${data.coachMessage}</p>

    <hr style="margin:12px 0;">

    <strong>🎁 Reward</strong>

    <p>

        Based on your performance, you earned
        <strong>${earnedXP} XP</strong>.

        Keep practicing to earn even more!

    </p>

</div>

    <div style="text-align:center;">
        <span class="xpBadge">
🏆 +${earnedXP} XP Added Successfully
</span>
    </div>

</div>
`;
    } catch (e) {

        aiFeedback.innerHTML =
            "<h3>🤖 AI Speaking Coach</h3><pre>" +
            feedback +
            "</pre>";

    }

}

    } catch (error) {

        console.error(error);

        UIFeedback.hideLoading();

        UIFeedback.showError(
            "Unable to analyze your speech."
        );

    }

}

},

/* ==========================================
   Load Speaking Streak
========================================== */

loadStreak() {

    try {

        const streak = Storage.getStreak();

        const current = document.getElementById("currentStreak");
        const longest = document.getElementById("longestStreak");
        const total = document.getElementById("totalPracticeDays");

        if (current) {
            current.textContent =
                `${streak.currentStreak} Day${streak.currentStreak === 1 ? "" : "s"}`;
        }

        if (longest) {
            longest.textContent =
                `${streak.longestStreak} Day${streak.longestStreak === 1 ? "" : "s"}`;
        }

        if (total) {
            total.textContent = streak.totalPracticeDays;
        }

    } catch (error) {

        console.error("Unable to load streak:", error);

    }

}

};

document.addEventListener("DOMContentLoaded", () => {

    Speak.init();

});
