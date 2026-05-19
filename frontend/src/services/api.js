import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthAPI = {
    register: (email, password, username) => 
        api.post('auth/register', { email, password, username}),
    login: (email, password) =>
        api.post('auth/login', { email, password}),
};

export const challengeAPI = {
    getChallenge: (id) => 
        api.get(`/challenges/${id}`),
    verify: (challengeId, code) =>
        api.post('/verify', {challengeId, code}),
},

export const progressAPI = {
    getUserProgress: () => api.get('/user/progress')
};

export default api;