
/* ==========================================
   Internet Service
========================================== */

const Internet = {

    isOnline() {

        return navigator.onLine;

    },

    status() {

        return navigator.onLine
            ? "Online"
            : "Offline";

    }

};
