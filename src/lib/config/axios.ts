import axios from 'axios';

export const apiFetch = axios.create({
    baseURL: 'endpoint backend here!',
    headers: {
        'Content-Type': 'application/json',
    },
});