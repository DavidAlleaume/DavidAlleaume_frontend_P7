<template>
    <header-top></header-top>
    <div>
        <h1>{{ postUser.firstname }} {{ postUser.lastname }}</h1>

        <div class="card shadow mt-5">
            <p><strong>Email: </strong>{{ postUser.email }}</p>
            <p>Inscrit sur le forum depuis le {{ dateTime(postUser.createdAt) }}</p>
            <p v-if="postUser.isAdmin === true"><strong>Rôle:</strong> Administrateur</p>
        </div>
        <button v-if="isAdmin === true" @click="deleteProfile()" type="button" class="btn btn-danger mt-5">Supprimer cet utilisateur</button>
    </div>
    
    
    
</template>

<script>

import Header from "../components/Header.vue"
import instance from "../axios"
import user from "../user_auth"
import moment from 'moment'

export default {
    name: "UserProfile",

    data() {
        return {
            postUser: {},
            user: {},
            isAdmin: user.isAdmin
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
                this.postUser = res.data
                console.log(this.user)
            })
            .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
            })
        },

        dateTime: function(value) {
            return moment(value).format('DD.MM.YY')
        },

        deleteProfile: function () {
            if (confirm(`Vous êtes sur le point de supprimer le compte de ${ this.postUser.firstname } ${ this.postUser.lastname } et tous les posts qui y sont associés! Attention, cette action est irréversible.`)) {
                instance.delete(`/user/${this.postUser.userId}`, {
                    headers: { Authorization: "Bearer " + user.token }
                })
                .then((res) => {
                    if(res.status === 200) {
                        alert(`Le compte de ${ this.postUser.firstname } ${ this.postUser.lastname } a bien été supprimé !`)
                    }
                    this.$router.push("/forum")
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