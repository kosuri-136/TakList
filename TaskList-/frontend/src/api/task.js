import axios from "axios";

const base_url = "http://localhost:4500/api/task";

export const createTask = (id, data) =>
  axios.post(`${base_url}/createtask/${id}`, data);

export const getTasks = (id) => axios.get(`${base_url}/gettasks/${id}`);

export const updatedTask = (id, data) =>
  axios.patch(`${base_url}/updatetask/${id}`, data);

export const deleteTask = (id) => axios.delete(`${base_url}/deletetask/${id}`);
