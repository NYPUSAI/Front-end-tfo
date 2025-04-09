import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://smartteams.nypus.in/",
    withCredentials: true,
})
// https://v5dmsmd1-8000.inc1.devtunnels.ms/login
// https://smartteams.nypus.in/