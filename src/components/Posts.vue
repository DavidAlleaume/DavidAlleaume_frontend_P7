<template>
    <div>
       <div >
            <div :key="index" v-for="(post, index) in allPosts">
                
                <div class="card mb-5 post-card shadow-sm">
                    <div class="card-header post-infos mb-3">
                        <p class="user-name">{{ post.User.firstname }}  {{ post.User.lastname }}</p>
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
            isAdmin: user.isAdmin
        }
    },
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
        deletePost: function(post) {
            if(confirm('Voulez-vous vraiment supprimer ce message?')) {
                instance.delete(`/post/${post.id}`, {headers: {"Authorization": "Bearer " + user.token}})
                .then(() => {
                    this.$router.go()
                })
            }
        },
        dateTime: function(value) {
            return moment(value).format('DD.MM.YY')
        },
        hour: function(value) {
            return moment(value).format('HH:mm')
        }
    }
}
</script>

<style scoped src="./Posts.css">

</style>