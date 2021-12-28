<template>
    <div class="container">
        <nav class="navbar fixed-top navbar-custom navbar-expand-md navbar-dark p-3">
            <img class="logo" src="../assets/icon-left-font-monochrome-white-resized.png" alt="Logo Groupomania" width=300>
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
            <div class="collapse navbar-collapse text-left" id="toggleMobileMenu">
                <ul class="navbar-nav ms-auto">
                    <li>
                        <button class="btn btn-nav btn-sm btn-custom" type="button">
                            <router-link class-active="active" to="/forum">Forum</router-link>
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
        background-color: #091f43;
        border-bottom: 2px solid #fd2d01;
    }
    .navbar-toggler-icon {
        color: white;
    }
    .btn-custom {
        background-color: #2e405e;
    }
    @media screen and (max-width: 500px) {
        .logo {
            width:250px
        }
    }
    @media screen and (max-width: 400px) {
        .logo {
            width:200px;
        }
    }

</style>