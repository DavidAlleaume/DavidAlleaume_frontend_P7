<template>
<div>
    <header>
        <img class="logo-home" src="../assets/icon-left-font-monochrome-white-resized.png" alt="Logo Groupomania">
    </header>

    <div class="container">
        
            <h1 class="display-6 welcome">Bienvenue sur le Forum!</h1>
        
        <div class="card shadow login-form mb-5">
            <h2 class="card-title" v-if="mode == 'login'">Connexion</h2>
            <h2 class="card-title" v-else>Inscription</h2>
            <p class="card-subtitle mb-3" v-if="mode == 'login'">
                Vous n'avez pas encore de compte ?
                <a class="card-action" @click="switchToCreateAccount()">Créer un compte</a>
            </p>
            <p class="card-subtitle mb-3" v-else>
                Vous avez déjà un compte ?
                <a class="card-action" @click="switchToLogin()">Se connecter</a>
            </p>
            <div class="form-row">
                <label for="email">email</label>
                <input v-model="email" id="email" class="form-row-input" type="text" />
            </div>
            <div class="form-row" v-if="mode == 'create'">
                <label for="firstname">Prénom</label>
                <input v-model="firstname" id="firstname" class="form-row-input" type="text" />
                <label for="lastname">Nom</label>
                <input v-model="lastname" id="lastname" class="form-row-input" type="text" />
            </div>
            <div class="form-row">
                <label for="password">Mot de passe</label>
                <input v-model="password" id="password" class="form-row-input" type="password" />
            </div>
            <div class="form-row error-message">
                <p class="my-3 text-danger">{{ message }}</p>
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
</div>   
</template>

<script>

import instance from '../axios'
import user from '../user_auth'

export default {
    name: "Login",

    data: function() {
        return {
            mode: "login",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            message:"",
            nameRegex: /^[a-z ,.'-]+$/i,
            emailRegex: /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/,
            passwordRegex: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})$/
        }
    },

    // Validation des champs permettant l'affichage et l'accès au bouton d'envoi des données
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
    
    created() {
        this.userIsLogged()
    },

    methods: {
        switchToCreateAccount: function () {
            this.mode = "create"
        },

        switchToLogin: function () {
            this.mode = "login"
        },

        // création de compte
        createAccount: function() {
            let newUser = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            }
            let firstnameCheck = this.nameRegex.test(this.firstname)
            let lastnameCheck = this.nameRegex.test(this.lastname)
            let emailCheck = this.emailRegex.test(this.email)
            let passwordCheck = this.passwordRegex.test(this.password)
            if(firstnameCheck == false) {
                this.message = 'Prénom invalide'
            } else if (lastnameCheck == false){
                this.message = 'Nom invalide'
            } else if (emailCheck == false) {
                this.message = 'Email invalide'
            } else if (passwordCheck == false) {
                this.message = 'Votre de passe doit contenir entre 6 et 20 caractères, minimum 1 majuscule, 1 minuscule et 1 chiffre'
            } else {
                instance.post('/user/signup', newUser)
                .then((res) => {
                    if(res.status === 201) {
                        this.mode = "login"
                        this.message = "Votre compte a bien été créé ! veuillez vous connecter..."
                    }  
                })
                .catch((res) => {
                    if(res.response.status == 409) {
                        this.message = "Cette adresse mail est déjà utilisée !"
                    }  
                })
            }
        },

        // Connexion
        login: function() {
            let user = {
                email: this.email,
                password:this.password
            }
            instance.post('/user/login', user)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    this.$router.go()
                }
            })
            .catch((res) => {
                if(res.response.status == 404) {
                    this.message = "Cet utilisateur n'existe pas !"
                } else if(res.response.status == 401){
                    this.message = "Adresse mail invalide !"
                }
            })
        },

        // Vérification de l'authentification avant l'envoi vers le forum
        userIsLogged: function () {
            if(user.token !== "") 
                this.$router.push('/forum')
        },
    }
}

</script>

<style scoped src="./Home.css">

</style>