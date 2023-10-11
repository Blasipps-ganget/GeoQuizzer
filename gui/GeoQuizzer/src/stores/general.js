import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalstore', () => {
    const selectedQuiz = ref('')

    return { selectedQuiz }
})