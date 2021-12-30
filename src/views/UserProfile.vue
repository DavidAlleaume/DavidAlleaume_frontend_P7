<template>
    <header-top></header-top>

    <h1 @click="displayThing()">Voici le profil de {{ user.firstname }}</h1>
    
</template>

<script>

import Header from "../components/Header.vue"
import instance from "../axios"
import user from "../user_auth"

export default {
    name: "UserProfile",

    data() {
        return {
            user: {}
        }
    },

    components: {
        "header-top": Header
        
    },

    props: {
        id: String
    },

    created() {
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
                this.user = res.data
                console.log(res.data)
            })
            .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
            })
        },
    }
    
}
</script>

<style scoped src="./Profile.css">

</style>