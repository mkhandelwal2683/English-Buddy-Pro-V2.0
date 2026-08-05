class StreakManager {

    static updateSpeakingStreak() {

        try {

            const streak = Storage.getStreak();

            const today = new Date();
            const todayString = today.toISOString().split("T")[0];

            if (streak.lastPracticeDate === todayString) {
                return streak;
            }

            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const yesterdayString =
                yesterday.toISOString().split("T")[0];

            if (streak.lastPracticeDate === yesterdayString) {

                streak.currentStreak++;

            } else {

                streak.currentStreak = 1;

            }

            streak.totalPracticeDays++;

            streak.lastPracticeDate = todayString;

            if (
                streak.currentStreak >
                streak.longestStreak
            ) {

                streak.longestStreak =
                    streak.currentStreak;

            }

            Storage.setStreak(streak);

            return streak;

        } catch (error) {

            console.error(
                "Streak Update Failed:",
                error
            );

        }

    }

}
