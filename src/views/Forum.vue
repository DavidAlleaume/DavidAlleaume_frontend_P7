<template>
  <header-top></header-top>
  <div class="container  col-sm-10 col-lg-8">
    <h1 class="mb-5">Bienvenue sur le forum !</h1>
    <div class="form form-floating post-form">
      <textarea class="input-custom form-control mb-2" v-model="content" aria-label="Contenu du message"></textarea>
      <label class="input-label" for="floatingTextarea">Exprimez-vous...</label>
      <div id="preview" v-if="preview && displayPreview == true">
        <img class="preview" :src="preview" :alt="preview">
        <button type="button" @click="cancelAttachment()" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="form-group mb-3">
            <input 
              type="file" 
              id="file" 
              ref="file"
              name="file" 
              enctype="multipart/form-data" 
              @change="selectFile">
            <label class="file-label" for="file"><fa class="file-upload-icon" icon="file-upload" />Ajouter une image</label>    
    </div>
      <button @click="createPost()" class="btn-custom-send btn" data-bs-toggle="tooltip" data-bs-placement="right" title="Envoyer votre message"><fa icon="paper-plane" class="plane-icon" /></button>
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
      file: "",
      preview: "",
      errorMessage: "",
      displayPreview: ""
    }
  },
  props: {
    userId: {
      type: String,
    }
  },
  methods: {
    selectFile(event) {
      this.file = this.$refs.file.files[0]
      let input = event.target
      if(input.files) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
          this.displayPreview = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    cancelAttachment: function() {
      this.displayPreview = false
    },
    createPost: function() {
      if(!this.content) {
        this.errorMessage = `Vous devez rédiger un message !`
        return
      }
      let formData = new FormData()
      formData.append('content', this.content)
      formData.append('file', this.file)
      formData.append('userId', user.userId)
      instance.post(`/post/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Bearer " + user.token
        }
      })
      .then(() => this.$router.go())
      .catch(error => console.log(error))
    }
  }   
}

</script>

<style scoped src="./Forum.css">

</style>