<template>
    <div class="container">
        <nav class="navbar fixed-top navbar-custom navbar-expand-md navbar-dark">
            <img class="logo" src="../assets/icon-left-font-monochrome-white-resized.png" alt="Logo Groupomania" width=300>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#toggleMobileMenu"
                aria-controls="toggleMobileMenu"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-left" id="toggleMobileMenu">
                <ul class="navbar-nav ms-auto">
                    <li>
                        <router-link class-active="active" class="forum-link link" to="/forum">Forum</router-link>                      
                    </li>
                    <li>
                        <router-link to="/profile"><fa icon="user-cog" class="icon-custom link" /></router-link>
                    </li>
                    <li>
                        <router-link @click="logout()" to="/"><fa icon="sign-out-alt" class="icon-custom link" /></router-link>      
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>

import user from '../user_auth'

export default {
    name: 'Header',

    component: {},

    methods: {

        logout: function () {
            localStorage.clear(user)
            this.$router.go()
        }
    }
}

</script>

<style scoped src="./Header.css">

</style>