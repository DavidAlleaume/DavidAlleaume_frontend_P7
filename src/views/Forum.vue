<template>
    <header-top></header-top>
    <div class="container col-sm-10 col-lg-8">
        <h1 class="mb-5">Que souhaitez-vous partager ?</h1>
        <div class="form-floating post-form">
            <textarea
                class="input-custom form-control mb-4"
                id="floatingTextarea"
                v-model="content"
                aria-label="Contenu du message">
            </textarea>
            <label class="input-label" for="floatingTextarea"><span>Rédigez votre message ici...</span></label>
            <div id="preview" v-if="preview && displayPreview == true">
                <img class="preview" :src="preview" :alt="preview" />
                <button
                    type="button"
                    @click="cancelPreview()"
                    class="btn-close"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Cliquez pour supprimer l'image"
                    aria-label="Close">
                </button>
            </div>
            <div
                class="form-group mb-3"
                data-toggle="tooltip"
                data-placement="right"
                title="Cliquez pour sélectionner une image">
                <input
                    type="file"
                    id="file"
                    ref="file"
                    name="file"
                    enctype="multipart/form-data"
                    @input="selectFile" />
                <label class="file-label" for="file">
                    <fa class="file-upload-icon" icon="file-upload" /><span>Ajouter une image</span>
                </label>
                <p class="attachment-type">Formats requis: .jpg .gif .png</p>
            </div>
            <button
                @click="createPost()"
                class="btn-custom-send btn"
                data-toggle="tooltip"
                data-placement="right"
                title="Postez votre message">
                <fa icon="paper-plane" class="plane-icon" />
            </button>
            <p class="my-3 text-danger">{{message}}</p>
        </div>

        <Posts></Posts>

    </div>
</template>

<script>

import Header from "../components/Header.vue"
import Posts from "../components/Posts.vue"
import instance from "../axios"
import user from "../user_auth"

export default {
    name: "Forum",
    components: {
        "header-top": Header,
        Posts
    },

    data() {
        return {
        content: "",
        file: "",
        preview: "",
        message: "",
        displayPreview: "",
        Filelist: {}
        }
    },

    created() {
        window.scrollTo(0, 0) // Scroll automatique en haut de la page à la création pour s'assurer de la visibilité du contenu
    },

    methods: {

        // Sélection d'une image à ajouter au post
       selectFile(event) {
            console.log(this.$refs.file.files)
            this.file = this.$refs.file.files[0]
            let input = event.target
            if (input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                    this.displayPreview = true
                }
                reader.readAsDataURL(input.files[0])
            }
        },

        // Suppression de la prévisualisation de l'image
        cancelPreview: function () {
           console.log(this.$refs.file.files)
           this.displayPreview = false
           this.preview = ""
        },

        // Création d'un post
        createPost: function () {
            if (!this.content) {
                this.message = `Vous devez rédiger un message !`
                return;
            }
            let formData = new FormData();
            formData.append("content", this.content)
            formData.append("file", this.file)
            formData.append("userId", user.userId)
            instance.post(`/post/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                     Authorization: "Bearer " + user.token
                }
            })
            .then(() => this.$router.go())
            .catch(() => {
                alert("Un problème est survenu, veuillez réessayer")
            }) 
        }
    }
}

</script>

<style scoped src="./Forum.css">

</style>