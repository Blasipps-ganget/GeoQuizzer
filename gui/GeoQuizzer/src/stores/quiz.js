import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('capital', () => {
    const correctAnswer = ref('')
    const capitalName = ref('')
    const flagUrl = ref('false')
    const wrongAnswers = ref([])
    const currentQuestion = ref(0);
    
    return { correctAnswer, flagUrl, wrongAnswers, capitalName, currentQuestion}
})