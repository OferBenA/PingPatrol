import axios from "axios";

export const baseUrl = 'https://pingpatrol-backend.oferbenami.com';
export const axiosClient = axios.create({ baseURL: baseUrl });
