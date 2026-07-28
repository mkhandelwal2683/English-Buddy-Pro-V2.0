/* ==========================================
   English Buddy Pro v2.1
   Prompt Manager
========================================== */

class PromptManager {

    static buildPrompt(mode, userInput) {

        switch (mode) {

            case "translation":
                return this.translationPrompt(userInput);

            case "grammar":
                return this.grammarPrompt(userInput);

            case "vocabulary":
                return this.vocabularyPrompt(userInput);

            case "conversation":
                return this.conversationPrompt(userInput);

            case "writing":
                return this.writingPrompt(userInput);

            default:
                return this.chatPrompt(userInput);

        }

    }

    /* -----------------------------
       General Chat
    ------------------------------ */

    static chatPrompt(text) {

        return `
You are English Buddy AI.

Answer in simple English.

If required,
also explain in Hindi.

User:
${text}
`;

    }

    /* -----------------------------
       Translation
    ------------------------------ */

    static translationPrompt(text) {

        return `
Translate between English and Hindi.

Input:
${text}

Return:

1. Translation

2. Pronunciation

3. Grammar Pattern

4. Two Example Sentences
`;

    }

    /* -----------------------------
       Grammar
    ------------------------------ */

    static grammarPrompt(text) {

        return `
Correct this sentence.

Sentence:
${text}

Return:

1. Correct Sentence

2. Mistakes

3. Hindi Explanation

4. Easy Rule

5. One Practice Sentence
`;

    }

    /* -----------------------------
       Vocabulary
    ------------------------------ */

    static vocabularyPrompt(word) {

        return `
Explain this English word.

Word:
${word}

Return:

Meaning

Hindi Meaning

Pronunciation

Part of Speech

Synonyms

Antonyms

Five Example Sentences

Common Mistakes
`;

    }

    /* -----------------------------
       Conversation
    ------------------------------ */

    static conversationPrompt(text) {

        return `
You are a friendly English speaking tutor.

Continue the conversation naturally.

Correct mistakes politely.

User:
${text}
`;

    }

    /* -----------------------------
       Writing Assistant
    ------------------------------ */

    static writingPrompt(text) {

        return `
Help the learner write professional English.

Task:
${text}

Return:

Final Draft

Grammar Tips

Vocabulary Suggestions
`;

    }

}
