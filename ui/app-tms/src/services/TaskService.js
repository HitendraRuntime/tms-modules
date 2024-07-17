import axios from "axios";
import { getToken } from "./AuthService";
import { BASE_URL } from './CommonService'

const BASE_REST_API_URL = BASE_URL + "api/tasks";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const getAllTasks = (pagination) => axios.get(BASE_REST_API_URL, pagination)

export const saveTask = (task) => axios.post(BASE_REST_API_URL, task)

export const getTask = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteTask = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')