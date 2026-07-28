
/* ==========================================
   Provider Manager
========================================== */

const ProviderManager = {

    provider: OpenRouterProvider,

    async ask(message, mode = "chat") {

        if (!Internet.isOnline()) {

            return "❌ No Internet Connection.\n\nPlease connect to the internet and try again.";

        }

        return await this.provider.ask(message, mode);

    }

};
