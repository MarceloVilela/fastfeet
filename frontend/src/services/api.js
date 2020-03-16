import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://whattt.glitch.me',
  baseURL: 'http://localhost:3333',
});

export default api;
