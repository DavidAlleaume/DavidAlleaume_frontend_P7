<template>
    <header-top></header-top>

    <h1>Profil de:</h1>
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <p>Email: {{user.email}}</p>
    
    
</template>

<script>

import Header from "../components/Header.vue"
import instance from "../axios"
import user from "../user_auth"

export default {
    name: "UserProfile",

    data() {
        return {
            user: {},
        }
    },

    components: {
        "header-top": Header
        
    },

    props: {
        id: String
    },

    mounted() {
        console.log(this.$route.params.id)
        const id = this.$route.params.id
        this.getProfile(id)
    },
    methods: {
        getProfile: function (id) {
            instance.get(`/user/${id}`, {
                headers: { Authorization: "Bearer " + user.token }
            })
            .then((res) => {
                console.log(res.data)
                this.user = res.data
                console.log(this.user)
            })
            .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
            })
        }
    }
    
}
</script>

<style scoped src="./Profile.css">

</style>