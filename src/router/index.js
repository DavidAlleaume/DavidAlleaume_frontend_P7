
import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"
import UserProfile from "@/views/UserProfile.vue"
import Forum from "@/views/Forum.vue"
import user from "../user_auth"

const routes = [
    { 
        name: 'home',
        path: '/', 
        component: Home,
    },
    { 
        name: 'profile',
        path: '/profile', 
        component: Profile, 
        props:true,
        meta: { requiresAuth: true } 
    },
    { 
        name: 'userprofile',
        path: '/userprofile/:id', 
        component: UserProfile, 
        props:true,
        meta: { requiresAuth: true }
    },
    {
        name: 'forum',
        path: '/forum',
        component: Forum,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = user.token !== ""
    console.log(isAuthenticated)
    if(to.matched.some(route => route.meta.requiresAuth)) {
        if(!isAuthenticated) {
            next({
                name: 'home'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router