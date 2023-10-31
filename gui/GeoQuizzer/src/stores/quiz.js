import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('capital', () => {
    const correctAnswer = ref('')
    const capitalName = ref('')
    const flagUrl = ref('false')
    const wrongAnswers = ref([])
    
    return { correctAnswer, flagUrl, wrongAnswers, capitalName }
})