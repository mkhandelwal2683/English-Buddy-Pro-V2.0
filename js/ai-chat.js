
/* ==========================================
   English Buddy Pro v2.1
   AI Chat Controller
========================================== */
let currentMode = "chat";
let isSending = false;
/* -----------------------------
   Learning Mode Selection
------------------------------ */

const modeButtons = document.querySelectorAll(".modeButton");

modeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        modeButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentMode = button.dataset.mode;

        console.log("Current Mode:", currentMode);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const sendButton = document.getElementById("sendButton");
    const voiceButton = document.getElementById("voiceButton");
    const chatInput = document.getElementById("chatInput");

    if (sendButton) {

        sendButton.addEventListener("click", sendMessage);

    }

    if (chatInput) {

        chatInput.addEventListener("keypress", (event) => {

            if (event.key === "Enter") {

                sendMessage();

            }

        });

    }

    if (voiceButton) {

        voiceButton.addEventListener("click", () => {

            Speech.listen((text) => {

                chatInput.value = text;

            });

        });

    }

});

async function sendMessage() {

    const input = document.getElementById("chatInput");
    const container = document.getElementById("chatContainer");

    if (!input || !container) return;

   if (isSending) {

    UIFeedback.showInfo(
        "Please wait for the current response."
    );

    return;

   }
   
    const message = input.value.trim();

    if (message === "") return;

    addUserMessage(message);

input.value = "";

const sendButton =
    document.getElementById("sendButton");

try {

    isSending = true;

    if (sendButton) {

        sendButton.disabled = true;

    }

    UIFeedback.showInfo(
        "🤖 English Buddy is thinking..."
    );

    UIFeedback.showLoading(
        "Thinking..."
    );

    const reply = await AI.ask(
        message,
        currentMode
    );

    UIFeedback.hideLoading();

    addAIMessage(reply);

} catch (error) {

    console.error(error);

    UIFeedback.hideLoading();

    UIFeedback.showError(
        "Unable to get AI response."
    );

} finally {

    isSending = false;

    if (sendButton) {

        sendButton.disabled = false;

    }

}

}

function addUserMessage(text) {

    const container = document.getElementById("chatContainer");

    const div = document.createElement("div");

    div.className = "userMessage";

    div.textContent = text;

    container.appendChild(div);

    container.scrollTop = container.scrollHeight;

}

function addAIMessage(text) {

    const container = document.getElementById("chatContainer");

    const div = document.createElement("div");

    div.className = "aiMessage";

    div.textContent = text;

    container.appendChild(div);

    container.scrollTop = container.scrollHeight;

}
