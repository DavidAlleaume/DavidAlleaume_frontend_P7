<template>
    <div>
       <div >
            <div :key="index" v-for="(post, index) in allPosts">
                
                <div class="card mb-5 post-card shadow-sm">
                    <div class="card-header post-infos mb-3">
                        <button 
                            v-show="post.userId !== userId"
                            type="button" 
                            @click="getOneUserProfile(post)" 
                            class="btn btn-outline user-name">
                            {{ post.User.firstname }}  {{ post.User.lastname }}
                        </button>
                        <p v-show="post.userId == userId" class="connected-user-name">{{ post.User.firstname }}  {{ post.User.lastname }}</p>
                        <p>Le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}</p>
                    </div>
                    <div>
                        <img v-if="post.attachment" class="post-attachment" v-bind:src="post.attachment" alt="Image postée" width="200"/>
                    </div>
                    <p class="post-content mt-2">{{ post.content }}</p>
                    <button v-if="post.userId == userId || isAdmin == true" @click="deletePost(post)" 
                        class="btn-suppr btn" 
                        data-toggle="tooltip" data-placement="right" title="Supprimer ce post">
                        <fa icon="trash" class="trash-icon" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'
import instance from '../axios'
import user from '../user_auth'

export default {
    name: 'Posts',
    data() {
        return {
            allPosts: [],
            userId: user.userId,
            isAdmin: user.isAdmin,
            user: {},
        }
    },

    // Récupération de tous les posts
    mounted() {
        instance.get('/post/', {headers: {"Authorization": "Bearer " + user.token}})
        .then(res => {
            console.log(res)
            for(const post of res.data) {
                this.allPosts.push(post)
            }
        })
    },

    methods: {

        // Suppression d'un post
        deletePost: function(post) {
            if(confirm('Voulez-vous vraiment supprimer ce post?')) {
                instance.delete(`/post/${post.id}`, {headers: {"Authorization": "Bearer " + user.token}})
                .then(() => {
                    this.$router.go()
                })
            }
        },

        // Formatage de la date
        dateTime: function(value) {
            return moment(value).format('DD.MM.YY')
        },

        // Formatage de l'heure
        hour: function(value) {
            return moment(value).format('HH:mm')
        },

        // Récupération des infos de l'utilisteur qui a créé le post
        getOneUserProfile: function(post) {
            let id = post.userId
            instance.get(`/user/${id}`, {headers: {"Authorization": "Bearer " + user.token}})
    
            .then((res) => {
                //console.log('test')
                console.log(res.data)
                // Renvoi vers le profil de l'utilisateur qui a créé le post
                this.$router.push({ path: `/userprofile/${res.data.userId}`})
            })
            .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
            }) 
        }
    }
}

</script>

<style scoped src="./Posts.css">

</style>