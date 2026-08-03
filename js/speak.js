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

        const prompt = `You are an English Speaking Coach.

Student Speech:
"${transcript}"

Please provide:

1. Grammar Correction
2. Improved Sentence
3. Pronunciation Tips
4. Vocabulary Suggestions

Keep your response short, encouraging, and easy to understand.`;

        const feedback = await AI.ask(prompt, "speaking");

        UIFeedback.hideLoading();

        const result = document.getElementById("speechResult");
const aiFeedback = document.getElementById("aiSpeechFeedback");

if (result) {

    result.textContent = transcript;

}

if (aiFeedback) {

    const formattedFeedback = feedback
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

    aiFeedback.innerHTML =
        "<h3>🤖 AI Speaking Coach</h3>" +
        "<div class='aiFeedbackContent'>" +
        formattedFeedback +
        "</div>";

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
