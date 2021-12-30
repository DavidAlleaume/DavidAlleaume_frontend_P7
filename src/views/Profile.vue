<template>
    <header-top></header-top>
    <h1>Votre profil...</h1>

    <div class="card shadow mt-5">
        <p><strong>Prénom: </strong>{{ user.firstname }}</p>
        <p><strong>Nom: </strong>{{ user.lastname }}</p>
        <p><strong>Email: </strong>{{ user.email }}</p>
        <p v-if="user.isAdmin === true"><strong>Rôle:</strong> Administrateur</p>
        <p v-else><strong>Rôle:</strong> Utilisateur</p>
    </div>
    <div v-if="userId == user.id">
        <button @click="deleteProfile()" type="button" class="btn btn-danger mt-5">
            Supprimer votre compte
        </button>
    </div>
</template>

<script>

import instance from "../axios"
import Header from "../components/Header.vue"
import user from "../user_auth"

export default {
    name: "Profile",
    data() {
        return {
            user: {},
            userId: user.id
        }
    },

    components: {
        "header-top": Header
    },

    created() {
        this.getMyProfile()
    },

    methods: {
        getMyProfile: function () {
            instance.get(`/user/${user.userId}`, {
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

        deleteProfile: function () {
            if (confirm("Vous êtes sur le point de supprimer ce compte et tous les posts qui y sont associés! Cette action est irréversible.")) {
                instance.delete(`/user/${user.userId}`, {
                    headers: { Authorization: "Bearer " + user.token }
                })
                .then(() => {
                    localStorage.clear()
                    this.$router.push("/")
                })
                .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
                })
            }
        }
    }
}

</script>

<style scoped src="./Profile.css">

</style>