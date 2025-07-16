// /lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', // backend base URL
  withCredentials: true, // Send cookies (important for auth sessions)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
