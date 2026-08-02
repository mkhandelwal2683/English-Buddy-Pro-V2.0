/* ==========================================
   English Buddy Pro v4.3
   Speech History Manager
========================================== */

const SpeechHistory = {

    STORAGE_KEY: "speechHistory",

    getHistory() {

        return Storage.load(this.STORAGE_KEY, []);

    },

    save(text) {

        if (!text || !text.trim()) return;

        const history = this.getHistory();

        history.unshift({

            text: text.trim(),

            date: new Date().toLocaleString()

        });

        if (history.length > 50) {

            history.pop();

        }

        Storage.save(this.STORAGE_KEY, history);

    },

    clear() {

        Storage.remove(this.STORAGE_KEY);

    }

};
