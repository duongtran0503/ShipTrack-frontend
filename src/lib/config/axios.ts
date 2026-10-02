import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)
const apiFetch = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiFetch.interceptors.response.use(response => {
    return response
}, error => {
    return error
})

apiFetch.interceptors.request.use(config => {
    return config;
})

export { apiFetch };

