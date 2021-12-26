import instance from './axios'

let user = localStorage.getItem('user')

if (!user) {
    user = {
        userId: -1,
        token: '',
    }
} else {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
}

export default user