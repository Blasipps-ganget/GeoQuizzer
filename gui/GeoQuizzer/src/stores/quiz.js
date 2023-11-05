import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useQuizStore = defineStore('capital', () => {
    const correctAnswersArray = ref([]);
    const correctAnswer = ref('')
    const capitalName = ref('')
    const flagUrl = ref('false')
    const wrongAnswers = ref([])
    const currentQuestion = ref(0);
    const correctAmount = ref(0);

    function increment() {
        correctAmount.value++
    }

    function incrementCurrentQuestion() {
        currentQuestion.value++;
    }

    return {
        correctAnswer,
        flagUrl,
        wrongAnswers,
        capitalName,
        currentQuestion,
        correctAnswersArray,
        correctAmount,
        increment,
        incrementCurrentQuestion
    }
})