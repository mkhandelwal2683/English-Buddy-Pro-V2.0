/* ==========================================
   English Buddy Pro v3.0
   Lesson Progress Manager
========================================== */

const LessonProgress = {

    STORAGE_KEY: "completedLessons",

    getCompletedLessons() {

        return Storage.load(this.STORAGE_KEY, []);

    },

    isCompleted(id) {

        const completed = this.getCompletedLessons();

        return completed.includes(id);

    },

    complete(id) {

        let completed = this.getCompletedLessons();

        if (completed.includes(id)) {

            UIFeedback.showSuccess(
                "Lesson already completed."
            );

            return;

        }

        completed.push(id);

        Storage.save(
            this.STORAGE_KEY,
            completed
        );

        this.addXP(20);

        this.incrementLessons();

        UIFeedback.showSuccess(
            "🎉 Lesson Completed! +20 XP"
        );

    },

    addXP(amount) {

    const xp = Storage.addXP(amount);

    const element = document.getElementById("xpValue");

    if (element) {

        element.textContent = xp;

    }

}

    incrementLessons() {

        let lessons = Storage.getLessonsCompleted();

        lessons++;

        Storage.save(
            "lessonsCompleted",
            lessons
        );

        const element = document.getElementById("lessonValue");

        if (element) {

            element.textContent = lessons;

        }

    }

};
