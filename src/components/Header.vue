<template>
    <div>
        <nav class="navbar fixed-top navbar-dark bg-dark">
            <form class="container-fluid justify-content-between">
                <img  src="../assets/icon-left-font-monochrome-white-resized.png" alt="Logo Groupomania" width="200">
                <div>
                    <button class="btn btn-nav btn-sm btn-outline-secondary" type="button">
                        <router-link to="/forum">Forum</router-link>
                    </button>
                    <button class="btn btn-nav btn-sm btn-outline-secondary" type="button">
                        <router-link to="/profile"><fa icon="user" /></router-link>
                    </button>
                    <button @click="logout()" class="btn btn-nav btn-sm btn-outline-secondary" type="button">
                        <router-link to="/profile"><fa icon="sign-out-alt" /></router-link>   
                    </button>
                </div>
            </form>
        </nav>
    </div>
</template>

<script>

export default {
    name: 'Header',
    component: {},
    methods: {
    logout: function () {
      this.$store.commit("logout");
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
</style>