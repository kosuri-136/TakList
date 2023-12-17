import axios from "axios";

const base_url = "http://localhost:4500/api/user";

export const register = (data) => axios.post(`${base_url}/registeruser`, data);

export const login = (data) => axios.post(`${base_url}/login`, data);
