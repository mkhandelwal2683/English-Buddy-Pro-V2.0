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

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Speak.init();

});
