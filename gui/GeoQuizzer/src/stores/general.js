import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('generalstore', () => {
    const selectedQuiz = ref('')
    const showLoginModal = ref(false)
    const loginOption = ref(true)
    const showResultModal = ref(false)
    const loggedInUser = ref('')
    return { selectedQuiz, showLoginModal, loginOption, showResultModal, loggedInUser}
})