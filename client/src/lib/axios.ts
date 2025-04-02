// import axios from "axios";
// import { getSession } from "next-auth/react";
//
// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
// });
//
// api.interceptors.request.use(async (config) => {
//     const session = await getSession();
//     if (session?.accessToken) {
//         config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
// });
//
// export default api;


import axios from 'axios';
import { getSession } from 'next-auth/react';
const isServer = typeof window === 'undefined';

const baseURL = isServer
    ? process.env.API_URL || 'http://backend:5000'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default apiClient;
export { isAxiosError } from 'axios';