<template>
  <header-top></header-top>
  <div class="container col-6">
    <h1 class="mb-5 mt-5">Bienvenue sur le forum !</h1>
    <div class="form-floating">
      <textarea class="form-control mb-2" v-model="content" aria-label="Contenu du message"></textarea>
      <label for="floatingTextarea">Exprimez-vous...</label>
      <button @click="createPost()" class="btn btn-outline-primary">Postez votre message</button>
      <p>{{ errorMessage }}</p>
    </div>
    <Posts></Posts>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Posts from '../components/Posts.vue'
import instance from '../axios'
import user from '../user_auth'

export default {
  name: 'Forum',
  components: {
    'header-top': Header,
    Posts
  },
  data() {
    return {
      content: "",
      errorMessage: ""
    }
  },
  methods: {
    createPost: function() {
      if(!this.content) {
        this.errorMessage = `Vous devez rédiger un message !`
        return
      }
      let formData = new FormData()
      formData.append('content', this.content)
      instance.post(`/post/`, formData, {headers: {"Authorization": "Bearer " + user.token}})
      .then(() => {
        window.location.reload
      })
      .catch(error => console.log(error))
    }
  }   
}

</script>

<style scoped>

</style>