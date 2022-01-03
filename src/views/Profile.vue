<template>
    <header-top></header-top>
    <div class="container">
        <h1>Mon profil</h1>

        <div class="card shadow mt-5">
            <p><strong>Prénom: </strong>{{ user.firstname }}</p>
            <p><strong>Nom: </strong>{{ user.lastname }}</p>
            <p><strong>Email: </strong>{{ user.email }}</p>
            <p>Inscrit sur le forum depuis le {{ dateTime(user.createdAt) }}</p>
            <p v-if="user.isAdmin"><strong>Rôle:</strong>Administrateur</p>
            
        </div>
        <div >
            <button @click="deleteProfile()" type="button" class="btn btn-danger mt-5">
                Supprimer votre compte
            </button>
        </div>
    </div>
</template>

<script>

import instance from "../axios"
import Header from "../components/Header.vue"
import user from "../user_auth"
import moment from 'moment'

export default {

    name: "Profile",

    data() {
        return {
            user: {},
        }
    },

    components: {
        "header-top": Header
    },

    // Récupération des infos de l'utilisateur et positionnement du scroll en haut de page
    created() {
        window.scrollTo(0, 0)
        this.getMyProfile()
    },

    methods: {

        // Récupération des infos de l'utilisateur
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

        // formatage de la date
        dateTime: function(value) {
            return moment(value).format('DD.MM.YY')
        },

        // Suppression d'un utilisateur
        deleteProfile: function () {
            if (confirm("Vous êtes sur le point de supprimer ce compte et tous les posts qui y sont associés! Cette action est irréversible.")) {
                instance.delete(`/user/${user.userId}`, {
                    headers: { Authorization: "Bearer " + user.token }
                })
                .then((res) => {
                    if(res.status === 200) {
                        alert("Le profil a bien été supprimé !")
                    }
                    localStorage.clear()
                    this.$router.push("/")
                })
                .catch((res) => {
                    if(res.response.status == 401) {
                        alert("Requête non autorisée !")
                    }  else {
                        alert("Un problème est survenu, veuillez rééssayer !")
                    }
                })
            }
        }
    }
}

</script>

<style scoped src="./Profile.css">

</style>