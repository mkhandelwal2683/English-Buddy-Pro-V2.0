/* ==========================================
   English Buddy Pro v2.4.0
   Storage Service
   Production Ready
========================================== */

class StorageService {

    constructor() {

        console.log("Storage Service Initialized");

        this.KEYS = {

            PROFILE: "eb_profile",

            SETTINGS: "eb_settings",

            CHAT_HISTORY: "eb_chat_history",

            CURRENT_MODE: "eb_current_mode",

            LESSONS: "eb_lessons",

            QUIZ: "eb_quiz",

            STREAK: "eb_streak",

            XP: "eb_xp"

        };

    }

    /* ==========================================
       Generic Storage
    ========================================== */

    save(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    load(key, defaultValue = null) {

        try {

            const data = localStorage.getItem(key);

            if (data === null) {

                return defaultValue;

            }

            return JSON.parse(data);

        }

        catch (error) {

            console.error(error);

            return defaultValue;

        }

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clear() {

        localStorage.clear();

    }

    exists(key) {

        return localStorage.getItem(key) !== null;

    }

    increment(key, amount = 1) {

        let value = this.load(key, 0);

        value += amount;

        this.save(key, value);

        return value;

    }

    append(key, item) {

        let list = this.load(key, []);

        list.push(item);

        this.save(key, list);

        return list;

    }

    /* ==========================================
       User Profile
    ========================================== */

    saveProfile(profile) {

        return this.save(

            this.KEYS.PROFILE,

            profile

        );

    }

    getProfile() {

        return this.load(

            this.KEYS.PROFILE,

            {}

        );

    }

    /* ==========================================
       XP
    ========================================== */

    getXP() {

        return this.load(

            this.KEYS.XP,

            0

        );

    }

    addXP(amount = 10) {

        return this.increment(

            this.KEYS.XP,

            amount

        );

    }

    /* ==========================================
       Daily Streak
    ========================================== */

    getStreak() {

        return this.load(

            this.KEYS.STREAK,

            0

        );

    }

    setStreak(value) {

        return this.save(

            this.KEYS.STREAK,

            value

        );

    }

    /* ==========================================
       Lessons
    ========================================== */

    getLessonsCompleted() {

        return this.load(

            this.KEYS.LESSONS,

            0

        );

    }

    addLesson() {

        return this.increment(

            this.KEYS.LESSONS

        );

    }

    /* ==========================================
       Quiz
    ========================================== */

    getQuizScore() {

        return this.load(

            this.KEYS.QUIZ,

            0

        );

    }

    saveQuizScore(score) {

        return this.save(

            this.KEYS.QUIZ,

            score

        );

    }

    /* ==========================================
       AI Mode
    ========================================== */

    saveCurrentMode(mode) {

        return this.save(

            this.KEYS.CURRENT_MODE,

            mode

        );

    }

    getCurrentMode() {

        return this.load(

            this.KEYS.CURRENT_MODE,

            "chat"

        );

    }

    /* ==========================================
       Chat History
    ========================================== */

    saveChatMessage(message) {

        let history = this.load(

            this.KEYS.CHAT_HISTORY,

            []

        );

        history.push(message);

        if (history.length > 20) {

            history.shift();

        }

        this.save(

            this.KEYS.CHAT_HISTORY,

            history

        );

    }

    getChatHistory() {

        return this.load(

            this.KEYS.CHAT_HISTORY,

            []

        );

    }

    clearChatHistory() {

        this.remove(

            this.KEYS.CHAT_HISTORY

        );

    }

    /* ==========================================
       Reset Progress
    ========================================== */

    resetProgress() {

        this.remove(this.KEYS.PROFILE);

        this.remove(this.KEYS.XP);

        this.remove(this.KEYS.STREAK);

        this.remove(this.KEYS.LESSONS);

        this.remove(this.KEYS.QUIZ);

        this.remove(this.KEYS.CURRENT_MODE);

        this.remove(this.KEYS.CHAT_HISTORY);

        this.remove("completedLessons");
    }

}

const Storage = new StorageService();
