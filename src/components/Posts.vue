<template>
    <div>
       <div class="mt-5">
            <div :key="index" v-for="(post, index) in allPosts">
                <p class="user-name">{{ post.User.firstname }}  {{ post.User.lastname }}</p>
                <p>Le {{ post.createdAt }}</p>
                <div class="card mb-3 post-card shadow-sm">
                    <p class="post-content">{{ post.content }}</p>
                    <button v-if="post.userId == userId" @click="deletePost(post)" class="btn-supr btn btn-danger"><fa icon="trash" /></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import instance from '../axios'
import user from '../user_auth'

export default {
    name: 'Posts',
    data() {
        return {
            allPosts: [],
            userId: user.userId,
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
        }
    }
}
</script>

<style scoped>

.user-name {
    font-weight: bold;
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
}
.post-content {
    font-size: 15px;
    padding-right: 50px;
}


</style>