/* ==========================================
   English Buddy Pro v2.0
   AI Configuration
========================================== */

const AI_CONFIG = {

    app: {
        name: "English Buddy Pro",
        version: "2.1.0"
    },

    provider: {

    type: "openrouter",

    endpoint: "https://openrouter.ai/api/v1/chat/completions",

    model: "meta-llama/llama-3.1-8b-instruct:free",

    apiKey: " "

},

    language: {
        primary: "en",
        secondary: "hi"
    },

    speech: {
        recognition: true,
        synthesis: true
    },

    chat: {
        maxHistory: 20,
        maxTokens: 1000,
        temperature: 0.7
    },

    features: {
        translation: true,
        grammar: true,
        vocabulary: true,
        conversation: true,
        writing: true,
        pronunciation: true
    }

};

Object.freeze(AI_CONFIG);
