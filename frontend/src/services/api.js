import axios from 'axios';
import { toast } from 'react-toastify';
import history from './history';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use((response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error('Sua sessão expirou. Redirecionado para a página de login.');
      history.push('sair');
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default api;
