/* ==========================================
   English Buddy Pro v3.1
   Lesson Player
========================================== */

const LessonPlayer = {

    lesson: null,

    index: 0,

    start(lesson) {

        this.lesson = lesson;
        this.index = 0;

        this.render();

    },

    next() {

        if (this.index < this.lesson.content.length - 1) {

            this.index++;

            this.render();

        }

    },

    previous() {

        if (this.index > 0) {

            this.index--;

            this.render();

        }

    },

    render() {

        const container = document.getElementById("lessonContainer");

        if (!container) return;

        const item = this.lesson.content[this.index];

        container.innerHTML = `

<button id="backToLessons">
⬅ Back
</button>

<h2>${this.lesson.title}</h2>

<p>${this.lesson.description}</p>

<hr>

<h3>${item.english}</h3>

<p>${item.hindi}</p>

<small>🔊 ${item.pronunciation}</small>

<br><br>

<button id="listenSentence">
🔊 Listen
</button>

<hr>

<p>

Sentence ${this.index + 1}
of
${this.lesson.content.length}

</p>

<progress
value="${this.index + 1}"
max="${this.lesson.content.length}">
</progress>

<br><br>

<button id="previousSentence">

⬅ Previous

</button>

<button id="nextSentence">

Next ➡

</button>

<br><br>

<button id="completeLesson">

⭐ Complete Lesson

</button>

`;

        this.attachEvents(item);

    },

    attachEvents(item) {

        document
            .getElementById("listenSentence")
            .addEventListener("click", () => {

                if (
                    typeof SpeechService !== "undefined" &&
                    typeof SpeechService.speak === "function"
                ) {

                    SpeechService.speak(item.english);

                }

            });

        document
            .getElementById("previousSentence")
            .addEventListener("click", () => {

                this.previous();

            });

        document
            .getElementById("nextSentence")
            .addEventListener("click", () => {

                this.next();

            });

        document
            .getElementById("completeLesson")
            .addEventListener("click", () => {

                Learn.completeLesson(this.lesson.id);

            });

        document
            .getElementById("backToLessons")
            .addEventListener("click", () => {

                Learn.renderLessons();

            });

    }

};
