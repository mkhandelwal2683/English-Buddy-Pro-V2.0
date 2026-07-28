/* ==========================================
   Network Status Listener
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("online", updateNetwork);

    window.addEventListener("offline", updateNetwork);

    updateNetwork();

});

function updateNetwork() {

    console.log("Network:", Internet.status());

}
