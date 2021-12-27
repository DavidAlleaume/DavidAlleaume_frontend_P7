<template>
  <header-top></header-top>
  <div class="container col-6">
    <h1 class="mb-5">Bienvenue sur le forum !</h1>
    <div class="form-floating post-form">
      <textarea class="input-custom form-control mb-2" v-model="content" aria-label="Contenu du message"></textarea>
      <label class="input-label" for="floatingTextarea">Exprimez-vous...</label>
      <button @click="createPost()" class="btn-custom btn" data-bs-toggle="tooltip" data-bs-placement="right" title="Envoyer votre message"><fa icon="paper-plane" /></button>
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
      errorMessage: "",
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
      .then(() => this.$router.go())
      .catch(error => console.log(error))
    }
  }   
}

</script>

<style scoped>

h1 {
  margin-top: 130px;
}

.input-custom {
  border: solid 1px #fd2d01;
}
.input-label {
  color: #ff8181;
}
.btn-custom {
  color: white;
  background-color: #fd2d01;
}
.post-form {
  margin-bottom: 80px;
}

</style>