
/* ==========================================
   Mock AI Provider
========================================== */

const MockProvider = {

    async ask(message) {

        return "Mock Response:\n\n" + message;

    }

};
