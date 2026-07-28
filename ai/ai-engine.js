
/* ==========================================
   English Buddy Pro v2.2
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


        try {

            const response =
                await ProviderManager.ask(
                    userMessage,
                    mode
                );


            this.addHistory(
                "assistant",
                response
            );


            return response;


        } catch(error) {


            console.error(
                "AI Error:",
                error
            );


            return "Sorry, I am unable to connect right now.";

        }

    }


    addHistory(role, message) {


        this.history.push({

            role: role,

            message: message,

            time: new Date().toISOString()

        });


        if (
            this.history.length >
            AI_CONFIG.chat.maxHistory
        ) {

            this.history.shift();

        }

    }


    clearHistory() {

        this.history = [];

    }


    getHistory() {

        return this.history;

    }

}


const AI = new AIEngine(AI_CONFIG);
