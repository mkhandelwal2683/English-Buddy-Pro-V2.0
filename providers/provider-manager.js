
/* ==========================================
   Provider Manager
========================================== */

const ProviderManager = {

    provider: MockProvider,

    async ask(message) {

        return await this.provider.ask(message);

    }

};
