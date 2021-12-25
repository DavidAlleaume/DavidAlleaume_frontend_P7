import instance from './axios'

let user = localStorage.getItem('user')

if (!user) {
    user = {
        userId: -1,
        token: '',
    }
} else {
    // sinon on récupère l'id du user et le token
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) { // si le token ne peut pas être récupéré, on laisse user à sa valeur initiale
        user = {
            userId: -1,
            token: '',
        }
    }
}

export default user