import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://:8070/api/v1',
});


