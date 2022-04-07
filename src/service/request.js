import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8888/',
    timeout: 3000,
});
instance.interceptors.response.use((data) => {
    return data.data;
});
instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    config.headers['Authorization'] = token;
    return config;
})
export default instance;