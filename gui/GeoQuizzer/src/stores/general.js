import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalstore', () => {
    const selectedQuiz = ref('')
    const showLoginModal = ref(false)
    const loginOption = ref(true)
    const showResultModal = ref(false)
    const loggedInUser = ref('')
    const practiceOrExam = ref('')
    const noQuestions = ref(0)
    const selectedRegion = ref('')
    return { selectedQuiz, showLoginModal, loginOption, showResultModal, loggedInUser, practiceOrExam, noQuestions, selectedRegion}
})