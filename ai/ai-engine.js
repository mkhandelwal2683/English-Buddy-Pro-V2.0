
/* ==========================================
   English Buddy Pro v2.1
   AI Engine
========================================== */

class AIEngine {

    constructor(config) {

        this.config = config;

        this.history = [];

        console.log("AI Engine Initialized");

    }

    async ask(userMessage, mode = "chat") {

        this.addHistory("user", userMessage);

        switch (this.config.provider.type) {

            case "mock":
                return this.mockResponse(userMessage, mode);

            case "openai-compatible":
                return this.callProvider(userMessage, mode);

            default:
                return this.mockResponse(userMessage, mode);

        }

    }

    addHistory(role, message) {

        this.history.push({

            role,

            message,

            time: new Date().toISOString()

        });

        if (this.history.length > AI_CONFIG.chat.maxHistory) {

            this.history.shift();

        }

    }

    async mockResponse(message, mode) {

        let response = "";

        switch (mode) {

            case "translation":

                response =
                    "Mock Translation:\n\n" +
                    "English ↔ Hindi translation engine will respond here.";

                break;

            case "grammar":

                response =
                    "Mock Grammar:\n\n" +
                    "Grammar correction engine will respond here.";

                break;

            case "vocabulary":

                response =
                    "Mock Vocabulary:\n\n" +
                    "Word explanation will appear here.";

                break;

            default:

                const AI = {

    async ask(message) {

        return await ProviderManager.ask(message);

    }

};

        }

        this.addHistory("assistant", response);

        return response;

    }

    async callProvider(message, mode) {

        console.log("Calling AI Provider...");

        return "Provider integration will be added in Sprint 2.2.";

    }

    clearHistory() {

        this.history = [];

    }

    getHistory() {

        return this.history;

    }

}

const AI = new AIEngine(AI_CONFIG);
