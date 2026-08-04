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

        aiFeedback.innerHTML = `
            <h3>🤖 AI Speaking Coach</h3>

            <div class="coachCard">

                <p><strong>🏆 Overall Score:</strong> ${data.overallScore}/100</p>

                <p><strong>📚 Grammar:</strong> ${data.grammarScore}/100</p>

                <p><strong>🗣 Fluency:</strong> ${data.fluencyScore}/100</p>

                <p><strong>🎤 Pronunciation:</strong> ${data.pronunciationScore}/100</p>

                <p><strong>📖 Vocabulary:</strong> ${data.vocabularyScore}/100</p>

                <hr>

                <p><strong>🎓 Level:</strong> ${data.level}</p>

                <p><strong>✅ Correct Sentence</strong></p>

                <p>${data.correctedSentence}</p>

                <p><strong>💪 Strengths</strong></p>

                <ul>
                    ${data.strengths.map(item => `<li>${item}</li>`).join("")}
                </ul>

                <p><strong>🎯 Improvements</strong></p>

                <ul>
                    ${data.improvements.map(item => `<li>${item}</li>`).join("")}
                </ul>

                <p><strong>⭐ Coach Message</strong></p>

                <p>${data.coachMessage}</p>

                <h3>🏆 +${data.xpEarned} XP Earned</h3>

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
   
};

document.addEventListener("DOMContentLoaded", () => {

    Speak.init();

});
