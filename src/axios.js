import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://burger-b92d5.firebaseio.com/',
});

export default instance;
