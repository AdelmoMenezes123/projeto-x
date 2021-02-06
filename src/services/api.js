import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:9000/'
    baseURL:'https://backend-projetox.herokuapp.com/'
})

export default api;