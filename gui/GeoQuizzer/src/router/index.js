import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('../views/MapView.vue')
        },
        {
            path: '/flag',
            name: 'flag',
            component: () => import('../views/FlagView.vue')
        },
        {
            path: '/capital',
            name: 'capital',
            component: () => import('../views/CapitalView.vue')
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: () => import('../views/QuizStartupScreen.vue')
        },
        {
            path: '/testProgressBar',
            name: 'testprogressbar',
            component: () => import('../views/ProgressBarTest.vue')
        },
        {

            path: '/testResultModal',
            name: 'testresultmodal',
            component: () => import('../views/ResultModalTest.vue')
        },
        {

            path: '/classroom',
            name: 'classroom',
            component: () => import('../views/ClassroomView.vue')

        },
        {
            path: '/joinclass/:name',
            name: 'joinclassroom',
            component: () => import('../components/JoinClassroom.vue')

        },
        {
            path: '/userProfile/:userId',
            name: 'userPage',
            component: () => import('../components/UserPage.vue')
        }
    ]
})

export default router
