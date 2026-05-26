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

export const authAPI = {
    register: (email, password, username) => 
        api.post('auth/register', { email, password, username}),
    login: (email, password) =>
        api.post('auth/login', { email, password}),
};

export const progressAPI = {
    getUserProgress: () => api.get('progress')
};

export const conceptAPI = {
  getAllConcepts: () => api.get('/concepts'),
  getChallengesByConcept: (slug) => api.get(`/concepts/${slug}/challenges`),
};

export const challengeAPI = {
  getChallenge: (id) => api.get(`/challenges/${id}`),
  verify: (challengeId, code) =>
    api.post('/verify', { challengeId, code }),
  submit: (challengeId, code, passed) =>
    api.post('/submit', { challengeId, code, passed }),
};

export default api;