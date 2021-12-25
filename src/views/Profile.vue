<template>
  <header-top></header-top>
  <h1>Votre profil...</h1>
  
  <div class="card shadow mt-5">
    <div class="w-50 mx-auto mb-3">
      <img class="mw-100" :src="profileAvatar" alt="avatar" />
    </div>
    <p><strong>Prénom: </strong>{{ user.firstname }}</p>
    <p><strong>Nom: </strong>{{ user.lastname }}</p>
    <p><strong>Email: </strong>{{ user.email }}</p>
    <p v-if="user.isAdmin === true"><strong>Rôle:</strong> Admin</p>
    
    
  </div>
  <div v-if="userId == user.id" >
    <form id="form" class="mt-5" enctype="multipart/form-data" @submit.prevent="modifyAvatar()">
      <div class="mx-auto w-50 mb-3">
        <label for="avatar" class="form-label">Changer d'avatar</label>
        <input type="file" class="form-control-file" name="image" id="image" ref="image" v-on:change="handleFileUpload()" />
        <button type="submit" class="form-control btn btn-primary" name="submitAvatar" id="submitAvatar" @click.prevent="modifyAvatar">
          Modifier
        </button>
      </div>
    </form>
    <span>
      <button @click="deleteProfile()" type="button" class="btn btn-outline-danger">Supprimer votre compte</button>
    </span>
  </div>
    <!--<div>
      <h1>Votre profil...</h1>
      <div class="card shadow mt-5">
        <div class="row">
          <img src="../assets/icon.png" alt="Image de profil" class="profileAvatar mb-3 col-4" width="150">
          <button type="button" class="btn btn-outline-secondary mt-2 mb-3 col-2"><fa icon="file-upload" /></button>
        </div>
        <p class="row">{{ user.firstname }}</p>
        <p class="row">{{ user.lastname }}</p>
        <p class="row">{{ user.email }}</p>
        <button @click="deleteProfile()" type="button" class="btn btn-outline-danger">Supprimer le profil</button>
      </div>
    </div>-->
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
    'header-top': Header
  },
  created() {
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