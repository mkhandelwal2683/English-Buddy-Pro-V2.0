/* ==========================================
   English Buddy Pro v3.0
   Lesson Renderer
========================================== */

const LessonRenderer = {

    renderLessonList(lessons) {

        const container = document.getElementById("lessonContainer");

        if (!container) return;

        container.innerHTML = "";

        lessons.forEach(lesson => {

            const card = document.createElement("div");

            card.className = "lessonCard";

            card.innerHTML = `
                <div class="lessonHeader">
                    <h3>${lesson.title}</h3>
                    <span>
${LessonProgress.isCompleted(lesson.id)
    ? "✅ Completed"
    : lesson.category}
</span>
                </div>

                <p>${lesson.description}</p>

                <button class="lessonOpenButton"
                        data-id="${lesson.id}">
                    Open Lesson
                </button>
            `;

            container.appendChild(card);

        });

        this.attachEvents();

    },

    attachEvents() {

        document
            .querySelectorAll(".lessonOpenButton")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id = Number(button.dataset.id);

                    Learn.openLesson(id);

                });

            });

    },

    renderLesson(lesson) {

        const container = document.getElementById("lessonContainer");

        if (!container) return;

        let html = `

            <button id="backToLessons">
                ⬅ Back
            </button>

            <h2>${lesson.title}</h2>

            <p>${lesson.description}</p>

        `;

        lesson.content.forEach(item => {

            html += `

                <div class="lessonSentence">

                    <h3>${item.english}</h3>

                    <p>${item.hindi}</p>

                    <small>
    🔊 ${item.pronunciation}
</small>

<br><br>

<button
    class="listenButton"
    data-text="${item.english}">
    🔊 Listen
</button>

                </div>

            `;

        });

        html += `

            <button id="completeLessonButton">
                ⭐ Mark Lesson Complete
            </button>

        `;

        container.innerHTML = html;

        document
            .getElementById("backToLessons")
            .addEventListener("click", () => {

                this.renderLessonList(LESSONS);

            });

        document
            .getElementById("completeLessonButton")
            .addEventListener("click", () => {

                Learn.completeLesson(lesson.id);

            });

       document
    .querySelectorAll(".listenButton")
    .forEach(button => {

        button.addEventListener("click", () => {

            const text = button.dataset.text;

            if (
                typeof SpeechService !== "undefined" &&
                typeof SpeechService.speak === "function"
            ) {

                SpeechService.speak(text);

            } else {

                speechSynthesis.speak(
                    new SpeechSynthesisUtterance(text)
                );

            }

        });

    });
    }

};
