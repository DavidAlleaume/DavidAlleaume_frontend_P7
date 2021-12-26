<template>
    <div>
       <div class="mt-5">
            <div :key="index" v-for="(post, index) in allPosts">
                <p>{{ post.User.firstname }}  {{ post.User.lastname }}</p>
                <div class="card mb-3">
                    <p>{{ post.content }}</p>
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
            allPosts: []
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
    }
}
</script>

<style scoped>


</style>