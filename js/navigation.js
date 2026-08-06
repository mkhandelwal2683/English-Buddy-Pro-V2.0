/* ==========================================
   English Buddy Pro v2.0
   Navigation Controller
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navButtons = document.querySelectorAll(".navButton");

    const pages = {

    Home: document.getElementById("homePage"),

    Learn: document.getElementById("lessonsPage"),

    Speak: document.getElementById("speakPage"),

    Quiz: document.getElementById("quizPage"),

    Profile: document.getElementById("profilePage"),

    AI: document.getElementById("aiPage")

};
    function hideAllPages() {

        Object.values(pages).forEach(page => {

            if (page) {

                page.classList.remove("active");
                page.style.display = "none";

            }

        });

    }

    function showPage(pageName) {

        hideAllPages();

        if (pages[pageName]) {

            pages[pageName].style.display = "block";
            pages[pageName].classList.add("active");

        }

    }

    showPage("Home");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            navButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const pageName = button.dataset.page;
           
            showPage(pageName);
           if(
              pageName === "Speak" &&
              typeof Speak !== "undefined"
              &&
              typeof Speak.init === "funtion")
           {Speak.init();}
       
        });

    });

});
