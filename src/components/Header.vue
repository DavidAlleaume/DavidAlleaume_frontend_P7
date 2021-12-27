<template>
    <div>
        <nav class="navbar navbar-custom fixed-top navbar-light">
            <form class="container-fluid justify-content-between">
                <img  src="../assets/icon-left-font-resized.png" alt="Logo Groupomania" width="200">
                <div>
                    <button class="btn btn-nav btn-sm btn-custom" type="button">
                        <router-link to="/forum">Forum</router-link>
                    </button>
                    <button class="btn btn-nav btn-sm btn-custom" type="button">
                        <router-link to="/profile"><fa icon="user-cog" /></router-link>
                    </button>
                    <button @click="logout()" class="btn btn-nav btn-sm btn-custom" type="button">
                        <router-link to="/profile"><fa icon="sign-out-alt" /></router-link>   
                    </button>
                </div>
            </form>
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
        border-bottom: solid 1px #bdc0c4;
    }
    .btn-custom {
        background-color: #fd2d01;
    }
</style>