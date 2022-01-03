import instance from './axios'

// Création d'une variable user qui servira pour l'authentification  
let user = localStorage.getItem('user')

if (!user) {
    user = {
        userId: -1,
        token: '',
    }
} else {
    try {
        user = JSON.parse(user)
        instance.defaults.headers.common['Authorization'] = user.token
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        }
    }
}

export default user