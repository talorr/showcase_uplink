import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // customOrigin: 'http://localhost:5174'
    },
});

// apiClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     config.params = { ...config.params, timestamp: Date.now() };
//     // console.log(window.location)

//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// )
export default apiClient;
