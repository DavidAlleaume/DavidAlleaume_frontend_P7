<template>
<div >
    <img class="logo mb-5" src="../assets/icon-above-font-resized.png" alt="Logo Groupomania" width="230">
    <div class="card shadow">
            <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
            <h1 class="card__title" v-else>Inscription</h1>
            <p class="card__subtitle" v-if="mode == 'login'">
                Vous n'avez pas encore de compte ?
                <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span>
            </p>
            <p class="card__subtitle" v-else>
                Vous avez déjà un compte ?
                <span class="card__action" @click="switchToLogin()">Se connecter</span>
            </p>
            <div class="form-row">
                <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" />
            </div>
            <div class="form-row" v-if="mode == 'create'">
                <input v-model="firstname" class="form-row__input" type="text" placeholder="Prénom" />
                <input v-model="lastname" class="form-row__input" type="text" placeholder="Nom" />
            </div>
            <div class="form-row">
                <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
            </div>
            <div class="form-row error-message">
                {{ message }}
            </div>
            <div class="form-row">
                <button @click="login()" class="button" :class="{ 'button--disabled': !validatedFields }" v-if="mode == 'login'">
                    <span>Connexion</span>
                </button>
                <button @click="createAccount()" class="button" :class="{ 'button--disabled': !validatedFields }" v-else>
                    <span>Créer mon compte</span>
                </button>
            </div>
        </div>
</div>

    
</template>

<script>

import instance from '../axios'

export default {
    name: "Login",
    data: function() {
        return {
            mode: "login",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            message:""  
        }
    },
    computed: {
        validatedFields: function () {
            if (this.mode == "create") {
                if (this.email != "" && this.firstname != "" && this.lastname != "" && this.password != "") {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true
                } else {
                    return false
                }
            }
        }
    },   
    methods: {
        switchToCreateAccount: function () {
            this.mode = "create"
        },
        switchToLogin: function () {
            this.mode = "login"
        },
        createAccount: function() {
            let newUser = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            }
            instance.post('/user/signup', newUser)
            .then((res) => {
                if(res.status === 201) {
                    this.mode = "login"
                    this.message = "Votre compte a bien été créé ! veuillez vous identifier..."
                    
                }  
            })
            .catch(() => {
                this.message = "Un problème est survenu, veuillez réessayer"
            })
        },
        login: function() {
            let user = {
                email: this.email,
                password:this.password
            }
            instance.post('/user/login', user)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    this.$router.push('/profile')
                    .then(() => this.$router.go())
                }
            })
            .catch((res) => {
                localStorage.clear()
                this.message = res.message
            })
        }
    }

}

</script>

<style scoped src="./Home.css">

</style>