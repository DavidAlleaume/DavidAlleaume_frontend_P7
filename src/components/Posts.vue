<template>
    <div>
       <div >
            <div :key="index" v-for="(post, index) in allPosts">
                <div class="row">
                    <p class="user-name col-6">{{ post.User.firstname }}  {{ post.User.lastname }}</p>
                    <p class="col-6">Le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}</p>
                </div>
                <div class="card mb-5 post-card shadow-sm">
                    <div>
                        <img v-if="post.attachment" class="post-attachment" v-bind:src="post.attachment" alt="Image postée" width="200"/>
                    </div>
                    <p class="post-content">{{ post.content }}</p>
                    <button v-if="post.userId == userId || isAdmin == true" @click="deletePost(post)" class="btn-supr btn"><fa icon="trash" /></button>
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

<style scoped>

.user-name {
    font-weight: bold;
    font-size: 15px;
}

.post-card {
    position: relative;
    padding: 20px;
    font-size: 20px;
}

.btn-supr {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    color: white;
    background-color: #fd2d01
}
.post-content {
    font-size: 15px;
    padding-right: 50px;
}
p {
    font-size: 12px;
}

</style>