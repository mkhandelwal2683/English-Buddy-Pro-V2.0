const OpenRouterProvider = {

    async ask(message) {

        const response = await fetch(API_CONFIG.BASE_URL, {

            method: "POST",

            headers: {

                "Authorization": "Bearer " + API_CONFIG.API_KEY,

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                model: API_CONFIG.MODEL,

                messages: [

                    {

                        role: "user",

                        content: message

                    }

                ]

            })

        });

        const data = await response.json();

        return data.choices[0].message.content;

    }

};
