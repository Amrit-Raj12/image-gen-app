import axios from 'axios';

const client = axios.create({
  // baseURL: 'http://192.168.29.152:8989',
  baseURL: 'http://192.168.58.25:8989',
});

export default client;
