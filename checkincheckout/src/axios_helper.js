import axios from 'axios'

const axiosInstance = axios.create({
    headers: {
        'Content-type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const email = REACT_APP_API_EMAIL;
        const password = REACT_APP_API_PASSWORD;
        if(email && password){
            config.auth = {
                username: email,
                password: password
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance