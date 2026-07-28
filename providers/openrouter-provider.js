
/* ==========================================
   OpenRouter Provider
========================================== */

const OpenRouterProvider = {

    async ask(message, mode = "chat") {

        try {

            const response = await fetch(
                "https://sweet-hat-c4cb.mkhandelwal2683.workers.dev/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: message,
                        mode: mode
                    })
                }
            );

            if (!response.ok) {

                throw new Error(
                    "HTTP " + response.status
                );

            }

            const data = await response.json();

            if (data.error) {

                throw new Error(data.error);

            }

            return data.reply;

        } catch (error) {

            console.error("Provider Error:", error);

            return "❌ Unable to connect to English Buddy AI.";

        }

    }

};
