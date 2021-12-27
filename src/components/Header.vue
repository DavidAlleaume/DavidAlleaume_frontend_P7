<template>
    <div class="container fixed-top">
        <nav class="navbar navbar-expand-md navbar-light mt-3">
            <img  src="../assets/icon-left-font-resized.png" alt="Logo Groupomania" width="300">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#toggleMobileMenu"
                aria-controls="toggleMobileMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="toggleMobileMenu">
                <ul class="navbar-nav ms-auto text-center">
                    <li>
                        <button class="btn btn-nav btn-sm btn-custom" type="button">
                            <router-link to="/forum">Forum</router-link>
                        </button>
                    </li>
                    <li>
                        <button class="btn btn-nav btn-sm btn-custom" type="button">
                            <router-link to="/profile"><fa icon="user-cog" /></router-link>
                        </button>
                    </li>
                    <li>
                        <button @click="logout()" class="btn btn-nav btn-sm btn-custom" type="button">
                            <router-link to="/profile"><fa icon="sign-out-alt" /></router-link>   
                        </button>
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
      this.$router.push("/");
    }
  }
}

</script>

<style scoped>
    .btn-nav {
        margin: 5px;
    }
    .btn-nav a {
        color: white;
        text-decoration: none;
    }
    .btn-nav a:hover {
        color: rgba(255, 255, 255, 0.808)
    }
    .navbar-custom {
        background-color: white;
        
    }
    .btn-custom {
        background-color: #fd2d01;
    }
</style>