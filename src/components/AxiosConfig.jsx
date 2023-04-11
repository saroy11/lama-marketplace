import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
});

export default instance;

