<template>
  <header-top></header-top>
  <div class="container col-6">
    <h1 class="mb-5">Bienvenue sur le forum !</h1>
    <div class="form form-floating post-form">
      <textarea class="input-custom form-control mb-2" v-model="content" aria-label="Contenu du message"></textarea>
      <label class="input-label" for="floatingTextarea">Exprimez-vous...</label>
      <div id="preview" v-if="preview">
        <img class="preview" :src="preview" :alt="preview">
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
      file: "",
      preview: "",
      errorMessage: "",
    }
  },
  props: {
    userId: {
      type: String,
    }
  },
  methods: {
    selectFile(event) {
            /* sur le onchange on va attribuer cette valeur à file (nécessaire pour l'envoi au backend) */
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
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
input[type="file"] {
  display: none;
}
.file-label {
  color: white;
  height: 50px;
  width: 200px;
  background-color: #ff8181;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 10px;
  margin: auto;
}
.file-upload-icon {
  font-size: 20px;
}
.preview {
  margin: 10px;
  width: 200px;
}

</style>