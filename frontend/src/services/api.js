import axios from 'axios';

const api = axios.create({
  baseURL: 'https://whattt.glitch.me',
});

export default api;
