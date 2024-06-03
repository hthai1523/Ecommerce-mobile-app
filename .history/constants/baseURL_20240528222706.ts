import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.2.10:83/api/v1',
});


