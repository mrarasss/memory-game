import axios from 'axios';
import config from '../application/config';

const request = axios.create({
    baseURL: config.backendUrl,
    timeout: 10000,
    headers: {
        Accept: 'application/json'
    }
})

export default request;