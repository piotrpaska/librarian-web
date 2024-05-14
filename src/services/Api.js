import axios from "axios";
import axiosRetry from "axios-retry"; 

const api = axios.create({
    baseURL: 'https://librarian-web.onrender.com'
})
axiosRetry(api, {
    retries: 30,
    retryDelay: (retryCount) => {
        console.log('tried')
        return retryCount * 5000;
    }
})

export default api;