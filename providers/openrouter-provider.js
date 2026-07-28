const OpenRouterProvider = {

    async ask(message) {

        const response = await fetch(
            "https://sweet-hat-c4cb.mkhandelwal2683.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.reply;

    }

};
