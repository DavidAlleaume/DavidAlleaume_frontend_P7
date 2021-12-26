<template>
  <header-top></header-top>
  <h1>Votre profil...</h1>
  
  <div class="card shadow mt-5">
    
    
    <p><strong>Prénom: </strong>{{ user.firstname }}</p>
    <p><strong>Nom: </strong>{{ user.lastname }}</p>
    <p><strong>Email: </strong>{{ user.email }}</p>
    <p v-if="user.isAdmin === true"><strong>Rôle:</strong> Admin</p>
  </div>
  <div v-if="userId == user.id" >
    <!--<form id="form" class="container col-6 mt-5" enctype="multipart/form-data" @submit.prevent="modifyAvatar()">
      <label for="avatar" class="row form-label">Changer d'avatar</label>
      <input type="file" class="row form-control-file" name="image" id="image" ref="image" v-on:change="handleFileUpload()" />
    </form>-->
    <button @click="deleteProfile()" type="button" class="btn btn-outline-danger mt-5">Supprimer votre compte</button>
  </div>
</template>

<script>

import instance from '../axios'
import Header from '../components/Header.vue'
import user from '../user_auth'



export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      profileAvatar: "",
      error: ""
    }
  },
  components: {
    'header-top': Header,
    
  },
  mounted() {
    instance.get(`/user/${user.userId}`, {headers: {"Authorization": "Bearer " + user.token}})
    .then((res) => {
      this.user = res.data
      console.log(res.data)
    })
    .catch(() => {
      this.error = "Un problème est survenu, veuillez réessayer"
    })
  },
  methods: {
    deleteProfile: function () {
      if(confirm("Attention, vous êtes sur le point de supprimer votre compte !")) {
        instance.delete(`/user/${user.userId}`, {headers: {"Authorization": "Bearer " + user.token}})
        .then(() => {
          localStorage.clear()
          this.$router.push('/')
        })
        .catch(() => {
          this.error = "Un problème est survenu, veuillez réessayer"
        })
      }
    }
    
  }

}

</script>

<style scoped src="./Profile.css">

</style>