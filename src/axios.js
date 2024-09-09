import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        customOrigin: 'http://localhost:5174'
    },
});

export default apiClient;
