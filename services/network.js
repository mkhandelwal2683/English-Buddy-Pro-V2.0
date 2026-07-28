
/* ==========================================
   English Buddy Pro v2.1
   Network Service
========================================== */

class NetworkService {

    constructor() {

        this.online = navigator.onLine;

        this.initialize();

    }

    initialize() {

        window.addEventListener("online", () => {

            this.online = true;

            console.log("Network Connected");

            this.showStatus("🟢 Online");

        });

        window.addEventListener("offline", () => {

            this.online = false;

            console.log("Network Disconnected");

            this.showStatus("🔴 Offline");

        });

    }

    isOnline() {

        return this.online;

    }

    async send(url, options = {}) {

        if (!this.online) {

            return {

                success: false,

                message: "No Internet Connection"

            };

        }

        try {

            const response = await fetch(url, options);

            const data = await response.json();

            return {

                success: true,

                data: data

            };

        } catch (error) {

            console.error(error);

            return {

                success: false,

                message: error.message

            };

        }

    }

    showStatus(status) {

        console.log(status);

    }

}

const Network = new NetworkService();
