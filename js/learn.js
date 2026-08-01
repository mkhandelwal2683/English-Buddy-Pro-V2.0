/* ==========================================
   English Buddy Pro v3.0
   Learn Module Controller
========================================== */

class LearnModule {

    constructor() {

        this.lessons = LESSONS || [];
        this.currentLesson = null;

    }

    init() {

        console.log("📖 Learn Module Loaded");

        this.renderLessons();

    }

    renderLessons() {

        if (typeof LessonRenderer === "undefined") {

            console.error("LessonRenderer not found");

            return;

        }

        LessonRenderer.renderLessonList(this.lessons);

    }

    openLesson(id) {

        const lesson = this.lessons.find(item => item.id === id);

        if (!lesson) return;

        this.currentLesson = lesson;

        LessonRenderer.renderLesson(lesson);

    }

    completeLesson(id) {

        if (typeof LessonProgress !== "undefined") {

            LessonProgress.complete(id);

        }

    }

}

const Learn = new LearnModule();

document.addEventListener("DOMContentLoaded", () => {

    Learn.init();

});
