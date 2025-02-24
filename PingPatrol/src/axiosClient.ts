import axios from "axios";

export const baseUrl = 'https://pingpatrol-backend.oferbenami.com:3000';
export const axiosClient = axios.create({ baseURL: baseUrl });
