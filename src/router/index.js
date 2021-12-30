
import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"
import UserProfile from "@/views/UserProfile.vue"
import Forum from "@/views/Forum.vue"

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
    props:true 
  },
  { 
    name: 'userprofile',
    path: '/userprofile/:id', 
    component: UserProfile, 
    props:true 
  },
  {
    name: 'forum',
    path: '/forum',
    component: Forum
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router