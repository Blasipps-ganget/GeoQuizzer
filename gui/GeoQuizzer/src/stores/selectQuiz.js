import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSelectQuizStore = defineStore('selectquiz', () => {
    const selectedQuiz = ref('')

    return { selectedQuiz }
})